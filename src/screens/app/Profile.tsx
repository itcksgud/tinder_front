// src/screens/ProfileScreen.tsx
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function ProfileScreen() {
  const { auth, loading, signOut } = useAuth();
  const user = auth?.user;

  const handleLogout = () => {
    Alert.alert('로그아웃', '정말 로그아웃 하시겠어요?', [
      { text: '취소', style: 'cancel' },
      { text: '로그아웃', style: 'destructive', onPress: () => signOut() },
    ]);
  };

  // 1) 인증 초기화 중
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // 2) user 정보가 없으면 에러 처리 혹은 빈 화면
  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text>사용자 정보를 불러올 수 없습니다.</Text>
      </View>
    );
  }

  // 3) user가 확실히 존재할 때만 아래 코드 실행
  const avatarUri = user.photos?.[0] ?? 'https://via.placeholder.com/120';
  const interests = user.interests ?? [];
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: avatarUri }} style={styles.avatar} />

      <Text style={styles.name}>
        {fullName || user.username}
      </Text>

      <Text style={styles.email}>{user.email}</Text>

      {user.bio ? (
        <Text style={styles.bio}>{user.bio}</Text>
      ) : null}

      {interests.length > 0 && (
        <View style={styles.interestsContainer}>
          {interests.map(tag => (
            <View key={tag} style={styles.interestBadge}>
              <Text style={styles.interestText}>#{tag}</Text>
            </View>
          ))}
        </View>
      )}

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>로그아웃</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 120, height: 120,
    borderRadius: 60,
    backgroundColor: '#eee',
    marginBottom: 16,
  },
  name: {
    fontSize: 22, fontWeight: 'bold',
  },
  email: {
    marginTop: 4, color: '#666',
  },
  bio: {
    marginTop: 12,
    paddingHorizontal: 24,
    textAlign: 'center',
    color: '#444',
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  interestBadge: {
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
  },
  interestText: {
    fontSize: 12, color: '#555',
  },
  logoutBtn: {
    marginTop: 40,
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: '#FF5864',
    borderRadius: 24,
  },
  logoutText: {
    color: '#fff', fontSize: 16, fontWeight: '600',
  },
});
