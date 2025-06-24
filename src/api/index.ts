// src/api/index.ts
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import * as SecureStore from 'expo-secure-store';

const BASE_URL = __DEV__
  ? 'http://10.0.2.2:5000/api'
  : 'https://도메인/api';

interface QueueItem {
  resolve: (value: any) => void;
  reject: (error: any) => void;
  config: AxiosRequestConfig;
}

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

let isRefreshing = false;
let failedQueue: QueueItem[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject, config }) => {
    if (token) {
      config.headers = config.headers ?? {};
      (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
    }
    resolve(api(config));
  });
  failedQueue = [];
};


// 1️⃣ 요청 인터셉터: 항상 최신 토큰 헤더에 붙이기
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('accessToken');
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, err => Promise.reject(err));

// 2️⃣ 응답 인터셉터: 401 발생 시 토큰 재발급 + 큐 처리
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (err: AxiosError) => {
    const originalRequest = err.config as AxiosRequestConfig & { _retry?: boolean };
    if (err.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // 재발급 중이면 큐에 요청 대기
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await SecureStore.getItemAsync('refreshToken');
        if (!refreshToken) throw new Error('No refresh token');
        const refreshRes = await axios.post(`${BASE_URL}/auth/refresh-token`, { token: refreshToken });
        const newToken: string = refreshRes.data.accessToken;
        await SecureStore.setItemAsync('accessToken', newToken);

        api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        processQueue(null, newToken);

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(err);
  }
);

export default api;
