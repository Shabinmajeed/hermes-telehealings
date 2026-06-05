// frontend/app/(auth)/login.tsx
import { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity,
  TextInput, Animated, Image} from 'react-native';

import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, Line, Polyline } from 'react-native-svg';
import { useRef, useEffect } from 'react';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogin = () => {
    // TODO: integrate with Supabase auth
    router.replace('/(user)/home');
  };

  const slideUpStyle = {
    opacity: slideAnim,
    transform: [{
      translateY: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [15, 0] }),
    }],
  };

  return (
    <View style={styles.container}>
      {/* ===== TOP CURVED SECTION ===== */}
      <LinearGradient
        colors={['#cbe0f9', '#e2effa']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.topSection}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#384e68" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <Line x1={19} y1={12} x2={5} y2={12} />
              <Polyline points="12 19 5 12 12 5" />
            </Svg>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Welcome Back</Text>

          <View style={styles.headerHeali}>
            <Image
              source={require('../../assets/images/Heali.png')}
              style={styles.healiImg}
              resizeMode="contain"
            />
          </View>
        </View>

        <Text style={styles.headerSubtitle}>Log in to continue your wellness journey.</Text>
      </LinearGradient>

      {/* ===== FORM SECTION ===== */}
      <Animated.View style={[styles.formSection, slideUpStyle]}>
        {/* Email / Phone */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email or Phone</Text>
          <TextInput
            style={styles.customInput}
            placeholder="Enter your email or phone"
            placeholderTextColor="#94a3b8"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={[styles.customInput, styles.customInputWithIcon]}
            placeholder="Enter your password"
            placeholderTextColor="#94a3b8"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.passwordToggle}
            onPress={() => setShowPassword(!showPassword)}
            activeOpacity={0.6}
          >
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              {showPassword ? (
                <>
                  <Path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <Line x1={1} y1={1} x2={23} y2={23} />
                </>
              ) : (
                <>
                  <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <Circle cx={12} cy={12} r={3} />
                </>
              )}
            </Svg>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.forgotPassword} activeOpacity={0.7}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnPrimary}
          onPress={handleLogin}
          activeOpacity={0.8}
        >
          <Text style={styles.btnPrimaryText}>Login</Text>
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <Line x1={5} y1={12} x2={19} y2={12} />
            <Polyline points="12 5 19 12 12 19" />
          </Svg>
        </TouchableOpacity>

        <Text style={styles.dividerText}>Or login with</Text>

        <View style={styles.socialGroup}>
          <TouchableOpacity style={styles.btnSocial} activeOpacity={0.8}>
            <Text style={styles.socialIcon}>G</Text>
            <Text style={styles.socialText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSocial} activeOpacity={0.8}>
            <Text style={styles.socialIcon}>🍎</Text>
            <Text style={styles.socialText}>Apple</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.signupLink}>
          Don't have an account?{' '}
          <Text
            style={styles.signupLinkBold}
            onPress={() => router.push('/(user)/signup/phone-verify')}
          >
            Sign Up
          </Text>
        </Text>
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

  // ---- TOP SECTION ----
  topSection: {
    paddingTop: 48,
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 4,
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
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: '#1e5ab8',
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  headerHeali: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  healiImg: {
    width: 34,
    height: 34,
  },
  headerSubtitle: {
    color: '#4f6885',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 10,
  },

  // ---- FORM SECTION ----
  formSection: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 40,
  },
  inputGroup: {
    position: 'relative',
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 12,
  },
  customInput: {
    width: '100%',
    height: 56,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: '500',
    color: '#1a293b',
  },
  customInputWithIcon: {
    paddingRight: 48,
  },
  passwordToggle: {
    position: 'absolute',
    right: 16,
    top: 44,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: -12,
    marginBottom: 32,
  },
  forgotPasswordText: {
    fontSize: 13,
    fontWeight: '600',
    color: PRIMARY,
  },

  // ---- BUTTON ----
  btnPrimary: {
    backgroundColor: PRIMARY,
    width: '100%',
    height: 56,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 0,
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 6,
  },
  btnPrimaryText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
  },

  // ---- DIVIDER ----
  dividerText: {
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 20,
    color: '#94a3b8',
    fontSize: 13,
    fontWeight: '500',
  },

  // ---- SOCIAL ----
  socialGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 20,
  },
  btnSocial: {
    flex: 1,
    maxWidth: 140,
    height: 50,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.03,
    shadowRadius: 15,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 16,
  },
  socialIcon: {
    fontSize: 18,
    fontWeight: '700',
  },
  socialText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a293b',
  },

  // ---- SIGNUP LINK ----
  signupLink: {
    textAlign: 'center',
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
    marginTop: 32,
  },
  signupLinkBold: {
    color: PRIMARY,
    fontWeight: '700',
  },
});
