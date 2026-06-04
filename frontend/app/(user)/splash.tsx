// frontend/app/(user)/splash.tsx
import { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing } from '../../constants/theme';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    console.log('SPLASH MOUNTED');
  }, []);

  return (
    <View style={outer.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={outer.touchArea}
        onPress={() => {
          console.log('TAP DETECTED');
          router.push('/(user)/marketing');
        }}
      >
        <View style={styles.content}>
          {/* Logo as header icon */}
          <Image
            source={require('../../assets/images/Logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* Main title */}
          <Text style={styles.appName}>Telehealings</Text>

          {/* Tagline */}
          <Text style={styles.tagline}>
            Continuity-First Wellness Care Platform
          </Text>

          {/* Tap to continue */}
          <Text style={styles.tapHint}>Tap anywhere to continue</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const outer = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  touchArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: Spacing.xl,
  },
  appName: {
    fontSize: Typography.sizes.xxxl,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
    letterSpacing: 1,
    marginBottom: Spacing.md,
  },
  tagline: {
    fontSize: Typography.sizes.base,
    fontStyle: 'italic',
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xxxl,
    paddingHorizontal: Spacing.lg,
    lineHeight: Typography.lineHeights.relaxed,
  },
  tapHint: {
    fontSize: Typography.sizes.sm,
    color: Colors.textTertiary,
    letterSpacing: 2,
  },
});
