// frontend/app/(user)/onboarding.tsx
import { useState } from 'react';
import { View, Text, StyleSheet, Modal, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { Input } from '../../components/ui/Input';
import { Checkbox } from '../../components/ui/Checkbox';
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../stores/authStore';
import { createUser } from '../../services/supabase';

const TERMS_TEXT = `Terms and Conditions

Last updated: June 2026

1. Acceptance of Terms
By accessing and using Telehealings ("the Platform"), you agree to be bound by these Terms and Conditions. If you do not agree, please do not use the Platform.

2. Description of Service
Telehealings is a telehealth platform that connects users with licensed therapists for mental health services including therapy sessions, appointments, and wellness support.

3. User Accounts
• You must provide accurate and complete information during registration.
• You are responsible for maintaining the security of your account.
• You must be at least 18 years old to use the Platform.

4. Therapist Services
• All therapists on the Platform are verified professionals.
• Therapy sessions are conducted via secure video calls.
• Telehealings does not provide emergency services. If you are in crisis, please contact emergency services immediately.

5. Payments and Refunds
• All fees are displayed before booking a session.
• Refunds are available up to 24 hours before a scheduled session.
• Subscription plans auto-renew unless canceled.

6. Privacy
Your personal health information is protected in accordance with applicable privacy laws. See our Privacy Policy for details.

7. Limitation of Liability
Telehealings is not liable for any damages arising from the use of the Platform or services provided by therapists.

8. Changes to Terms
We may update these terms from time to time. Continued use of the Platform constitutes acceptance of the updated terms.

9. Contact
For questions about these terms, contact us at support@telehealings.com.`;

export default function OnboardingScreen() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [name, setName] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = name.trim().length > 0 && termsAccepted;

  const handleNext = async () => {
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
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Mascot */}
        <Image
          source={require('../../assets/images/Heali.png')}
          style={styles.mascot}
          resizeMode="contain"
        />

        {/* Headline */}
        <Text style={styles.title}>Hi, I'm Heali</Text>
        <Text style={styles.subtitle}>AI-Powered Healing Partner</Text>

        {/* Name Input */}
        <View style={styles.inputSection}>
          <Input
            label="What should we call you?"
            placeholder="Your name"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            autoFocus
          />
        </View>

        {/* Terms and Conditions */}
        <View style={styles.termsSection}>
          <Checkbox
            checked={termsAccepted}
            onPress={() => {
              if (!termsAccepted) {
                setShowTerms(true);
              } else {
                setTermsAccepted(false);
              }
            }}
            labelComponent={
              <Text style={styles.termsLabel}>
                I agree to the{' '}
                <Text
                  style={styles.termsLink}
                  onPress={() => setShowTerms(true)}
                >
                  Terms
                </Text>
                {' and '}
                <Text
                  style={styles.termsLink}
                  onPress={() => setShowTerms(true)}
                >
                  Privacy Policy
                </Text>
              </Text>
            }
          />
        </View>

        {/* Spacer to push content up */}
        <View style={styles.spacer} />
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomArea}>
        <Button
          title="Continue"
          onPress={handleNext}
          disabled={!isFormValid || isSubmitting}
          loading={isSubmitting}
        />
        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => router.push('/(auth)/login')}
        >
          <Text style={styles.loginLinkText}>Existing User? Login</Text>
        </TouchableOpacity>
      </View>

      {/* T&C Modal */}
      <Modal
        visible={showTerms}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowTerms(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Terms and Conditions</Text>
            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setShowTerms(false)}
            >
              <Text style={styles.modalCloseText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
            <Text style={styles.termsText}>{TERMS_TEXT}</Text>
          </ScrollView>

          <View style={styles.modalFooter}>
            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonDecline]}
                onPress={() => {
                  setTermsAccepted(false);
                  setShowTerms(false);
                }}
              >
                <Text style={styles.modalButtonDeclineText}>Decline</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonAccept]}
                onPress={() => {
                  setTermsAccepted(true);
                  setShowTerms(false);
                }}
              >
                <Text style={styles.modalButtonAcceptText}>Accept</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
  },
  mascot: {
    width: 100,
    height: 100,
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: Typography.sizes.xxl,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.medium,
    color: Colors.textSecondary,
    marginBottom: Spacing.xxl,
    textAlign: 'center',
  },
  inputSection: {
    width: '100%',
    marginBottom: Spacing.lg,
  },
  termsSection: {
    width: '100%',
    marginTop: Spacing.sm,
  },
  termsLabel: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    flex: 1,
  },
  termsLink: {
    color: Colors.primary,
    fontWeight: Typography.weights.medium,
    textDecorationLine: 'underline',
  },
  spacer: {
    flex: 1,
    minHeight: Spacing.xl,
  },
  bottomArea: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
    paddingTop: Spacing.sm,
  },
  loginLink: {
    alignItems: 'center',
    paddingTop: Spacing.md,
  },
  loginLinkText: {
    fontSize: Typography.sizes.sm,
    color: Colors.primary,
    fontWeight: Typography.weights.medium,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semibold,
    color: Colors.textPrimary,
  },
  modalClose: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseText: {
    fontSize: 18,
    color: Colors.textSecondary,
  },
  modalScroll: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  termsText: {
    fontSize: Typography.sizes.sm,
    color: Colors.textPrimary,
    lineHeight: Typography.lineHeights.relaxed,
    paddingVertical: Spacing.lg,
  },
  modalFooter: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  modalButtonRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  modalButton: {
    flex: 1,
    height: 48,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonDecline: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  modalButtonDeclineText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.textSecondary,
  },
  modalButtonAccept: {
    backgroundColor: Colors.primary,
  },
  modalButtonAcceptText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.white,
  },
});
