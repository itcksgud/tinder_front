// src/screens/app/Matches.tsx
import React from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageSourcePropType,
} from 'react-native';

interface Match {
  id: string;
  name: string;
  photo: ImageSourcePropType;
  lastSeen: string;
}

const { width } = Dimensions.get('window');
const ITEM_SIZE = (width - 48) / 2;

const matches: Match[] = [
  {
    id: '1',
    name: 'Alice',
    photo: { uri: 'https://randomuser.me/api/portraits/men/45.jpg' },
    lastSeen: 'Online',
  },
  {
    id: '2',
    name: 'Bob',
    photo: { uri: 'https://randomuser.me/api/portraits/men/32.jpg' },
    lastSeen: '5분 전',
  },
  // …추가 데이터
];

export default function MatchesScreen() {
  return (
    <View style={styles.container}>
      <FlatList<Match>
        data={matches}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 16 }}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.card, { width: ITEM_SIZE }]}>
            <Image
              source={item.photo}
              style={[styles.photo, { height: ITEM_SIZE }]}
              resizeMode="cover"
              onError={() => console.warn('이미지 로드 실패:', item)}
            />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.sub}>{item.lastSeen}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  card: { borderRadius: 12, overflow: 'hidden', alignItems: 'center' },
  photo: { width: '100%', borderRadius: 12 },
  name: { marginTop: 8, fontWeight: '600', fontSize: 16 },
  sub: { color: '#888', fontSize: 12 },
});
