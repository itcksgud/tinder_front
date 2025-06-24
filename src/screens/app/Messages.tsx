// src/screens/app/Messages.tsx
import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
}

const chats: Chat[] = [
  { id: '1', name: 'Bob', avatar: 'https://example.com/bob.jpg', lastMessage: 'Hi!', timestamp: '2h ago' },
  { id: '2', name: 'Alice', avatar: 'https://example.com/alice.jpg', lastMessage: 'See you tomorrow.', timestamp: '1d ago' },
  // … 기타 채팅 데이터
];

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <FlatList<Chat>
        data={chats}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.row}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.message} numberOfLines={1}>
                {item.lastMessage}
              </Text>
            </View>
            <Text style={styles.time}>{item.timestamp}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontWeight: '600',
    fontSize: 16,
  },
  message: {
    color: '#666',
    marginTop: 4,
    fontSize: 14,
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
});
