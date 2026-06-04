// frontend/app/(user)/personalisation.tsx
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../stores/authStore';
import { supabase } from '../../services/supabase';

const CARDS = [
  { id: 'stress', title: 'Stress', description: 'Managing daily pressure' },
  { id: 'anxiety', title: 'Anxiety', description: 'Calming your mind' },
  { id: 'sleep', title: 'Sleep', description: 'Better rest' },
  { id: 'relationships', title: 'Relationships', description: 'Building connections' },
  { id: 'self-esteem', title: 'Self-esteem', description: 'Building confidence' },
  { id: 'focus', title: 'Focus', description: 'Improving concentration' },
];

export default function PersonalisationScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleCard = (id: string) => {
    setSelectedCards((prev) => {
      if (prev.includes(id)) {
        return prev.filter((c) => c !== id);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, id];
    });
  };

  const isValid = selectedCards.length >= 1;

  const handleContinue = async () => {
    if (!isValid || isSubmitting || !user) return;
    setIsSubmitting(true);
    try {
      await supabase
        .from('users')
        .update({ topics: selectedCards })
        .eq('id', user.id);
      router.push('/(user)/home');
    } catch (error) {
      console.error('Failed to update topics:', error);
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
      >
        {/* Header */}
        <Text style={styles.title}>What brings you here?</Text>

        {/* Mascot */}
        <Image
          source={require('../../assets/images/Heali.png')}
          style={styles.mascot}
          resizeMode="contain"
        />

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Choose what you'd like to focus on first. We'll personalize your journey based on your needs.
        </Text>

        {/* Cards Grid - 2 columns */}
        <View style={styles.cardsGrid}>
          {CARDS.map((card) => {
            const isSelected = selectedCards.includes(card.id);
            const isDisabled = !isSelected && selectedCards.length >= 3;

            return (
              <TouchableOpacity
                key={card.id}
                style={[
                  styles.card,
                  isSelected && styles.cardSelected,
                  isDisabled && styles.cardDisabled,
                ]}
                onPress={() => toggleCard(card.id)}
                activeOpacity={0.7}
                disabled={isDisabled}
              >
                <Text
                  style={[
                    styles.cardTitle,
                    isSelected && styles.cardTitleSelected,
                    isDisabled && styles.cardTitleDisabled,
                  ]}
                >
                  {card.title}
                </Text>
                <Text
                  style={[
                    styles.cardDescription,
                    isSelected && styles.cardDescriptionSelected,
                    isDisabled && styles.cardDescriptionDisabled,
                  ]}
                >
                  {card.description}
                </Text>
                {isSelected && (
                  <View style={styles.checkmark}>
                    <Text style={styles.checkmarkText}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Helper text */}
        <Text style={styles.helperText}>
          {isValid
            ? `${selectedCards.length}/3 selected`
            : 'Select at least 1 option to continue'}
        </Text>

        <View style={styles.spacer} />
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.buttonContainer}>
        <Button
          title="Continue"
          onPress={handleContinue}
          disabled={!isValid || isSubmitting}
          loading={isSubmitting}
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
  },
  title: {
    fontSize: Typography.sizes.xxl,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.lg,
    textAlign: 'center',
  },
  mascot: {
    width: 80,
    height: 80,
    marginBottom: Spacing.md,
  },
  subtitle: {
    fontSize: Typography.sizes.base,
    color: Colors.textSecondary,
    lineHeight: Typography.lineHeights.relaxed,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.sm,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    width: '100%',
    marginBottom: Spacing.lg,
  },
  card: {
    width: '47%',
    backgroundColor: Colors.cardBackground,
    borderWidth: 2,
    borderColor: Colors.cardBorder,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    minHeight: 110,
    position: 'relative',
    ...Shadows.sm,
  },
  cardSelected: {
    backgroundColor: Colors.cardSelected,
    borderColor: Colors.cardSelectedBorder,
    ...Shadows.md,
  },
  cardDisabled: {
    opacity: 0.5,
  },
  cardTitle: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.textPrimary,
    marginBottom: 4,
    textAlign: 'center',
  },
  cardTitleSelected: {
    color: Colors.primary,
  },
  cardTitleDisabled: {
    color: Colors.textTertiary,
  },
  cardDescription: {
    fontSize: Typography.sizes.xs,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: Typography.lineHeights.normal,
  },
  cardDescriptionSelected: {
    color: Colors.primaryLight,
  },
  cardDescriptionDisabled: {
    color: Colors.textTertiary,
  },
  checkmark: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: Typography.weights.bold,
  },
  helperText: {
    fontSize: Typography.sizes.sm,
    color: Colors.textTertiary,
    textAlign: 'center',
  },
  spacer: {
    flex: 1,
    minHeight: Spacing.xl,
  },
  buttonContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
    paddingTop: Spacing.sm,
  },
});
