// frontend/app/(admin)/dashboard.tsx
import { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { getAllUsers } from '../../services/supabase';

interface UserRow {
  id: string;
  name: string;
  terms_accepted_at: string;
  topics: string[];
  created_at: string;
}

export default function AdminDashboardScreen() {
  const router = useRouter();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadUsers = useCallback(async () => {
    try {
      const data = await getAllUsers();
      setUsers(data || []);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const onRefresh = () => {
    setRefreshing(true);
    loadUsers();
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Admin Dashboard</Text>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => router.replace('/admin/login')}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{users.length}</Text>
          <Text style={styles.statLabel}>Total Users</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            {users.filter((u) => {
              const today = new Date();
              const created = new Date(u.created_at);
              return created.toDateString() === today.toDateString();
            }).length}
          </Text>
          <Text style={styles.statLabel}>Today</Text>
        </View>
      </View>

      {/* User List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {isLoading ? (
          <Text style={styles.emptyText}>Loading users...</Text>
        ) : users.length === 0 ? (
          <Text style={styles.emptyText}>No users yet</Text>
        ) : (
          users.map((user) => (
            <View key={user.id} style={styles.userCard}>
              <View style={styles.userHeader}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userDate}>{formatDate(user.created_at)}</Text>
              </View>
              <View style={styles.userDetails}>
                <Text style={styles.userDetailLabel}>T&C Accepted:</Text>
                <Text style={styles.userDetailValue}>
                  {formatDate(user.terms_accepted_at)}
                </Text>
              </View>
              {user.topics && user.topics.length > 0 && (
                <View style={styles.topicsRow}>
                  <Text style={styles.userDetailLabel}>Topics:</Text>
                  <View style={styles.topicsList}>
                    {user.topics.map((topic) => (
                      <View key={topic} style={styles.topicBadge}>
                        <Text style={styles.topicText}>{topic}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  headerTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
  },
  logoutButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.background,
  },
  logoutText: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    fontWeight: Typography.weights.medium,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    alignItems: 'center',
    ...Shadows.sm,
  },
  statValue: {
    fontSize: Typography.sizes.xxl,
    fontWeight: Typography.weights.bold,
    color: Colors.primary,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: Typography.sizes.sm,
    color: Colors.textTertiary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  emptyText: {
    fontSize: Typography.sizes.base,
    color: Colors.textTertiary,
    textAlign: 'center',
    marginTop: Spacing.xxxl,
  },
  userCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  userName: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semibold,
    color: Colors.textPrimary,
  },
  userDate: {
    fontSize: Typography.sizes.xs,
    color: Colors.textTertiary,
  },
  userDetails: {
    flexDirection: 'row',
    marginBottom: Spacing.xs,
  },
  userDetailLabel: {
    fontSize: Typography.sizes.sm,
    color: Colors.textTertiary,
    marginRight: Spacing.xs,
  },
  userDetailValue: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
  },
  topicsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.xs,
  },
  topicsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
    flex: 1,
    marginLeft: Spacing.xs,
  },
  topicBadge: {
    backgroundColor: Colors.primaryLightest,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
  },
  topicText: {
    fontSize: Typography.sizes.xs,
    color: Colors.primary,
    fontWeight: Typography.weights.medium,
  },
});
