// frontend/app/(user)/_layout.tsx
import { Stack } from 'expo-router';
import { View, useWindowDimensions } from 'react-native';
import { Colors } from '../../constants/theme';

const MAX_MOBILE_WIDTH = 430;

export default function UserLayout() {
  const { width: screenWidth } = useWindowDimensions();
  const isWebWide = screenWidth > MAX_MOBILE_WIDTH;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isWebWide ? Colors.background : Colors.white,
        alignItems: 'center',
      }}
    >
      <View
        style={{
          flex: 1,
          width: '100%',
          maxWidth: MAX_MOBILE_WIDTH,
          backgroundColor: Colors.white,
        }}
      >
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="splash" />
          <Stack.Screen name="marketing" />
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="personalisation" />
          <Stack.Screen name="home" />
        </Stack>
      </View>
    </View>
  );
}
