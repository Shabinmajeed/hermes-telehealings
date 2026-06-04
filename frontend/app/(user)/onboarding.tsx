// frontend/app/(user)/onboarding.tsx
import { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image,
  Animated, TextInput, ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing } from '../../constants/theme';
import { useAuthStore } from '../../stores/authStore';
import { createUser } from '../../services/supabase';

const ACCENT = '#1e5ab8';

export default function OnboardingScreen() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [name, setName] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Animations
  const titleAnim = useRef(new Animated.Value(0)).current;
  const subtitleAnim = useRef(new Animated.Value(0)).current;
  const healiAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const questionAnim = useRef(new Animated.Value(0)).current;
  const bottomAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.stagger(100, [
      Animated.timing(titleAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(subtitleAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(healiAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(questionAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(bottomAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
    ]).start();

    // Floating animation for Heali (starts after entrance)
    setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(floatAnim, { toValue: -8, duration: 2000, useNativeDriver: true }),
          Animated.timing(floatAnim, { toValue: 0, duration: 2000, useNativeDriver: true }),
        ])
      ).start();
    }, 900);
  }, []);

  const slideUpStyle = (anim: Animated.Value) => ({
    opacity: anim,
    transform: [{
      translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [15, 0] }),
    }],
  });

  const isFormValid = name.trim().length > 0 && termsAccepted;

  const handleContinue = async () => {
    if (!isFormValid || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const user = await createUser({
        name: name.trim(),
        terms_accepted_at: new Date().toISOString(),
        topics: [],
      });
      setUser({
        id: user.id,
        supabaseId: user.id,
        email: '',
        role: 'USER' as any,
      });
      router.push('/(user)/personalisation');
    } catch (error) {
      console.error('Failed to create user:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* ===== TOP SECTION: gradient with Heali ===== */}
      <LinearGradient
        colors={['#ffffff', '#e2effb', '#8db8f1']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.topSection}
      >
        <Animated.Text style={[styles.title, slideUpStyle(titleAnim)]}>
          Hi, I'm Heali
        </Animated.Text>
        <Animated.Text style={[styles.subtitle, slideUpStyle(subtitleAnim)]}>
          AI-Powered Healing Partner
        </Animated.Text>
        <Animated.Image
          source={require('../../assets/images/Heali.png')}
          style={[styles.healiImg, slideUpStyle(healiAnim), { transform: [{ translateY: floatAnim }] }]}
          resizeMode="contain"
        />
      </LinearGradient>

      {/* ===== BOTTOM SECTION: white with form ===== */}
      <Animated.View style={[styles.bottomSection, slideUpStyle(bottomAnim)]}>
        <Animated.Text style={[styles.questionText, slideUpStyle(questionAnim)]}>
          What should we call you?
        </Animated.Text>

        <TextInput
          style={styles.inputField}
          placeholder="Your name"
          placeholderTextColor="#94a3b8"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          autoFocus
        />

        {/* Consent row */}
        <View style={styles.consentRow}>
          <TouchableOpacity
            style={[styles.consentCheckbox, termsAccepted && styles.consentCheckboxChecked]}
            onPress={() => {
              if (!termsAccepted) {
                setShowTerms(true);
              } else {
                setTermsAccepted(false);
              }
            }}
            activeOpacity={0.7}
          >
            {termsAccepted && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>
          <Text style={styles.consentText}>
            I agree to the{' '}
            <Text style={styles.consentLink} onPress={() => setShowTerms(true)}>Terms</Text>
            {' and '}
            <Text style={styles.consentLink} onPress={() => setShowTerms(true)}>Privacy Policy</Text>
          </Text>
        </View>

        {/* Continue button */}
        <TouchableOpacity
          style={[styles.btnPrimary, !isFormValid && styles.btnPrimaryDisabled]}
          onPress={handleContinue}
          disabled={!isFormValid || isSubmitting}
          activeOpacity={0.8}
        >
          <Text style={styles.btnPrimaryText}>Continue</Text>
          <Text style={styles.btnArrow}>→</Text>
        </TouchableOpacity>

        {/* Footer link */}
        <TouchableOpacity
          style={styles.footerLink}
          onPress={() => router.push('/(auth)/login')}
        >
          <Text style={styles.footerLinkText}>
            Existing User? <Text style={styles.footerLinkBold}>Login</Text>
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* ===== TERMS MODAL ===== */}
      {showTerms && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Terms and Conditions</Text>
              <TouchableOpacity onPress={() => setShowTerms(false)} style={styles.modalClose}>
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
              <Text style={styles.termsText}>
                {`Terms and Conditions\n\nLast updated: June 2026\n\n1. Acceptance of Terms\nBy accessing and using Telehealings ("the Platform"), you agree to be bound by these Terms and Conditions. If you do not agree, please do not use the Platform.\n\n2. Description of Service\nTelehealings is a telehealth platform that connects users with licensed therapists for mental health services including therapy sessions, appointments, and wellness support.\n\n3. User Accounts\n• You must provide accurate and complete information during registration.\n• You are responsible for maintaining the security of your account.\n• You must be at least 18 years old to use the Platform.\n\n4. Therapist Services\n• All therapists on the Platform are verified professionals.\n• Therapy sessions are conducted via secure video calls.\n• Telehealings does not provide emergency services. If you are in crisis, please contact emergency services immediately.\n\n5. Payments and Refunds\n• All fees are displayed before booking a session.\n• Refunds are available up to 24 hours before a scheduled session.\n• Subscription plans auto-renew unless canceled.\n\n6. Privacy\nYour personal health information is protected in accordance with applicable privacy laws. See our Privacy Policy for details.\n\n7. Limitation of Liability\nTelehealings is not liable for any damages arising from the use of the Platform or services provided by therapists.\n\n8. Changes to Terms\nWe may update these terms from time to time. Continued use of the Platform constitutes acceptance of the updated terms.\n\n9. Contact\nFor questions about these terms, contact us at support@telehealings.com.`}
              </Text>
            </ScrollView>
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.modalBtnDecline]}
                onPress={() => { setTermsAccepted(false); setShowTerms(false); }}
              >
                <Text style={styles.modalBtnDeclineText}>Decline</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, styles.modalBtnAccept]}
                onPress={() => { setTermsAccepted(true); setShowTerms(false); }}
              >
                <Text style={styles.modalBtnAcceptText}>Accept</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
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
    paddingTop: 50,
    paddingBottom: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: ACCENT,
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: ACCENT,
    marginBottom: 20,
    letterSpacing: -0.1,
  },
  healiImg: {
    height: 200,
    width: 200,
  },

  // ---- BOTTOM SECTION ----
  bottomSection: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#334155',
    textAlign: 'center',
    marginBottom: 16,
  },
  inputField: {
    width: '100%',
    height: 56,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: 'rgba(56, 123, 213, 0.15)',
    borderRadius: 30,
    fontSize: 16,
    fontWeight: '500',
    color: '#1a293b',
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 15,
    elevation: 2,
  },

  // ---- CONSENT ----
  consentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 32,
    paddingHorizontal: 10,
  },
  consentCheckbox: {
    width: 18,
    height: 18,
    borderWidth: 1.5,
    borderColor: '#cbd5e1',
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  consentCheckboxChecked: {
    backgroundColor: '#387bd5',
    borderColor: '#387bd5',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 14,
  },
  consentText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748b',
    lineHeight: 17,
  },
  consentLink: {
    color: '#387bd5',
    fontWeight: '600',
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

  // ---- FOOTER ----
  footerLink: {
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 30,
  },
  footerLinkText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  footerLinkBold: {
    color: '#387bd5',
    fontWeight: '700',
  },

  // ---- MODAL ----
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  modalContainer: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  modalClose: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCloseText: {
    fontSize: 18,
    color: '#6B7280',
  },
  modalScroll: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  termsText: {
    fontSize: 14,
    color: '#111827',
    lineHeight: 22,
  },
  modalFooter: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 12,
  },
  modalBtn: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBtnDecline: {
    backgroundColor: '#F5F8FC',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  modalBtnDeclineText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  modalBtnAccept: {
    backgroundColor: '#387bd5',
  },
  modalBtnAcceptText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
