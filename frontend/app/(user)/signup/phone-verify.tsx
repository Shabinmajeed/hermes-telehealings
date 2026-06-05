// frontend/app/(user)/signup/phone-verify.tsx
import { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  TextInput, Animated, Platform,
} from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Polyline, Line } from 'react-native-svg';

type Step = 'generate' | 'verify';

export default function PhoneVerifyScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState<Step>('generate');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [selectedCountry, setSelectedCountry] = useState('+1');
  const [selectedCountryFlag, setSelectedCountryFlag] = useState('🇺🇸 +1');

  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePhoneChange = (text: string) => {
    const digits = text.replace(/\D/g, '');
    const formatted = formatPhone(digits);
    setPhone(formatted);
  };

  const formatPhone = (digits: string) => {
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 10)}`;
  };

  const handleAction = () => {
    if (step === 'generate') {
      setStep('verify');
    } else {
      // OTP verified — go to profile completion
      router.push('/(user)/signup/profile-completion');
    }
  };

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      // Auto-advance to next box
      const nextInput = `otp-${index + 1}`;
      // Focus next via ref would go here; simple state-driven approach
    }
  };

  const handleOtpKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      // Move back
    }
  };

  const isPhoneValid = phone.replace(/\s/g, '').length >= 10;

  return (
    <View style={styles.container}>
      {/* ===== TOP CURVED SECTION ===== */}
      <LinearGradient
        colors={['#cbe0f9', '#e2effa']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.topSection}
      >
        {/* Header Row: Back | Title | Heali */}
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

          <Text style={styles.headerTitle}>Verify Phone</Text>

          <View style={styles.headerHeali}>
            <Image
              source={require('../../../assets/images/Heali.png')}
              style={styles.healiImg}
              resizeMode="contain"
            />
          </View>
        </View>

        <Text style={styles.headerSubtitle}>
          We will send you a one-time password to verify your account.
        </Text>
      </LinearGradient>

      {/* ===== FORM SECTION ===== */}
      <Animated.View
        style={[
          styles.formSection,
          {
            opacity: slideAnim,
            transform: [{
              translateY: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [15, 0],
              }),
            }],
          },
        ]}
      >
        <Text style={styles.inputLabel}>Phone Number</Text>

        <View style={styles.phoneInputGroup}>
          {/* Country Selector */}
          <TouchableOpacity style={styles.countrySelect} activeOpacity={0.8}>
            <Text style={styles.countryCode}>{selectedCountryFlag}</Text>
            <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <Polyline points="6 9 12 15 18 9" />
            </Svg>
          </TouchableOpacity>

          <TextInput
            style={styles.phoneInput}
            placeholder="000 000 0000"
            placeholderTextColor="#637b96"
            value={phone}
            onChangeText={handlePhoneChange}
            keyboardType="phone-pad"
            maxLength={12}
          />
        </View>

        {/* OTP Section */}
        {step === 'verify' && (
          <View style={styles.otpSection}>
            <Text style={styles.inputLabel}>Enter 6-Digit OTP</Text>
            <View style={styles.otpInputs}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  style={styles.otpBox}
                  value={digit}
                  onChangeText={(val) => handleOtpChange(val, index)}
                  onKeyPress={({ nativeEvent }) => handleOtpKeyPress(nativeEvent.key, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  textAlign="center"
                />
              ))}
            </View>
          </View>
        )}

        <TouchableOpacity
          style={styles.btnPrimary}
          onPress={handleAction}
          activeOpacity={0.8}
        >
          <Text style={styles.btnPrimaryText}>
            {step === 'generate' ? 'Generate OTP' : 'Verify'}
          </Text>
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            {step === 'generate' ? (
              <>
                <Line x1={5} y1={12} x2={19} y2={12} />
                <Polyline points="12 5 19 12 12 19" />
              </>
            ) : (
              <Polyline points="20 6 9 17 4 12" />
            )}
          </Svg>
        </TouchableOpacity>

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

        <Text style={styles.supportText}>
          Having trouble?{' '}
          <Text style={styles.supportLink}>Contact Support</Text>
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
    position: 'relative',
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
    paddingHorizontal: 20,
  },

  // ---- FORM SECTION ----
  formSection: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 12,
  },
  phoneInputGroup: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  countrySelect: {
    width: 96,
    height: 48,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.12)',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#f8fafc',
    flexShrink: 0,
  },
  countryCode: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a293b',
  },
  phoneInput: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.12)',
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 18,
    fontWeight: '500',
    color: '#1a293b',
    backgroundColor: '#f8fafc',
  },

  // ---- OTP ----
  otpSection: {
    marginBottom: 24,
  },
  otpInputs: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  otpBox: {
    width: 48,
    height: 52,
    backgroundColor: 'rgba(59,130,246,0.05)',
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '600',
    color: '#1a293b',
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
    marginBottom: 24,
    shadowColor: '#387bd5',
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

  // ---- SOCIAL ----
  socialGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 'auto',
    marginBottom: 40,
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
    width: 18,
    height: 18,
    textAlign: 'center',
  },
  socialText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a293b',
  },

  // ---- SUPPORT ----
  supportText: {
    textAlign: 'center',
    fontSize: 13,
    color: '#64748b',
    fontWeight: '500',
    paddingBottom: 24,
  },
  supportLink: {
    color: '#000000',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
