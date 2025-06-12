import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { Hash, Users } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const SAMPLE_ROOMS = [
  { id: '1', name: 'general', topic: 'General Discussion', color: '#5865F2', memberCount: 234 },
  { id: '2', name: 'tech-talk', topic: 'Technology & Programming', color: '#57F287', memberCount: 89 },
  { id: '3', name: 'gaming', topic: 'Gaming & Entertainment', color: '#FEE75C', memberCount: 156 },
  { id: '4', name: 'art-design', topic: 'Creative Arts & Design', color: '#EB459E', memberCount: 67 },
  { id: '5', name: 'music', topic: 'Music & Audio', color: '#ED4245', memberCount: 45 },
  { id: '6', name: 'random', topic: 'Random Conversations', color: '#FF7A00', memberCount: 123 },
];

export default function RoomList() {
  const handleRoomPress = (roomId: string) => {
    router.push(`/chat/${roomId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chat Rooms</Text>
        <Text style={styles.headerSubtitle}>Join a conversation</Text>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {SAMPLE_ROOMS.map((room, index) => (
          <Animated.View
            key={room.id}
            entering={FadeInDown.delay(index * 100).duration(400)}
          >
            <TouchableOpacity
              style={styles.roomCard}
              onPress={() => handleRoomPress(room.id)}
              activeOpacity={0.8}
            >
              <View style={styles.roomHeader}>
                <View style={[styles.roomIndicator, { backgroundColor: room.color }]} />
                <View style={styles.roomInfo}>
                  <View style={styles.roomTitleRow}>
                    <Hash size={16} color="#B9BBBE" />
                    <Text style={styles.roomName}>{room.name}</Text>
                  </View>
                  <Text style={styles.roomTopic}>{room.topic}</Text>
                </View>
              </View>
              
              <View style={styles.roomMeta}>
                <Users size={14} color="#B9BBBE" />
                <Text style={styles.memberCount}>{room.memberCount}</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#36393F',
  },
  header: {
    padding: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#B9BBBE',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  roomCard: {
    backgroundColor: '#2F3136',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  roomHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  roomIndicator: {
    width: 8,
    height: 32,
    borderRadius: 4,
    marginRight: 12,
  },
  roomInfo: {
    flex: 1,
  },
  roomTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  roomName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 6,
  },
  roomTopic: {
    fontSize: 14,
    color: '#B9BBBE',
    lineHeight: 18,
  },
  roomMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberCount: {
    fontSize: 14,
    color: '#B9BBBE',
    marginLeft: 4,
    fontWeight: '500',
  },
});