// frontend/app/(user)/personalisation.tsx
import { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Image, Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle } from 'react-native-svg';
import { useAuthStore } from '../../stores/authStore';
import { api } from '../../services/api';

const ACCENT = '#1e5ab8';
const ICON_COLOR = '#1e5ab8';
const ICON_COLOR_SELECTED = '#387bd5';

const TOPICS = [
  { id: 'stress', title: 'Stress', subtitle: 'Managing daily pressure' },
  { id: 'anxiety', title: 'Anxiety', subtitle: 'Calming your mind' },
  { id: 'sleep', title: 'Sleep', subtitle: 'Better rest' },
  { id: 'relationships', title: 'Relationships', subtitle: 'Building connections' },
  { id: 'self-esteem', title: 'Self-esteem', subtitle: 'Building confidence' },
  { id: 'focus', title: 'Focus', subtitle: 'Improving concentration' },
];

// SVG icon components — all use the same blue accent color
const StressIcon = ({ color }: { color: string }) => (
  <Svg width={38} height={38} viewBox="0 0 24 24">
    <Path d="M17 18a4.5 4.5 0 0 0 .76-8.93 7 7 0 0 0-13.33-1.6A4.5 4.5 0 0 0 6 18h4v-3H8l4-6v4h2l-4 6h3z" fill={color} />
  </Svg>
);

const AnxietyIcon = ({ color }: { color: string }) => (
  <Svg width={38} height={38} viewBox="0 0 24 24">
    <Path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill={color} />
  </Svg>
);

const SleepIcon = ({ color }: { color: string }) => (
  <Svg width={38} height={38} viewBox="0 0 24 24">
    <Path d="M12.1 2.3a.7.7 0 0 0-1.1-.3C7 5 4.6 9 4.8 13.5A9.5 9.5 0 0 0 14.2 23c4.4.2 8.4-2.1 10.9-6 .2-.3 0-.8-.4-1-.8-.4-1.7-.5-2.6-.5-5.3 0-9.6-4.3-9.6-9.6 0-1.3.3-2.6.8-3.7.1-.4 0-.7-.2-.9z" fill={color} />
  </Svg>
);

const RelationshipsIcon = ({ color }: { color: string }) => (
  <Svg width={38} height={38} viewBox="0 0 24 24">
    <Path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill={color} />
  </Svg>
);

const SelfEsteemIcon = ({ color }: { color: string }) => (
  <Svg width={38} height={38} viewBox="0 0 24 24">
    <Path d="M22 3C22 3 19 3 15 6C11 9 11 14 11 14V21H13V15C13 15 14 13 16 13C20 13 22 9 22 3ZM2 7C2 7 5 7 9 10C13 13 13 18 13 18V21H11V19C11 19 10 17 8 17C4 17 2 13 2 7Z" fill={color} />
  </Svg>
);

const FocusIcon = ({ color }: { color: string }) => (
  <Svg width={38} height={38} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.5}>
    <Circle cx={12} cy={12} r={10} />
    <Circle cx={12} cy={12} r={6} />
    <Circle cx={12} cy={12} r={2} fill={color} stroke="none" />
  </Svg>
);

const ICON_MAP: Record<string, React.FC<{ color: string }>> = {
  stress: StressIcon,
  anxiety: AnxietyIcon,
  sleep: SleepIcon,
  relationships: RelationshipsIcon,
  'self-esteem': SelfEsteemIcon,
  focus: FocusIcon,
};

