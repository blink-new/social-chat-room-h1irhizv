import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TouchableWithoutFeedback,
  Alert 
} from 'react-native';
import { Heart, ThumbsUp, Laugh, Frown } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  runOnJS
} from 'react-native-reanimated';

const EMOJI_REACTIONS = [
  { emoji: '👍', icon: ThumbsUp, color: '#5865F2' },
  { emoji: '❤️', icon: Heart, color: '#ED4245' },
  { emoji: '😂', icon: Laugh, color: '#FEE75C' },
  { emoji: '😢', icon: Frown, color: '#99AAB5' },
];

interface Reaction {
  emoji: string;
  count: number;
  hasReacted: boolean;
}

interface MessageBubbleProps {
  message: {
    id: string;
    text: string;
    author: string;
    timestamp: Date;
    avatar: string;
    isOwn: boolean;
  };
  isFirst: boolean;
  onReaction?: (messageId: string, emoji: string) => void;
}

export function MessageBubble({ message, isFirst, onReaction }: MessageBubbleProps) {
  const [reactions, setReactions] = useState<Reaction[]>([
    { emoji: '👍', count: 0, hasReacted: false },
    { emoji: '❤️', count: 0, hasReacted: false },
  ]);
  const [showReactionMenu, setShowReactionMenu] = useState(false);
  
  const reactionScale = useSharedValue(0);
  const reactionOpacity = useSharedValue(0);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleLongPress = () => {
    setShowReactionMenu(true);
    reactionScale.value = withSpring(1);
    reactionOpacity.value = withSpring(1);
  };

  const hideReactionMenu = () => {
    reactionScale.value = withSpring(0);
    reactionOpacity.value = withSpring(0, undefined, () => {
      runOnJS(setShowReactionMenu)(false);
    });
  };

  const handleReaction = (emoji: string) => {
    setReactions(prev => prev.map(reaction => {
      if (reaction.emoji === emoji) {
        return {
          ...reaction,
          count: reaction.hasReacted ? reaction.count - 1 : reaction.count + 1,
          hasReacted: !reaction.hasReacted,
        };
      }
      return reaction;
    }));
    
    onReaction?.(message.id, emoji);
    hideReactionMenu();
  };

  const reactionMenuStyle = useAnimatedStyle(() => ({
    transform: [{ scale: reactionScale.value }],
    opacity: reactionOpacity.value,
  }));

  const visibleReactions = reactions.filter(r => r.count > 0);

  return (
    <TouchableWithoutFeedback onPress={hideReactionMenu}>
      <View style={[
        styles.messageContainer,
        message.isOwn ? styles.ownMessage : styles.otherMessage,
      ]}>
        {!message.isOwn && isFirst && (
          <View style={styles.avatarContainer}>
            <Text style={styles.avatar}>{message.avatar}</Text>
          </View>
        )}
        
        <View style={styles.messageContent}>
          <TouchableOpacity
            style={[
              styles.messageBubble,
              message.isOwn ? styles.ownBubble : styles.otherBubble,
              !message.isOwn && !isFirst && styles.continuingMessage,
            ]}
            onLongPress={handleLongPress}
            activeOpacity={0.8}
          >
            {!message.isOwn && isFirst && (
              <Text style={styles.authorName}>{message.author}</Text>
            )}
            <Text style={[
              styles.messageText,
              message.isOwn ? styles.ownMessageText : styles.otherMessageText,
            ]}>
              {message.text}
            </Text>
            <Text style={[
              styles.timestamp,
              message.isOwn ? styles.ownTimestamp : styles.otherTimestamp,
            ]}>
              {formatTime(message.timestamp)}
            </Text>
          </TouchableOpacity>

          {/* Reactions Display */}
          {visibleReactions.length > 0 && (
            <View style={[
              styles.reactionsContainer,
              message.isOwn ? styles.ownReactions : styles.otherReactions
            ]}>
              {visibleReactions.map(reaction => (
                <TouchableOpacity
                  key={reaction.emoji}
                  style={[
                    styles.reactionBadge,
                    reaction.hasReacted && styles.reactionBadgeActive
                  ]}
                  onPress={() => handleReaction(reaction.emoji)}
                >
                  <Text style={styles.reactionEmoji}>{reaction.emoji}</Text>
                  <Text style={[
                    styles.reactionCount,
                    reaction.hasReacted && styles.reactionCountActive
                  ]}>
                    {reaction.count}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Reaction Menu */}
          {showReactionMenu && (
            <Animated.View style={[styles.reactionMenu, reactionMenuStyle]}>
              {EMOJI_REACTIONS.map(({ emoji, icon: Icon, color }) => (
                <TouchableOpacity
                  key={emoji}
                  style={[styles.reactionButton, { backgroundColor: color }]}
                  onPress={() => handleReaction(emoji)}
                >
                  <Text style={styles.reactionButtonEmoji}>{emoji}</Text>
                </TouchableOpacity>
              ))}
            </Animated.View>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 4,
    alignItems: 'flex-end',
  },
  ownMessage: {
    justifyContent: 'flex-end',
  },
  otherMessage: {
    justifyContent: 'flex-start',
  },
  avatarContainer: {
    marginRight: 8,
    marginBottom: 4,
  },
  avatar: {
    fontSize: 32,
    width: 40,
    height: 40,
    textAlign: 'center',
    lineHeight: 40,
  },
  messageContent: {
    maxWidth: '75%',
    position: 'relative',
  },
  messageBubble: {
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 2,
  },
  continuingMessage: {
    marginLeft: 48,
  },
  ownBubble: {
    backgroundColor: '#5865F2',
  },
  otherBubble: {
    backgroundColor: '#2F3136',
  },
  authorName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  ownMessageText: {
    color: '#FFFFFF',
  },
  otherMessageText: {
    color: '#DCDDDE',
  },
  timestamp: {
    fontSize: 11,
    marginTop: 2,
  },
  ownTimestamp: {
    color: '#B9BBBE',
  },
  otherTimestamp: {
    color: '#72767D',
  },
  reactionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  ownReactions: {
    justifyContent: 'flex-end',
  },
  otherReactions: {
    justifyContent: 'flex-start',
  },
  reactionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#40444B',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 4,
    marginBottom: 2,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  reactionBadgeActive: {
    backgroundColor: '#5865F2',
    borderColor: '#4752C4',
  },
  reactionEmoji: {
    fontSize: 12,
    marginRight: 4,
  },
  reactionCount: {
    fontSize: 12,
    color: '#B9BBBE',
    fontWeight: '600',
  },
  reactionCountActive: {
    color: '#FFFFFF',
  },
  reactionMenu: {
    position: 'absolute',
    top: -60,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#2F3136',
    borderRadius: 24,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1000,
  },
  reactionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  reactionButtonEmoji: {
    fontSize: 20,
  },
});