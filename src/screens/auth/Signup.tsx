// src/screens/auth/Signup.tsx
import React, { useState } from 'react';
import {
  SafeAreaView, View, Text, TextInput,
  TouchableOpacity, StyleSheet, Alert, ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthStack';
import api from '../../api';
import { useAuth } from '../../context/AuthContext';
type SignupScreenProp = NativeStackNavigationProp<AuthStackParamList, 'Signup'>;

export default function Signup() {
  
  const navigation = useNavigation<SignupScreenProp>();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();  // 컨텍스트에서 signIn 가져오기
  const onSignUp = async () => {
    if (!email || !username || !password || !confirm) {
      return Alert.alert('모든 항목을 입력하세요.');
    }
    if (password !== confirm) {
      return Alert.alert('비밀번호와 확인이 일치하지 않습니다.');
    }

    try {
      setLoading(true); // 시작
      const res = await api.post('/auth/signup', { email, username, password });
      if (res.data.success) {
          Alert.alert(
            '회원가입 성공',
            '이메일 인증 링크를 보냈습니다.\n메일함을 확인하고 인증을 완료해주세요.',
            [{ text: '확인', onPress: () => navigation.replace('Login') }]
          );
      } else {
        Alert.alert('가입 실패', res.data.message || '알 수 없는 오류');
      }
    } catch (err: any) {
      console.error(err);
      Alert.alert('가입 오류', err.response?.data?.message || err.message);
    } finally {
      setLoading(false); // 종료
    }
    
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>회원가입</Text>

      <TextInput
        style={styles.input}
        placeholder="이메일"
        placeholderTextColor="#777"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="사용자 이름"
        placeholderTextColor="#777"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        placeholderTextColor="#777"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호 확인"
        placeholderTextColor="#777"
        secureTextEntry
        value={confirm}
        onChangeText={setConfirm}
      />

            <TouchableOpacity
        style={[styles.signUpButton, loading && { opacity: 0.7 }]}
        onPress={onSignUp}
        disabled={loading}
      >
        {loading
          ? <ActivityIndicator color="#FFF" />
          : <Text style={styles.signUpButtonText}>가입하기</Text>
        }
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>이미 계정이 있으신가요?</Text>
        <TouchableOpacity onPress={() => navigation.replace('Login')}>
          <Text style={styles.signInLink}>로그인</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', paddingHorizontal: 24, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '700', color: '#333', marginBottom: 32, alignSelf: 'center' },
  input: {
    height: 48, backgroundColor: '#EFEFEF', borderRadius: 8,
    paddingHorizontal: 16, fontSize: 16, color: '#333', marginBottom: 16,
  },
  signUpButton: {
    height: 50, backgroundColor: '#FF5864',
    borderRadius: 25, justifyContent: 'center',
    alignItems: 'center', marginTop: 8,
  },
  signUpButtonText: { color: '#FFF', fontSize: 18, fontWeight: '600' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  footerText: { color: '#777', marginRight: 4 },
  signInLink: { color: '#FF655B', fontWeight: '600' },
});
