// frontend/app/(user)/signup/profile-completion.tsx
import { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  TextInput, Animated, ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, Line, Polyline } from 'react-native-svg';

const GENDERS = ['Male', 'Female', 'Other'];
const OCCUPATIONS = [
  { value: 'student', label: 'Student' },
  { value: 'employed', label: 'Employed' },
  { value: 'unemployed', label: 'Unemployed' },
];
const MARITAL_STATUSES = [
  { value: 'single', label: 'Single' },
  { value: 'married', label: 'Married' },
  { value: 'divorced', label: 'Divorced' },
  { value: 'widowed', label: 'Widowed' },
];

export default function ProfileCompletionScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('Male');
  const [occupation, setOccupation] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');

  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSaveNext = () => {
    router.push('/(user)/signup/contact-details');
  };

  return (
    <View style={styles.container}>
      {/* ===== TOP SECTION ===== */}
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

          <Text style={styles.headerTitle}>Setup Profile</Text>

          <View style={styles.headerHeali}>
            <Image
              source={require('../../../assets/images/Heali.png')}
              style={styles.healiImg}
              resizeMode="contain"
            />
          </View>
        </View>

        <Text style={styles.headerSubtitle}>Tell us a bit more about yourself.</Text>

        {/* Stepper */}
        <View style={styles.stepper}>
          <View style={[styles.step, styles.stepActive]} />
          <View style={styles.step} />
        </View>
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
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Avatar Upload */}
          <View style={styles.avatarUpload}>
            <View style={styles.avatarCircle}>
              <Svg width={40} height={40} viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <Circle cx={12} cy={7} r={4} />
              </Svg>
            </View>
            <TouchableOpacity style={styles.cameraBtn} activeOpacity={0.8}>
              <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <Path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <Circle cx={12} cy={13} r={4} />
              </Svg>
            </TouchableOpacity>
          </View>

          {/* Full Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Full Name *</Text>
            <TextInput
              style={styles.customInput}
              placeholder="Enter your full name"
              placeholderTextColor="#94a3b8"
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
            />
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email Address *</Text>
            <TextInput
              style={styles.customInput}
              placeholder="Enter your email address"
              placeholderTextColor="#94a3b8"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Date of Birth */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Date Of Birth *</Text>
            <TextInput
              style={styles.customInput}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#94a3b8"
              value={dateOfBirth}
              onChangeText={setDateOfBirth}
            />
          </View>

          {/* Gender Segmented Control */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Gender *</Text>
            <View style={styles.segmentedControl}>
              {GENDERS.map((g) => (
                <TouchableOpacity
                  key={g}
                  style={[styles.segmentBtn, gender === g && styles.segmentBtnActive]}
                  onPress={() => setGender(g)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.segmentBtnText, gender === g && styles.segmentBtnTextActive]}>
                    {g}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Occupation */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Occupation *</Text>
            <View style={styles.selectWrapper}>
              <TouchableOpacity
                style={[styles.customInput, styles.selectInput]}
                activeOpacity={0.8}
              >
                <Text style={[styles.selectText, !occupation && styles.selectPlaceholder]}>
                  {occupation ? OCCUPATIONS.find(o => o.value === occupation)?.label : 'Select'}
                </Text>
              </TouchableOpacity>
              <Svg
                width={18} height={18} viewBox="0 0 24 24"
                fill="none" stroke="#94a3b8" strokeWidth={2.5}
                strokeLinecap="round" strokeLinejoin="round"
                style={styles.selectArrow}
              >
                <Polyline points="6 9 12 15 18 9" />
              </Svg>
            </View>
          </View>

          {/* Marital Status */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Marital Status *</Text>
            <View style={styles.selectWrapper}>
              <TouchableOpacity
                style={[styles.customInput, styles.selectInput]}
                activeOpacity={0.8}
              >
                <Text style={[styles.selectText, !maritalStatus && styles.selectPlaceholder]}>
                  {maritalStatus ? MARITAL_STATUSES.find(m => m.value === maritalStatus)?.label : 'Select'}
                </Text>
              </TouchableOpacity>
              <Svg
                width={18} height={18} viewBox="0 0 24 24"
                fill="none" stroke="#94a3b8" strokeWidth={2.5}
                strokeLinecap="round" strokeLinejoin="round"
                style={styles.selectArrow}
              >
                <Polyline points="6 9 12 15 18 9" />
              </Svg>
            </View>
          </View>

          {/* Save & Next Button */}
          <TouchableOpacity
            style={styles.btnPrimary}
            onPress={handleSaveNext}
            activeOpacity={0.8}
          >
            <Text style={styles.btnPrimaryText}>Save & Next</Text>
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <Line x1={5} y1={12} x2={19} y2={12} />
              <Polyline points="12 5 19 12 12 19" />
            </Svg>
          </TouchableOpacity>

          <View style={{ height: 24 }} />
        </ScrollView>
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
    marginBottom: 10,
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
    lineHeight: 1.4,
    marginTop: 10,
  },
  stepper: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 20,
  },
  step: {
    height: 5,
    width: 60,
    backgroundColor: '#cbd5e1',
    borderRadius: 3,
  },
  stepActive: {
    backgroundColor: '#3b82f6',
  },

  // ---- FORM SECTION ----
  formSection: {
    flex: 1,
    paddingHorizontal: 24,
  },
  scrollContent: {
    paddingTop: 10,
    paddingBottom: 40,
  },

  // ---- AVATAR ----
  avatarUpload: {
    alignSelf: 'center',
    position: 'relative',
    marginTop: 10,
    marginBottom: 32,
    zIndex: 3,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    backgroundColor: '#ffffff',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#ffffff',
  },
  cameraBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 34,
    height: 34,
    backgroundColor: '#3b82f6',
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#ffffff',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },

  // ---- INPUTS ----
  inputGroup: {
    position: 'relative',
    marginBottom: 24,
  },
  inputLabel: {
    position: 'absolute',
    top: -8,
    left: 12,
    backgroundColor: '#ffffff',
    paddingHorizontal: 4,
    fontSize: 12,
    fontWeight: '400',
    color: '#64748b',
    zIndex: 1,
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

  // ---- SEGMENTED CONTROL ----
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#f4f8fd',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    height: 56,
    padding: 4,
  },
  segmentBtn: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  segmentBtnActive: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  segmentBtnText: {
    fontSize: 15,
    fontWeight: '400',
    color: '#475569',
  },
  segmentBtnTextActive: {
    color: '#3b82f6',
    fontWeight: '500',
  },

  // ---- SELECT ----
  selectWrapper: {
    position: 'relative',
  },
  selectInput: {
    justifyContent: 'center',
  },
  selectText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a293b',
  },
  selectPlaceholder: {
    color: '#94a3b8',
    fontWeight: '400',
  },
  selectArrow: {
    position: 'absolute',
    right: 16,
    top: 19,
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
    marginTop: 32,
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
});
