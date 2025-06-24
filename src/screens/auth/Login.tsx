// src/screens/auth/Login.tsx
import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../../context/AuthContext';
import { AuthStackParamList } from '../../navigation/AuthStack';

type LoginScreenProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export default function Login() {
  const navigation = useNavigation<LoginScreenProp>();
  const { signIn } = useAuth();  // 컨텍스트에서 signIn 가져오기
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignIn = async () => {
    if (!email || !password) return Alert.alert('이메일과 비밀번호를 입력하세요.');
    try {
      await signIn(email, password);
      // 자동으로 인증되면 RootNavigator에서 AppStack으로 전환됨
    } catch (err: any) {
      console.error(err);
      Alert.alert('로그인 실패', err.response?.data?.message || err.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>환영합니다!</Text>
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
        placeholder="비밀번호"
        placeholderTextColor="#777"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.signInButton} onPress={onSignIn}>
        <Text style={styles.signInButtonText}>로그인</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={styles.footerText}>계정이 없으신가요?</Text>
        <TouchableOpacity onPress={() => navigation.replace('Signup')}>
          <Text style={styles.signUpLink}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',               // 흰 배경 :contentReference[oaicite:5]{index=5}
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333333',                       // 다크 차콜 텍스트 :contentReference[oaicite:6]{index=6}
    marginBottom: 32,
    alignSelf: 'center',
  },
  input: {
    height: 48,
    backgroundColor: '#EFEFEF',             // 밝은 그레이 입력창 :contentReference[oaicite:7]{index=7}
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333333',
    marginBottom: 16,
  },
  signInButton: {
    height: 50,
    backgroundColor: '#FD297B',             // Electric Pink :contentReference[oaicite:8]{index=8}
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  signInButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    color: '#777',
    marginRight: 4,
  },
  signUpLink: {
    color: '#FF5864',                       // Fiery Rose :contentReference[oaicite:9]{index=9}
    fontWeight: '600',
  },
});
