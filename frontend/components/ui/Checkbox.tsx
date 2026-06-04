// frontend/components/ui/Checkbox.tsx
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';

interface CheckboxProps {
  checked: boolean;
  onPress: () => void;
  label?: string;
  labelComponent?: React.ReactNode;
}

export function Checkbox({ checked, onPress, label, labelComponent }: CheckboxProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.6}>
      <View style={[styles.box, checked && styles.boxChecked]}>
        {checked && <View style={styles.checkmark} />}
      </View>
      {labelComponent || (label && <Text style={styles.label}>{label}</Text>)}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    width: 22,
    height: 22,
    borderRadius: BorderRadius.sm,
    borderWidth: 2,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  boxChecked: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  checkmark: {
    width: 10,
    height: 10,
    borderRadius: 2,
    backgroundColor: Colors.white,
  },
  label: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    flex: 1,
  },
});
