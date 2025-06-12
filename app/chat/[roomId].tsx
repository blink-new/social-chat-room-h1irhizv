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
import { useState, useRef } from 'react';
import { useLocalSearchParams, Stack } from 'expo-router';
import { Send, Smile, Hash } from 'lucide-react-native';
import Animated, { FadeInRight, FadeInLeft } from 'react-native-reanimated';
import { MessageBubble } from '@/components/MessageBubble';

// Sample room data
const ROOM_DATA = {
  '1': { name: 'general', color: '#5865F2' },
  '2': { name: 'tech-talk', color: '#57F287' },
  '3': { name: 'gaming', color: '#FEE75C' },
  '4': { name: 'art-design', color: '#EB459E' },
  '5': { name: 'music', color: '#ED4245' },
  '6': { name: 'random', color: '#FF7A00' },
};

// Sample messages
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

export default function ChatRoom() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const [messages, setMessages] = useState(SAMPLE_MESSAGES);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);
  
  const room = ROOM_DATA[roomId as keyof typeof ROOM_DATA];
  
  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: inputText.trim(),
        author: 'You',
        timestamp: new Date(),
        avatar: '🐸',
        isOwn: true,
      };
      
      setMessages(prev => [...prev, newMessage]);
      setInputText('');
      
      // Scroll to bottom
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleReaction = (messageId: string, emoji: string) => {
    console.log(`Reaction ${emoji} added to message ${messageId}`);
    // Here you would update the message with the reaction in a real app
  };

  const renderMessage = ({ item, index }: { item: typeof SAMPLE_MESSAGES[0], index: number }) => {
    const isFirst = index === 0 || messages[index - 1].author !== item.author;
    
    return (
      <MessageBubble
        message={item}
        isFirst={isFirst}
        onReaction={handleReaction}
      />
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: `# ${room?.name || 'Chat'}`,
          headerStyle: {
            backgroundColor: '#36393F',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}
      />
      
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={[styles.roomHeader, { borderLeftColor: room?.color || '#5865F2' }]}>
          <Hash size={16} color={room?.color || '#5865F2'} />
          <Text style={styles.roomTitle}>{room?.name || 'Chat'}</Text>
        </View>
        
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />
        
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder={`Message #${room?.name || 'chat'}`}
              placeholderTextColor="#6A7075"
              multiline
              maxLength={500}
            />
            
            <View style={styles.inputActions}>
              <TouchableOpacity style={styles.emojiButton}>
                <Smile size={20} color="#B9BBBE" />
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
                  size={16} 
                  color={inputText.trim() ? '#FFFFFF' : '#6A7075'} 
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
    backgroundColor: '#36393F',
  },
  roomHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#40444B',
    borderLeftWidth: 3,
  },
  roomTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  messagesList: {
    flex: 1,
  },
  messagesContainer: {
    padding: 16,
    paddingBottom: 8,
  },

  inputContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#40444B',
  },
  inputWrapper: {
    backgroundColor: '#40444B',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    color: '#DCDDDE',
    fontSize: 16,
    maxHeight: 100,
    minHeight: 20,
  },
  inputActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  emojiButton: {
    padding: 4,
    marginRight: 8,
  },
  sendButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonActive: {
    backgroundColor: '#5865F2',
  },
  sendButtonInactive: {
    backgroundColor: 'transparent',
  },
});