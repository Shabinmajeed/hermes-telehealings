// frontend/app/(user)/signup/profile-success.tsx
import { useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Path, Polyline, Rect, Line } from 'react-native-svg';

export default function ProfileSuccessScreen() {
  const router = useRouter();
  const popAnim = useRef(new Animated.Value(0)).current;
  const slideAnim1 = useRef(new Animated.Value(0)).current;
  const slideAnim2 = useRef(new Animated.Value(0)).current;
  const slideAnim3 = useRef(new Animated.Value(0)).current;
  const slideAnim4 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Pop-in for icon
    Animated.timing(popAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    // Staggered slide-up for content
    Animated.stagger(100, [
      Animated.timing(slideAnim1, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(slideAnim2, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(slideAnim3, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(slideAnim4, { toValue: 1, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  const popStyle = {
    transform: [{
      scale: popAnim.interpolate({
        inputRange: [0, 0.4, 1],
        outputRange: [0.8, 1.1, 1],
      }),
    }],
    opacity: popAnim,
  };

  const slideUpStyle = (anim: Animated.Value) => ({
    opacity: anim,
    transform: [{
      translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [15, 0] }),
    }],
  });

  const handleCompleteMedical = () => {
    // Navigate to medical profile (future feature)
    // For now, go to home
    router.replace('/(user)/home');
  };

  const handleGoHome = () => {
    router.replace('/(user)/home');
  };

  return (
    <View style={styles.container}>
      {/* ===== CONTENT SECTION ===== */}
      <View style={styles.contentSection}>
        {/* Animated Icon */}
        <Animated.View style={[styles.iconWrapper, popStyle]}>
          <Svg width={48} height={48} viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <Polyline points="9 12 11 14 15 10" />
          </Svg>
        </Animated.View>

        {/* Title */}
        <Animated.Text style={[styles.title, slideUpStyle(slideAnim1)]}>
          Profile Updated Successfully!
        </Animated.Text>

        {/* Subtitle */}
        <Animated.Text style={[styles.subtitle, slideUpStyle(slideAnim2)]}>
          Your personal details have been saved securely. We value your privacy and guarantee that your information will never be shared with third parties.
        </Animated.Text>

        {/* Secure Badge */}
        <Animated.View style={[styles.secureBadge, slideUpStyle(slideAnim3)]}>
          <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <Rect x={3} y={11} width={18} height={11} rx={2} ry={2} />
            <Path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </Svg>
          <Text style={styles.secureBadgeText}>End-to-End Encrypted</Text>
        </Animated.View>
      </View>

      {/* ===== BOTTOM ACTIONS ===== */}
      <Animated.View style={[styles.bottomActions, slideUpStyle(slideAnim4)]}>
        <TouchableOpacity
          style={styles.btnPrimary}
          onPress={handleCompleteMedical}
          activeOpacity={0.8}
        >
          <Text style={styles.btnPrimaryText}>Complete Medical Profile</Text>
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <Line x1={5} y1={12} x2={19} y2={12} />
            <Polyline points="12 5 19 12 12 19" />
          </Svg>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnSecondary}
          onPress={handleGoHome}
          activeOpacity={0.8}
        >
          <Text style={styles.btnSecondaryText}>Go to Home</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const PRIMARY = '#387bd5';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  // ---- CONTENT ----
  contentSection: {
    flex: 1,
    flexShrink: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 16,
  },
  iconWrapper: {
    width: 100,
    height: 100,
    backgroundColor: '#f0fdfa',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    shadowColor: '#0d9488',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 35,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#335075',
    marginBottom: 16,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#637b96',
    lineHeight: 24,
    textAlign: 'center',
    paddingHorizontal: 8,
    flexShrink: 1,
  },
  secureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginTop: 24,
  },
  secureBadgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
  },

  // ---- BOTTOM ACTIONS ----
  bottomActions: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    gap: 16,
  },
  btnPrimary: {
    backgroundColor: PRIMARY,
    width: '100%',
    height: 56,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: '#387bd5',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 25,
    elevation: 6,
  },
  btnPrimaryText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
  },
  btnSecondary: {
    width: '100%',
    height: 56,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSecondaryText: {
    color: '#475569',
    fontSize: 17,
    fontWeight: '600',
  },
});
