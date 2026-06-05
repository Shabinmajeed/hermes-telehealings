// frontend/app/(user)/signup/contact-details.tsx
import { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  TextInput, Animated, ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, Line, Polyline } from 'react-native-svg';

const RELATIONSHIPS = [
  { value: 'parent', label: 'Parent' },
  { value: 'spouse', label: 'Spouse' },
  { value: 'sibling', label: 'Sibling' },
  { value: 'friend', label: 'Friend' },
];

export default function ContactDetailsScreen() {
  const router = useRouter();
  const [address, setAddress] = useState('');
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [relationship, setRelationship] = useState('');

  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSaveComplete = () => {
    router.push('/(user)/signup/profile-success');
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

          <Text style={styles.headerTitle}>Contact Information</Text>

          <View style={styles.headerHeali}>
            <Image
              source={require('../../../assets/images/Heali.png')}
              style={styles.healiImg}
              resizeMode="contain"
            />
          </View>
        </View>

        <Text style={styles.headerSubtitle}>Please provide your contact info.</Text>

        {/* Stepper */}
        <View style={styles.stepper}>
          <View style={styles.step} />
          <View style={[styles.step, styles.stepActive]} />
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
          {/* Phone Number (verified, read-only) */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Phone Number *</Text>
            <View style={styles.inputWithIcon}>
              <TextInput
                style={[styles.customInput, styles.inputReadonly]}
                value="+91 1234566799"
                editable={false}
              />
              <View style={styles.verifyBadge}>
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="#1d4ed8" stroke="none">
                  <Path d="M12 2l3.09 2.26L19 5l-.54 3.76L21 12l-2.54 3.24L19 19l-3.91.74L12 22l-3.09-2.26L5 19l.54-3.76L3 12l2.54-3.24L5 5l3.91-.74L12 2zm-1.18 13.06L17 8.84l-1.42-1.42-4.76 4.76-2.12-2.12L7.28 11.48l3.54 3.58z" />
                </Svg>
              </View>
            </View>
          </View>

          {/* Email (verified, read-only) */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email Address *</Text>
            <View style={styles.inputWithIcon}>
              <TextInput
                style={[styles.customInput, styles.inputReadonly]}
                value="alex.rivera@example.com"
                editable={false}
              />
              <View style={styles.verifyBadge}>
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="#1d4ed8" stroke="none">
                  <Path d="M12 2l3.09 2.26L19 5l-.54 3.76L21 12l-2.54 3.24L19 19l-3.91.74L12 22l-3.09-2.26L5 19l.54-3.76L3 12l2.54-3.24L5 5l3.91-.74L12 2zm-1.18 13.06L17 8.84l-1.42-1.42-4.76 4.76-2.12-2.12L7.28 11.48l3.54 3.58z" />
                </Svg>
              </View>
            </View>
          </View>

          {/* Physical Address */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Physical Address *</Text>
            <TextInput
              style={styles.customInput}
              placeholder="Enter physical address"
              placeholderTextColor="#94a3b8"
              value={address}
              onChangeText={setAddress}
            />
          </View>

          {/* Info Banner */}
          <View style={styles.infoBanner}>
            <View style={styles.infoIcon}>
              <Text style={styles.infoIconText}>i</Text>
            </View>
            <Text style={styles.infoText}>
              Your emergency contact will only be notified during critical security or medical emergencies. All data is securely encrypted and protected.
            </Text>
          </View>

          {/* Emergency Contact Section */}
          <View style={styles.sectionHeader}>
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <Circle cx={12} cy={10} r={3} />
              <Path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
            </Svg>
            <Text style={styles.sectionHeaderText}>Emergency Contact</Text>
          </View>

          {/* Emergency Contact Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Full Name *</Text>
            <TextInput
              style={styles.customInput}
              placeholder="Enter emergency contact name"
              placeholderTextColor="#94a3b8"
              value={emergencyName}
              onChangeText={setEmergencyName}
              autoCapitalize="words"
            />
          </View>

          {/* Emergency Contact Phone */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Phone Number *</Text>
            <TextInput
              style={styles.customInput}
              placeholder="Enter phone number"
              placeholderTextColor="#94a3b8"
              value={emergencyPhone}
              onChangeText={setEmergencyPhone}
              keyboardType="phone-pad"
            />
          </View>

          {/* Relationship */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Relationship *</Text>
            <View style={styles.selectWrapper}>
              <TouchableOpacity
                style={[styles.customInput, styles.selectInput]}
                activeOpacity={0.8}
              >
                <Text style={[styles.selectText, !relationship && styles.selectPlaceholder]}>
                  {relationship ? RELATIONSHIPS.find(r => r.value === relationship)?.label : 'Select'}
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

          {/* Save & Complete Button */}
          <TouchableOpacity
            style={styles.btnPrimary}
            onPress={handleSaveComplete}
            activeOpacity={0.8}
          >
            <Text style={styles.btnPrimaryText}>Save & Complete</Text>
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
    position: 'relative',
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
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },

  // ---- INPUTS ----
  inputGroup: {
    position: 'relative',
    marginTop: 12,
    marginBottom: 18,
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
  inputReadonly: {
    color: '#1a293b',
  },
  inputWithIcon: {
    position: 'relative',
  },
  verifyBadge: {
    position: 'absolute',
    right: 16,
    top: 18,
  },

  // ---- INFO BANNER ----
  infoBanner: {
    backgroundColor: '#f0fdfa',
    borderWidth: 1,
    borderColor: '#ccfbf1',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 24,
    marginTop: 8,
  },
  infoIcon: {
    width: 22,
    height: 22,
    backgroundColor: '#115e59',
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 2,
  },
  infoIconText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 13,
    fontFamily: 'serif',
  },
  infoText: {
    fontSize: 13,
    color: '#0f172a',
    lineHeight: 20,
    flex: 1,
    flexShrink: 1,
  },

  // ---- SECTION HEADER ----
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
    marginTop: 16,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3b82f6',
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
    marginTop: 16,
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
});
