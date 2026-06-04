// frontend/constants/theme.ts
export const Colors = {
  // Primary blues (from design analysis)
  primary: '#3C80D6',
  primaryDark: '#3571C2',
  primaryLight: '#6BA3E8',
  primaryLighter: '#A3CCF5',
  primaryLightest: '#D4E8FC',

  // Background
  background: '#F5F8FC',
  white: '#FFFFFF',

  // Text
  textPrimary: '#1A1A2E',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  textPlaceholder: '#B0B8C5',

  // Borders & Dividers
  border: '#E5E7EB',
  borderLight: '#F0F2F5',

  // States
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',

  // Card
  cardBackground: '#FFFFFF',
  cardBorder: '#E8EDF5',
  cardSelected: '#EBF3FF',
  cardSelectedBorder: '#3C80D6',

  // Button
  buttonDisabled: '#C4C8D4',
  buttonTextDisabled: '#9CA3AF',

  // Input
  inputBackground: '#F8F9FC',
  inputBorder: '#D1D5DB',
  inputBorderFocused: '#3C80D6',
};

export const Typography = {
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    display: 40,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  lineHeights: {
    tight: 20,
    normal: 24,
    relaxed: 28,
    loose: 32,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 5,
  },
};