export default function PersonalisationScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const topAnim = useRef(new Animated.Value(0)).current;
  const gridAnim = useRef(new Animated.Value(0)).current;
  const bottomAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.stagger(150, [
      Animated.timing(topAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(gridAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(bottomAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  const slideUpStyle = (anim: Animated.Value) => ({
    opacity: anim,
    transform: [{
      translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [15, 0] }),
    }],
  });

  const toggleTopic = (id: string) => {
    setSelectedTopics((prev) => {
      if (prev.includes(id)) {
        setErrorMsg('');
        return prev.filter((t) => t !== id);
      }
      if (prev.length >= 3) {
        setErrorMsg('You can only choose a maximum of 3 cards.');
        setTimeout(() => setErrorMsg(''), 2000);
        return prev;
      }
      setErrorMsg('');
      return [...prev, id];
    });
  };

  const isValid = selectedTopics.length >= 1;

  const handleContinue = async () => {
    if (!isValid || isSubmitting || !user) return;
    setIsSubmitting(true);
    try {
      await api.updateUser(user.id, { topics: selectedTopics });
      router.push('/(user)/home');
    } catch (error) {
      console.error('Failed to update topics:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* ===== TOP CURVED SECTION ===== */}
      <Animated.View style={[styles.topBgCurve, slideUpStyle(topAnim)]}>
        <LinearGradient
          colors={['#cbe0f9', '#e2effa']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.topGradient}
        >
          <View style={styles.headerRow}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => router.back()}
              activeOpacity={0.6}
            >
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>

            <Text style={styles.title}>What brings you here?</Text>

            <View style={styles.mascotContainer}>
              <Image
                source={require('../../assets/images/Heali.png')}
                style={styles.mascotImg}
                resizeMode="contain"
              />
            </View>
          </View>

          <Text style={styles.subtitle}>
            Choose what you'd like to focus on first. We'll personalize your journey based on your needs.
          </Text>
        </LinearGradient>
      </Animated.View>

      {/* ===== CONTENT: options grid ===== */}
      <View style={styles.contentSection}>
        <Animated.View style={[styles.optionsGrid, slideUpStyle(gridAnim)]}>
          {TOPICS.map((topic) => {
            const isSelected = selectedTopics.includes(topic.id);
            const isDisabled = !isSelected && selectedTopics.length >= 3;
            const IconComp = ICON_MAP[topic.id];

            return (
              <TouchableOpacity
                key={topic.id}
                style={[
                  styles.optionCard,
                  isSelected && styles.optionCardSelected,
                  isDisabled && styles.optionCardDisabled,
                ]}
                onPress={() => toggleTopic(topic.id)}
                activeOpacity={0.8}
                disabled={isDisabled}
              >
                <View style={styles.iconBox}>
                  {IconComp && (
                    <IconComp color={isSelected ? ICON_COLOR_SELECTED : ICON_COLOR} />
                  )}
                </View>
                <Text style={[styles.optionTitle, isSelected && styles.optionTitleSelected]}>
                  {topic.title}
                </Text>
                <Text style={[styles.optionSubtitle, isSelected && styles.optionSubtitleSelected]}>
                  {topic.subtitle}
                </Text>
              </TouchableOpacity>
            );
          })}
        </Animated.View>
      </View>

      {/* ===== BOTTOM: selection info + continue button ===== */}
      <Animated.View style={[styles.bottomSection, slideUpStyle(bottomAnim)]}>
        <Text style={[styles.selectionInfo, errorMsg && styles.selectionInfoError]}>
          {errorMsg || (isValid ? '' : 'Select at least 1 option to continue')}
        </Text>

        <TouchableOpacity
          style={[styles.btnPrimary, !isValid && styles.btnPrimaryDisabled]}
          onPress={handleContinue}
          disabled={!isValid || isSubmitting}
          activeOpacity={0.8}
        >
          <Text style={styles.btnPrimaryText}>Continue</Text>
          <Text style={styles.btnArrow}>→</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  // ---- TOP SECTION ----
  topBgCurve: {
    marginBottom: 5,
  },
  topGradient: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 30,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backArrow: {
    fontSize: 24,
    color: '#384e68',
    fontWeight: '600',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    color: ACCENT,
    letterSpacing: -0.5,
  },
  mascotContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  mascotImg: {
    width: 34,
    height: 34,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#4f6885',
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 10,
  },

  // ---- CONTENT ----
  contentSection: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 5,
    paddingBottom: 15,
    justifyContent: 'center',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },

  // ---- OPTION CARD ----
  optionCard: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: 'transparent',
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.03,
    shadowRadius: 25,
    elevation: 2,
  },
  optionCardSelected: {
    backgroundColor: 'rgba(59, 130, 246, 0.06)',
    borderColor: '#387bd5',
    shadowColor: '#387bd5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  optionCardDisabled: {
    opacity: 0.5,
  },
  iconBox: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a293b',
    marginBottom: 4,
  },
  optionTitleSelected: {
    color: ACCENT,
  },
  optionSubtitle: {
    fontSize: 11,
    color: '#64748b',
    lineHeight: 13,
  },
  optionSubtitleSelected: {
    color: '#385b8a',
  },

  // ---- BOTTOM SECTION ----
  bottomSection: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 25,
    backgroundColor: '#FFFFFF',
  },
  selectionInfo: {
    textAlign: 'center',
    fontSize: 13,
    color: '#64748b',
    marginBottom: 16,
    fontWeight: '400',
    fontStyle: 'italic',
    opacity: 0.8,
    minHeight: 18,
  },
  selectionInfoError: {
    color: '#d93838',
    opacity: 1,
  },

  // ---- BUTTON ----
  btnPrimary: {
    backgroundColor: '#387bd5',
    width: '80%',
    height: 56,
    borderRadius: 30,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 15,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 25,
    elevation: 6,
  },
  btnPrimaryDisabled: {
    backgroundColor: '#c8d9ed',
    shadowOpacity: 0,
    elevation: 0,
  },
  btnPrimaryText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
  btnArrow: {
    color: '#FFFFFF',
    fontSize: 20,
  },
});
