// frontend/app/(user)/marketing.tsx
import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing } from '../../constants/theme';

const ACCENT = '#1e5ab8';

export default function MarketingScreen() {
  const router = useRouter();

  // Entrance animations
  const titleAnim = useRef(new Animated.Value(0)).current;
  const subtitleAnim = useRef(new Animated.Value(0)).current;
  const featuresAnim = useRef(new Animated.Value(0)).current;
  const statsAnim = useRef(new Animated.Value(0)).current;
  const bottomAnim = useRef(new Animated.Value(0)).current;

  // Float animation for Heali
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Staggered entrance: title -> subtitle -> features -> stats -> bottom
    Animated.stagger(100, [
      Animated.timing(titleAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(subtitleAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(featuresAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(statsAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(bottomAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
    ]).start();

    // Continuous floating animation for Heali
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: -8, duration: 2000, useNativeDriver: true }),
        Animated.timing(floatAnim, { toValue: 0, duration: 2000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const slideUpStyle = (anim: Animated.Value) => ({
    opacity: anim,
    transform: [
      {
        translateY: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 0],
        }),
      },
    ],
  });

  return (
    <View style={styles.container}>
      {/* ===== TOP SECTION: subtle blue gradient with curved bottom ===== */}
      <LinearGradient
        colors={['rgba(59,130,246,0.12)', 'rgba(226,239,250,1)']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.topSection}
      >
        {/* Logo */}
        <View style={styles.logoBox}>
          <Image
            source={require('../../assets/images/Logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Title */}
        <Animated.Text style={[styles.title, slideUpStyle(titleAnim)]}>
          Telehealings
        </Animated.Text>

        {/* Subtitle */}
        <Animated.Text style={[styles.subtitle, slideUpStyle(subtitleAnim)]}>
          Continuity-first wellness care platform
        </Animated.Text>

        {/* Features list */}
        <Animated.View style={[styles.featuresList, slideUpStyle(featuresAnim)]}>
          <Text style={styles.featureItem}>✦ Ai-powered conversational partner</Text>
          <Text style={styles.featureItem}>✦ Therapist handover continuity</Text>
          <Text style={styles.featureItem}>✦ Self-help library</Text>
        </Animated.View>

        {/* Stats row */}
        <Animated.View style={[styles.statsRow, slideUpStyle(statsAnim)]}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>200+</Text>
            <Text style={styles.statLabel}>Verified{'\n'}therapists</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>8+</Text>
            <Text style={styles.statLabel}>Languages{'\n'} </Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>1,000+</Text>
            <Text style={styles.statLabel}>Hours of{'\n'}therapy</Text>
          </View>
        </Animated.View>
      </LinearGradient>

      {/* ===== BOTTOM SECTION: white area with Heali + CTA ===== */}
      <Animated.View style={[styles.bottomSection, slideUpStyle(bottomAnim)]}>
        {/* Heali mascot with floating animation */}
        <Animated.Image
          source={require('../../assets/images/Heali.png')}
          style={[styles.heali, { transform: [{ translateY: floatAnim }] }]}
          resizeMode="contain"
        />

        {/* CTA row: text + circular arrow button */}
        <View style={styles.ctaRow}>
          <Text style={styles.ctaText}>
            Your wellness journey{'\n'}is one click away.
          </Text>
          <TouchableOpacity
            style={styles.btnCircle}
            activeOpacity={0.8}
            onPress={() => router.push('/(user)/onboarding')}
          >
            <Text style={styles.arrowIcon}>→</Text>
          </TouchableOpacity>
        </View>
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
  topSection: {
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 30,
    alignItems: 'center',
    // Curved bottom edge (approximated with large border radius on bottom corners)
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 4,
    zIndex: 1,
  },
  logoBox: {
    marginBottom: 10,
  },
  logo: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: ACCENT,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '700',
    color: ACCENT,
    textAlign: 'center',
    marginBottom: 35,
  },

  // ---- FEATURES ----
  featuresList: {
    width: '100%',
    maxWidth: 300,
    marginBottom: 40,
  },
  featureItem: {
    fontSize: 14,
    fontWeight: '600',
    color: ACCENT,
    marginBottom: 9,
    paddingLeft: 24,
  },

  // ---- STATS ----
  statsRow: {
    flexDirection: 'row',
    width: '100%',
    maxWidth: 340,
    justifyContent: 'space-between',
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.04,
    shadowRadius: 30,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: ACCENT,
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: '#55605E',
    textAlign: 'center',
    lineHeight: 13,
    letterSpacing: 0.5,
  },

  // ---- BOTTOM SECTION ----
  bottomSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 60,
    backgroundColor: '#FFFFFF',
  },
  heali: {
    width: 90,
    height: 90,
  },
  ctaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  ctaText: {
    fontSize: 24,
    fontWeight: '700',
    color: ACCENT,
    lineHeight: 31,
    letterSpacing: -0.5,
  },

  // ---- CIRCULAR ARROW BUTTON ----
  btnCircle: {
    backgroundColor: '#387bd5',
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#387bd5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 6,
  },
  arrowIcon: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '400',
  },
});
