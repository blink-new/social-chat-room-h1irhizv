import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  Alert,
  ScrollView
} from 'react-native';
import { useState } from 'react';
import { User, Settings, LogOut, UserPlus, Shield } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function Profile() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [username, setUsername] = useState('Anonymous User');
  const [userAvatar, setUserAvatar] = useState('🐸');

  const handleSignIn = () => {
    Alert.alert(
      'Sign In',
      'Choose your sign in method:',
      [
        { text: 'Email & Password', onPress: () => {
          setIsSignedIn(true);
          setUsername('Alex Cooper');
        }},
        { text: 'Continue as Guest', onPress: () => {
          setIsSignedIn(false);
          setUsername('Anonymous User');
        }},
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: () => {
            setIsSignedIn(false);
            setUsername('Anonymous User');
          }
        },
      ]
    );
  };

  const ProfileOption = ({ icon, title, subtitle, onPress, color = '#DCDDDE' }: {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    onPress: () => void;
    color?: string;
  }) => (
    <TouchableOpacity style={styles.optionCard} onPress={onPress}>
      <View style={styles.optionIcon}>
        {icon}
      </View>
      <View style={styles.optionContent}>
        <Text style={[styles.optionTitle, { color }]}>{title}</Text>
        {subtitle && <Text style={styles.optionSubtitle}>{subtitle}</Text>}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInDown.duration(400)} style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatar}>{userAvatar}</Text>
          </View>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.userStatus}>
            {isSignedIn ? 'Signed In' : 'Anonymous User'}
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          {!isSignedIn ? (
            <ProfileOption
              icon={<UserPlus size={20} color="#5865F2" />}
              title="Sign In"
              subtitle="Access your account and sync messages"
              onPress={handleSignIn}
              color="#5865F2"
            />
          ) : (
            <ProfileOption
              icon={<LogOut size={20} color="#ED4245" />}
              title="Sign Out"
              subtitle="Continue as anonymous user"
              onPress={handleSignOut}
              color="#ED4245"
            />
          )}
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <ProfileOption
            icon={<Settings size={20} color="#B9BBBE" />}
            title="App Settings"
            subtitle="Notifications, theme, and more"
            onPress={() => Alert.alert('Settings', 'Settings coming soon!')}
          />
          
          <ProfileOption
            icon={<Shield size={20} color="#B9BBBE" />}
            title="Privacy & Safety"
            subtitle="Manage your privacy settings"
            onPress={() => Alert.alert('Privacy', 'Privacy settings coming soon!')}
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.aboutCard}>
            <Text style={styles.aboutText}>
              Social Chat Room v1.0{'\n'}
              Connect with others in topic-based chat rooms
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#36393F',
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    padding: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#40444B',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2F3136',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    fontSize: 48,
  },
  username: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userStatus: {
    fontSize: 14,
    color: '#B9BBBE',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#B9BBBE',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  optionCard: {
    backgroundColor: '#2F3136',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#40444B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#B9BBBE',
  },
  aboutCard: {
    backgroundColor: '#2F3136',
    borderRadius: 12,
    padding: 16,
  },
  aboutText: {
    fontSize: 14,
    color: '#DCDDDE',
    lineHeight: 20,
    textAlign: 'center',
  },
});