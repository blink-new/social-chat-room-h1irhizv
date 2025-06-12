import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { Send, Smile, Hash, ChevronLeft } from 'lucide-react-native';
// import Animated, { FadeInRight, FadeInLeft } from 'react-native-reanimated'; // Re-add if animations are desired
import { MessageBubble } from '@/components/MessageBubble';

// Sample room data - this would come from your backend/Supabase
const ROOM_DATA = {
  '1': { name: 'general', color: '#5865F2' },
  '2': { name: 'tech-talk', color: '#57F287' },
  '3': { name: 'gaming', color: '#FEE75C' },
  '4': { name: 'art-design', color: '#EB459E' },
  '5': { name: 'music', color: '#ED4245' },
  '6': { name: 'random', color: '#FF7A00' },
};

// Sample messages - this would come from your backend/Supabase
const SAMPLE_MESSAGES = [
  {
    id: '1',
    text: 'Hey everyone! Welcome to the chat room 👋',
    author: 'Alex',
    timestamp: new Date(Date.now() - 300000),
    avatar: '🦊',
    isOwn: false,
  },
  {
    id: '2',
    text: 'Thanks! Excited to be here',
    author: 'You',
    timestamp: new Date(Date.now() - 240000),
    avatar: '🐸',
    isOwn: true,
  },
  {
    id: '3',
    text: 'Has anyone tried the new React Native update?',
    author: 'Sam',
    timestamp: new Date(Date.now() - 180000),
    avatar: '🦄',
    isOwn: false,
  },
  {
    id: '4',
    text: 'Yes! The performance improvements are amazing 🚀',
    author: 'Jordan',
    timestamp: new Date(Date.now() - 120000),
    avatar: '🐵',
    isOwn: false,
  },
];

export default function ChatRoomScreen() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const router = useRouter();
  const [messages, setMessages] = useState(SAMPLE_MESSAGES);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);
  
  const room = roomId ? ROOM_DATA[roomId as keyof typeof ROOM_DATA] : null;
  
  useEffect(() => {
    // Scroll to bottom when messages change or on initial load
    if (messages.length > 0) {
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    }
  }, [messages]);

  const sendMessage = () => {
    if (inputText.trim() && room) {
      const newMessage = {
        id: Date.now().toString(),
        text: inputText.trim(),
        author: 'You', // This would be the current user
        timestamp: new Date(),
        avatar: '🐸', // Current user's avatar
        isOwn: true,
      };
      
      setMessages(prev => [...prev, newMessage]);
      setInputText('');
    }
  };

  const renderMessage = ({ item, index }: { item: typeof SAMPLE_MESSAGES[0], index: number }) => {
    const prevMessage = messages[index - 1];
    const nextMessage = messages[index + 1];

    const isFirstInGroup = index === 0 || prevMessage?.author !== item.author || (item.timestamp.getTime() - prevMessage?.timestamp.getTime()) > 5 * 60 * 1000;
    const isLastInGroup = index === messages.length - 1 || nextMessage?.author !== item.author || (nextMessage?.timestamp.getTime() - item.timestamp.getTime()) > 5 * 60 * 1000;
    
    return (
      <MessageBubble
        message={item}
        isFirstInGroup={isFirstInGroup}
        isLastInGroup={isLastInGroup}
        onReaction={(messageId, emoji) => console.log(`Reacted ${emoji} to ${messageId}`)}
      />
    );
  };

  if (!room) {
    return (
      <View style={styles.container_error}>
        <Text style={styles.errorText}>Room not found.</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButtonOnError}>
          <Text style={styles.backButtonText_error}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: `# ${room.name}`,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: Platform.OS === 'ios' ? 10 : 0, padding:5 }}>
              <ChevronLeft size={24} color="#FFFFFF" />
            </TouchableOpacity>
          ),
        }}
      />
      
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Adjust as needed
      >
        <View style={[styles.roomHeader, { borderLeftColor: room.color }]}>
          <Hash size={16} color={room.color} />
          <Text style={styles.roomTitle}>{room.name}</Text>
        </View>
        
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
        />
        
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder={`Message #${room.name}`}
              placeholderTextColor="#72767d" // Discord placeholder color
              multiline
              maxLength={500} // Discord character limit is higher, but good for now
            />
            
            <View style={styles.inputActions}>
              <TouchableOpacity style={styles.emojiButton} onPress={() => console.log('Emoji picker')}>
                <Smile size={22} color="#B9BBBE" />
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  inputText.trim() ? styles.sendButtonActive : styles.sendButtonInactive
                ]}
                onPress={sendMessage}
                disabled={!inputText.trim()}
              >
                <Send 
                  size={18} 
                  color={inputText.trim() ? '#FFFFFF' : '#72767d'} 
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#36393F', // Discord main background
  },
  container_error: {
    flex: 1,
    backgroundColor: '#36393F',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  backButtonOnError: {
    backgroundColor: '#5865F2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  backButtonText_error: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  roomHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#202225', // Darker separator
    borderLeftWidth: 4,
  },
  roomTitle: {
    fontSize: 16, // Slightly smaller to match Discord
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  messagesList: {
    flex: 1,
  },
  messagesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10, // Add some vertical padding
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#202225', // Darker separator
    backgroundColor: '#36393F', // Ensure it matches the container bg
  },
  inputWrapper: {
    backgroundColor: '#40444B', // Discord input background
    borderRadius: 20, // More rounded
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    color: '#DCDDDE', // Discord text color
    fontSize: 15,
    maxHeight: 100,
    minHeight: 22, // Adjust for better vertical alignment
    paddingTop: Platform.OS === 'ios' ? 2 : 0, // iOS padding fix
    paddingBottom: Platform.OS === 'ios' ? 2 : 0, // iOS padding fix
  },
  inputActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  emojiButton: {
    padding: 6, // Slightly larger touch area
    marginRight: 6,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonActive: {
    backgroundColor: '#5865F2', // Discord blurple
  },
  sendButtonInactive: {
    // No specific background, rely on icon color
  },
});
