import { Tabs } from 'expo-router';
import { MessageCircle, User } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#2F3136', // Discord-like dark gray
          borderTopColor: '#202225', // Slightly darker border
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: '#5865F2', // Discord blurple
        tabBarInactiveTintColor: '#B9BBBE', // Discord light gray for inactive
        headerStyle: {
          backgroundColor: '#2F3136', // Match tab bar
        },
        headerTintColor: '#FFFFFF', // White text for header
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Rooms',
          tabBarIcon: ({ color, size }) => (
            <MessageCircle size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat/[roomId]"
        options={{
          href: null, // Hide from tab bar, accessed programmatically
          title: 'Chat', // Default title, will be overridden by specific room
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <User size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
