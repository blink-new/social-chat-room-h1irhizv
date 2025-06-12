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
import { User, Settings, LogOut, UserPlus, Shield, Bell } from 'lucide-react-native';
// import Animated, { FadeInDown } from 'react-native-reanimated'; // Re-add if animations are desired

export default function ProfileScreen() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [username, setUsername] = useState('Anonymous User');
  const [userAvatar, setUserAvatar] = useState('🐸'); // Default avatar
  const [userTag, setUserTag] = useState('#0000'); // Discord-like tag

  const handleSignIn = () => {
    // Placeholder for actual sign-in logic
    Alert.alert(
      'Sign In',
      'Sign-in functionality will be implemented with Supabase.',
      [
        {
          text: 'Okay',
          onPress: () => {
            setIsSignedIn(true);
            setUsername('BlinkUser');
            setUserTag('#1234');
            setUserAvatar('🤖');
          },
        },
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
            setUserTag('#0000');
            setUserAvatar('🐸');
          },
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
      <View style={styles.optionIconWrapper}>
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
        <View /* Animated.View entering={FadeInDown.duration(400)} */ style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{userAvatar}</Text>
          </View>
          <View style={styles.userInfoContainer}>
            <Text style={styles.usernameText}>{username}</Text>
            <Text style={styles.userTagText}>{userTag}</Text>
          </View>
          <Text style={styles.userStatusText}>
            {isSignedIn ? 'Online' : 'Anonymous'} 
          </Text>
        </View>

        <View /* Animated.View entering={FadeInDown.delay(100).duration(400)} */ style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          {!isSignedIn ? (
            <ProfileOption
              icon={<UserPlus size={20} color="#5865F2" />}
              title="Sign In / Register"
              subtitle="Join the community or access your account"
              onPress={handleSignIn}
              color="#5865F2"
            />
          ) : (
            <ProfileOption
              icon={<LogOut size={20} color="#ED4245" />}
              title="Sign Out"
              subtitle={`Signed in as ${username}${userTag}`}
              onPress={handleSignOut}
              color="#ED4245"
            />
          )}
        </View>

        <View /* Animated.View entering={FadeInDown.delay(200).duration(400)} */ style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <ProfileOption
            icon={<Bell size={20} color="#B9BBBE" />}
            title="Notifications"
            subtitle="Manage your notification settings"
            onPress={() => Alert.alert('Notifications', 'Notification settings coming soon!')}
          />
          <ProfileOption
            icon={<Settings size={20} color="#B9BBBE" />}
            title="App Settings"
            subtitle="Theme, behavior, and more"
            onPress={() => Alert.alert('App Settings', 'App settings coming soon!')}
          />
          <ProfileOption
            icon={<Shield size={20} color="#B9BBBE" />}
            title="Privacy & Safety"
            subtitle="Control your data and safety options"
            onPress={() => Alert.alert('Privacy & Safety', 'Privacy settings coming soon!')}
          />
        </View>

        <View /* Animated.View entering={FadeInDown.delay(300).duration(400)} */ style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.aboutCard}>
            <Text style={styles.aboutText}>
              Social Chat Room App v1.0.0
            </Text>
            <Text style={styles.aboutSubText}>
              Built with Blink & Expo
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#36393F', // Discord main background
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    backgroundColor: '#2F3136', // Slightly lighter header background
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#202225',
  },
  avatarContainer: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#40444B', // Darker circle for avatar
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#5865F2', // Blurple border for avatar
  },
  avatarText: {
    fontSize: 48,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  usernameText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  userTagText: {
    fontSize: 14,
    color: '#B9BBBE',
    marginLeft: 4,
  },
  userStatusText: {
    fontSize: 14,
    color: '#43b581', // Discord online green
    fontWeight: '600',
  },
  section: {
    paddingTop: 16, // Add padding top to separate sections
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8e9297', // Discord section title color
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  optionCard: {
    backgroundColor: '#2F3136', // Card background
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    // backgroundColor: '#40444B', // Icon background can be removed for cleaner look
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#DCDDDE', // Main text color
  },
  optionSubtitle: {
    fontSize: 13,
    color: '#B9BBBE', // Subtitle text color
    marginTop: 2,
  },
  aboutCard: {
    backgroundColor: '#2F3136',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  aboutText: {
    fontSize: 14,
    color: '#DCDDDE',
    lineHeight: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
  aboutSubText: {
    fontSize: 12,
    color: '#B9BBBE',
    textAlign: 'center',
    marginTop: 4,
  },
});
