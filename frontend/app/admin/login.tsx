// frontend/app/admin/login.tsx
import { useState } from 'react';
import {View, Text, StyleSheet, TextInput,
  TouchableOpacity, KeyboardAvoidingView, Platform,, Image} from 'react-native';

import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { adminLogin } from '../../services/supabase';

const PRIMARY = '#2a73d4';
const PRIMARY_HOVER = '#2361b1';
const TEXT_MAIN = '#111111';
const TEXT_MUTED = '#4b4b4b';

export default function AdminLoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      await adminLogin(username.trim(), password);
      router.replace('/admin/dashboard');
    } catch (err) {
      setError('Invalid username or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#ffffff', '#eef5fc', '#7aaaf6']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <View style={styles.scrollContent}>

          {/* ===== HEADER: Logo + Brand ===== */}
          <View style={styles.header}>
            <Image
              source={require('../../assets/images/Logo.png')}
              style={styles.logoImg}
              resizeMode="contain"
            />
            <Text style={styles.brandTitle}>Telehealings</Text>
            <Text style={styles.brandSubtitle}>Continuity-First Wellness Care Platform</Text>
            <Text style={styles.pageTitle}>Admin Login</Text>
          </View>

          {/* ===== LOGIN CARD ===== */}
          <View style={styles.loginWrapper}>
            {/* Penguin Mascot - positioned to the right */}
            <View style={styles.penguinContainer}>
              <Image
                source={require('../../assets/images/Heali.png')}
                style={styles.penguinImg}
                resizeMode="contain"
              />
            </View>

            <View style={styles.loginCard}>
              {/* Card Body */}
              <View style={styles.cardBody}>

                {/* Username Input */}
                <View style={styles.inputGroup}>
                  <View style={styles.inputIconWrap}>
                    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <Path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                      <Circle cx={12} cy={7} r={4} />
                    </Svg>
                  </View>
                  <TextInput
                    style={styles.formControl}
                    placeholder="Email Address"
                    placeholderTextColor="#a8a8a8"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                </View>

                {/* Password Input */}
                <View style={styles.inputGroup}>
                  <View style={styles.inputIconWrap}>
                    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#a8a8a8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <Rect x={5} y={11} width={14} height={10} rx={2} ry={2} />
                      <Path d="M7 11V7a5 5 0 0110 0v4" />
                      <Circle cx={12} cy={16} r={1} />
                    </Svg>
                  </View>
                  <TextInput
                    style={styles.formControl}
                    placeholder="Password"
                    placeholderTextColor="#a8a8a8"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                </View>

                {/* Error */}
                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                {/* Login Button */}
                <TouchableOpacity
                  style={styles.btnPrimary}
                  onPress={handleLogin}
                  disabled={isLoading}
                  activeOpacity={0.85}
                >
                  <Text style={styles.btnPrimaryText}>
                    {isLoading ? 'Logging in...' : 'Log In'}
                  </Text>
                </TouchableOpacity>

                {/* Forgot Password */}
                <View style={styles.linksContainer}>
                  <TouchableOpacity>
                    <Text style={styles.linkText}>Forgot Password?</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Card Footer */}
              <View style={styles.cardFooter}>
                <Text style={styles.footerText}>
                  Have issues Sign In?{' '}
                  <Text style={styles.footerLink}>Contact Tech Team</Text>
                </Text>
              </View>
            </View>
          </View>

        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  // ---- HEADER ----
  header: {
    alignItems: 'center',
    marginBottom: 35,
  },
  logoImg: {
    width: 90,
    height: 90,
    marginBottom: 12,
  },
  brandTitle: {
    fontSize: 42,
    fontWeight: '700',
    letterSpacing: -1,
    color: '#0745b1',
    marginBottom: 6,
  },
  brandSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#144db9',
    marginBottom: 35,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: TEXT_MUTED,
    textAlign: 'center',
  },

  // ---- LOGIN WRAPPER ----
  loginWrapper: {
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
    position: 'relative',
  },

  // ---- PENGUIN MASCOT ----
  penguinContainer: {
    position: 'absolute',
    top: -120,
    right: -40,
    zIndex: 0,
  },
  penguinImg: {
    width: 160,
    height: 160,
  },

  // ---- LOGIN CARD ----
  loginCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.08,
    shadowRadius: 35,
    elevation: 8,
    zIndex: 1,
    overflow: 'hidden',
  },
  cardBody: {
    padding: 35,
    paddingBottom: 25,
  },

  // ---- INPUTS ----
  inputGroup: {
    position: 'relative',
    marginBottom: 18,
  },
  inputIconWrap: {
    position: 'absolute',
    left: 16,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    zIndex: 1,
  },
  formControl: {
    width: '100%',
    paddingVertical: 16,
    paddingLeft: 48,
    paddingRight: 16,
    backgroundColor: '#e8e8e8',
    borderWidth: 1,
    borderColor: '#999999',
    borderRadius: 8,
    fontSize: 15,
    color: '#000000',
  },
  errorText: {
    fontSize: 13,
    color: '#EF4444',
    textAlign: 'center',
    marginBottom: 10,
  },

  // ---- BUTTON ----
  btnPrimary: {
    width: '100%',
    paddingVertical: 16,
    backgroundColor: PRIMARY,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 25,
  },
  btnPrimaryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  // ---- LINKS ----
  linksContainer: {
    alignItems: 'center',
  },
  linkText: {
    fontSize: 13,
    fontWeight: '600',
    color: PRIMARY,
  },

  // ---- CARD FOOTER ----
  cardFooter: {
    backgroundColor: '#e5e4df',
    paddingVertical: 22,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000000',
  },
  footerLink: {
    color: PRIMARY,
  },
});
