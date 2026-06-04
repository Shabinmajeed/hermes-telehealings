// frontend/app/(user)/marketing.tsx
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { Button } from '../../components/ui/Button';

export default function MarketingScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Scrollable content */}
      <View style={styles.content}>

        {/* Logo */}
        <Image
          source={require('../../assets/images/Logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Main title */}
        <Text style={styles.title}>Telehealings</Text>

        {/* Tagline */}
        <Text style={styles.tagline}>Continuity-first wellness care platform</Text>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Core Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Core Features</Text>
          <View style={styles.featureList}>
            <Text style={styles.featureItem}>✦ AI-powered conversational partner</Text>
            <Text style={styles.featureItem}>✦ Therapist handover continuity</Text>
            <Text style={styles.featureItem}>✦ Self-help library</Text>
          </View>
        </View>

        {/* Metric Badges */}
        <View style={styles.metricsRow}>
          <View style={styles.metricBadge}>
            <Text style={styles.metricValue}>200+</Text>
            <Text style={styles.metricLabel}>Verified therapists</Text>
          </View>
          <View style={styles.metricBadge}>
            <Text style={styles.metricValue}>8+</Text>
            <Text style={styles.metricLabel}>Languages</Text>
          </View>
          <View style={styles.metricBadge}>
            <Text style={styles.metricValue}>1,000+</Text>
            <Text style={styles.metricLabel}>Hours of therapy</Text>
          </View>
        </View>

        {/* Mascot */}
        <Image
          source={require('../../assets/images/Heali.png')}
          style={styles.mascot}
          resizeMode="contain"
        />

        {/* Bottom text */}
        <Text style={styles.bottomText}>
          Your wellness journey is one click away.
        </Text>
      </View>

      {/* CTA Button */}
      <View style={styles.buttonContainer}>
        <Button
          title="Get Started"
          onPress={() => router.push('/(user)/onboarding')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xxxl,
    paddingBottom: Spacing.lg,
  },
  logo: {
    width: 72,
    height: 72,
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: Typography.sizes.xxxl,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
    letterSpacing: 1,
    marginBottom: Spacing.sm,
  },
  tagline: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.medium,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  divider: {
    width: 48,
    height: 2,
    backgroundColor: Colors.primaryLighter,
    borderRadius: 1,
    marginBottom: Spacing.xl,
  },
  section: {
    width: '100%',
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  featureList: {
    gap: Spacing.sm,
  },
  featureItem: {
    fontSize: Typography.sizes.base,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: Typography.lineHeights.relaxed,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.md,
  },
  metricBadge: {
    alignItems: 'center',
    flex: 1,
  },
  metricValue: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.primary,
    marginBottom: 2,
  },
  metricLabel: {
    fontSize: Typography.sizes.xs,
    color: Colors.textTertiary,
    textAlign: 'center',
  },
  mascot: {
    width: 120,
    height: 120,
    marginBottom: Spacing.lg,
  },
  bottomText: {
    fontSize: Typography.sizes.base,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: Spacing.md,
  },
  buttonContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
});
