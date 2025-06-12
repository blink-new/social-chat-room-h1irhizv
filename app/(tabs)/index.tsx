import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Link, Stack } from 'expo-router';
import { Hash } from 'lucide-react-native';

// Sample room data - we'll replace this with Supabase later
const ROOMS = [
  { id: '1', name: 'general', color: '#5865F2' },
  { id: '2', name: 'tech-talk', color: '#57F287' },
  { id: '3', name: 'gaming', color: '#FEE75C' },
  { id: '4', name: 'art-design', color: '#EB459E' },
  { id: '5', name: 'music', color: '#ED4245' },
  { id: '6', name: 'random', color: '#FF7A00' },
];

export default function RoomsScreen() {
  const renderRoomItem = ({ item }: { item: typeof ROOMS[0] }) => (
    <Link href={`/(tabs)/chat/${item.id}`} asChild>
      <TouchableOpacity style={styles.roomItem}>
        <View style={[styles.roomIndicator, { backgroundColor: item.color }]} />
        <Hash size={20} color={item.color || '#B9BBBE'} style={styles.roomIcon} />
        <Text style={styles.roomName}>{item.name}</Text>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Chat Rooms' }} />
      <FlatList
        data={ROOMS}
        renderItem={renderRoomItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#36393F', // Discord dark background
  },
  listContent: {
    padding: 16,
  },
  roomItem: {
    backgroundColor: '#2F3136', // Slightly lighter card background
    padding: 20,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: 'transparent', // Set by indicator logic if needed, or remove if roomIndicator is enough
  },
  roomIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  roomIcon: {
    marginRight: 10,
  },
  roomName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF', // White text
  },
});
