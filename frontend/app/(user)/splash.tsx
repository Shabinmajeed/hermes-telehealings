import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Typography, Spacing } from '../../constants/theme';

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePress = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
    }).start(() => {
      router.push('/(user)/marketing');
    });
  };

  return (
    <LinearGradient
      colors={['#5b96ea', '#387bd5']}
      style={outer.container}
    >
      <TouchableOpacity
        activeOpacity={1}
        style={outer.touchArea}
        onPress={handlePress}
      >
        <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ scale: fadeAnim }] }]}>
          {/* Logo in white circle */}
          <View style={styles.logoCircle}>
            <Image
              source={require('../../assets/images/Logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* App name */}
          <Text style={styles.appName}>Telehealings</Text>

          {/* Tagline */}
          <Text style={styles.tagline}>
            Continuity-First Wellness Care Platform
          </Text>
        </Animated.View>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const outer = StyleSheet.create({
  container: {
    flex: 1,
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
  logoCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
    marginTop: -60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.1,
    shadowRadius: 40,
    elevation: 10,
  },
  logo: {
    width: 100,
    height: 100,
  },
  appName: {
    fontSize: 36,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
    letterSpacing: 0.01,
  },
  tagline: {
    fontSize: 12,
    fontWeight: '500',
    color: '#E2EFFB',
    opacity: 0.85,
    letterSpacing: 0.06 * 12,
  },
});
