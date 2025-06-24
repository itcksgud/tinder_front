// src/screens/app/Explore.tsx
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { Ionicons } from '@expo/vector-icons';

interface Profile {
  id: string;
  name: string;
  age: number;
  bio: string;
  photos: string[];
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = CARD_WIDTH * 1.2;

// 임시 더미 데이터 (나중에 API 로 교체)
const dummyProfiles: Profile[] = [
  {
    id: '1',
    name: 'Leanne Graham',
    age: 27,
    bio: 'Occasional photographer. Part-time singer.',
    photos: ['https://randomuser.me/api/portraits/women/68.jpg'],
  },
  {
    id: '2',
    name: 'Ervin Howell',
    age: 30,
    bio: 'Food lover. Traveler.',
    photos: ['https://randomuser.me/api/portraits/men/45.jpg'],
  },
  // …원하는 만큼 추가
];

export default function ExploreScreen() {
  const onSwipeRight = (index: number) => {
    console.log('LIKE:', dummyProfiles[index].id);
    // TODO: API 호출해서 좋아요 등록
  };

  const onSwipeLeft = (index: number) => {
    console.log('DISLIKE:', dummyProfiles[index].id);
    // TODO: API 호출해서 싫어요 등록
  };

  return (
    <View style={styles.container}>
      <Swiper
        cards={dummyProfiles}
        cardIndex={0}
        stackSize={3}
        backgroundColor="transparent"
        onSwipedRight={onSwipeRight}
        onSwipedLeft={onSwipeLeft}
        renderCard={(profile) =>
          profile ? (
            <View style={styles.card}>
              <Image
                source={{ uri: profile.photos[0] }}
                style={styles.photo}
              />
              <View style={styles.info}>
                <Text style={styles.name}>
                  {profile.name}, {profile.age}
                </Text>
                <Text style={styles.bio} numberOfLines={2}>
                  {profile.bio}
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.emptyCard}>
              <Text>더 이상 프로필이 없습니다.</Text>
            </View>
          )
        }
      />

      <View style={styles.buttons}>
        <TouchableOpacity onPress={() => onSwipeLeft(0)}>
          <Ionicons name="close-circle" size={64} color="#FF5864" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onSwipeRight(0)}>
          <Ionicons name="heart-circle" size={64} color="#4CCC93" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fafafa',
    elevation: 4,
  },
  photo: {
    width: '100%',
    height: '75%',
  },
  info: {
    padding: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  bio: {
    marginTop: 4,
    color: '#555',
  },
  emptyCard: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ececec',
  },
  buttons: {
    position: 'absolute',
    bottom: 40,
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
