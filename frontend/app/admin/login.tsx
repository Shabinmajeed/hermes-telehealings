// frontend/app/(admin)/login.tsx
import { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { adminLogin } from '../../services/supabase';

export default function AdminLoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      await adminLogin(username.trim(), password);
      router.replace('/admin/dashboard');
    } catch (err) {
      setError('Invalid username or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../../assets/images/Logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Admin Portal</Text>
        <Text style={styles.subtitle}>Sign in to access the dashboard</Text>

        <View style={styles.form}>
          <Input
            label="Username"
            placeholder="Enter admin username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
          <Input
            label="Password"
            placeholder="Enter password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>

        <Button
          title="Sign In"
          onPress={handleLogin}
          loading={isLoading}
          disabled={isLoading}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    width: 64,
    height: 64,
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: Typography.sizes.xxl,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: Typography.sizes.base,
    color: Colors.textSecondary,
    marginBottom: Spacing.xxl,
  },
  form: {
    width: '100%',
    marginBottom: Spacing.lg,
  },
  error: {
    fontSize: Typography.sizes.sm,
    color: Colors.error,
    marginTop: Spacing.xs,
    textAlign: 'center',
  },
});
