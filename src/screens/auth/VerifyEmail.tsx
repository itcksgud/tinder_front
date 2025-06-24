// src/screens/auth/VerifyEmail.tsx

import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { OtpInput, OtpInputRef } from 'react-native-otp-entry';
import api from '../../api';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

export default function VerifyEmail() {
  const { signOut } = useAuth();
  const otpRef = useRef<OtpInputRef>(null);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const submitOtp = async () => {
    if (otp.length !== 6) return Alert.alert('코드를 정확히 입력해 주세요.');
    try {
      setLoading(true);
      await api.post('/auth/verify-code', { code: otp });
      Alert.alert('✅ 인증 완료!');
      // 인증 후 화면 이동이나 상태 업데이트
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        Alert.alert('오류', err.response?.data?.message ?? err.message);
      } else {
        Alert.alert('오류', String(err));
      }
    } finally {
      setLoading(false);
    }
  };

  const resendCode = async () => {
    try {
      setResendLoading(true);
      await api.post('/auth/resend-verification');
      Alert.alert('📨 인증 코드가 재전송되었습니다.');
      otpRef.current?.clear(); // 입력 칸 초기화
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        Alert.alert('오류', err.response?.data?.message ?? err.message);
      } else {
        Alert.alert('오류', String(err));
      }
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>이메일 인증</Text>
      <Text style={styles.subtitle}>메일로 보낸 인증 코드 6자리를 입력해 주세요.</Text>

      <OtpInput
        ref={otpRef}
        numberOfDigits={6}
        onTextChange={text => setOtp(text)}
        focusColor="#FD297B"
        type="numeric"
        theme={{
          containerStyle: styles.otpContainer,
          pinCodeContainerStyle: styles.otpBox,
          pinCodeTextStyle: styles.otpText,
          focusedPinCodeContainerStyle: styles.otpBoxFocused,
          filledPinCodeContainerStyle: styles.otpBoxFilled,
        }}
      />

      <TouchableOpacity
        style={[styles.primaryButton, (loading || otp.length < 6) && styles.disabled]}
        onPress={submitOtp}
        disabled={loading || otp.length < 6}
      >
        <Text style={styles.primaryButtonText}>{loading ? '확인 중...' : '인증하기'}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.secondaryButton, resendLoading && styles.disabled]}
        onPress={resendCode}
        disabled={resendLoading}
      >
        <Text style={styles.secondaryButtonText}>{resendLoading ? '재전송 중...' : '인증 코드 재전송'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logout} onPress={signOut}>
        <Text style={styles.logoutText}>로그아웃</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center', padding:24, backgroundColor:'#fff' },
  header: { fontSize:24, fontWeight:'bold', color:'#333', marginBottom:8 },
  subtitle: { fontSize:16, color:'#666', textAlign:'center', marginBottom:24 },
  otpContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 24 },
  otpBox: {
    width: 48, height: 56,
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    justifyContent: 'center', alignItems: 'center',
  },
  otpBoxFocused: { borderColor: '#FD297B' },
  otpBoxFilled: { borderColor: '#FD297B', backgroundColor: '#FFEFF5' },
  otpText: { fontSize: 18, color: '#333' },

  primaryButton: {
    width:'100%', paddingVertical:14, borderRadius:25,
    backgroundColor:'#FD297B', alignItems:'center', marginBottom:16,
  },
  primaryButtonText: { color:'#fff', fontSize:16, fontWeight:'600' },
  secondaryButton: {
    width:'100%', paddingVertical:14, borderRadius:25,
    borderWidth:1, borderColor:'#FD297B', alignItems:'center', marginBottom:16,
  },
  secondaryButtonText: { color:'#FD297B', fontSize:16, fontWeight:'600' },
  disabled: { opacity: 0.6 },
  logout: { marginTop:12, alignItems:'center' },
  logoutText: { color:'#E74C3C', fontSize:16, fontWeight:'600' },
});
