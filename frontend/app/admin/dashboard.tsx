// frontend/app/admin/dashboard.tsx
import { useState, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, RefreshControl, Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Path, Circle, Line, Polyline, Polygon } from 'react-native-svg';
import { getAllUsers } from '../../services/supabase';

interface UserRow {
  id: string;
  name: string;
  terms_accepted_at: string;
  topics: string[];
  created_at: string;
}

const PAGE_SIZE = 10;

export default function AdminDashboardScreen() {
  const router = useRouter();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const loadUsers = useCallback(async () => {
    try {
      const data = await getAllUsers();
      setUsers(data || []);
      setFilteredUsers(data || []);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { loadUsers(); }, [loadUsers]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredUsers(users);
    } else {
      const q = searchQuery.toLowerCase();
      setFilteredUsers(users.filter(u =>
        u.name.toLowerCase().includes(q) ||
        (u.topics || []).some(t => t.toLowerCase().includes(q))
      ));
    }
    setCurrentPage(1);
  }, [searchQuery, users]);

  const onRefresh = () => { setRefreshing(true); loadUsers(); };

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const pageUsers = filteredUsers.slice(pageStart, pageStart + PAGE_SIZE);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
    });
  };

  const formatDateTime = (dateStr: string) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  return (
    <View style={styles.pageShell}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentWrapper}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* ===== HEADER ===== */}
        <View style={styles.pageHeader}>
          <View style={styles.headerTab}>
            <Text style={styles.headerTabText}>Clients</Text>
            <View style={styles.headerTabUnderline} />
          </View>
        </View>

        {/* ===== TOOLBAR ===== */}
        <View style={styles.toolbar}>
          <View style={styles.toolbarLeft}>
            <Text style={styles.userCount}>
              <Text style={styles.userCountBold}>All Users</Text> {filteredUsers.length}
            </Text>
            <View style={styles.searchWrap}>
              <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={2} style={styles.searchIcon}>
                <Circle cx={11} cy={11} r={8} />
                <Line x1={21} y1={21} x2={16.65} y2={16.65} />
              </Svg>
              <TextInput
                style={styles.searchInput}
                placeholder="Search"
                placeholderTextColor="#94a3b8"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            <TouchableOpacity
              style={styles.btnPillOutline}
              onPress={() => setShowFilters(!showFilters)}
              activeOpacity={0.7}
            >
              <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth={2}>
                <Polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </Svg>
              <Text style={styles.btnPillOutlineText}>Filters</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.toolbarRight}>
            <TouchableOpacity style={styles.btnPillOutline} activeOpacity={0.7}>
              <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth={2}>
                <Path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <Polyline points="17 8 12 3 7 8" />
                <Line x1={12} y1={3} x2={12} y2={15} />
              </Svg>
              <Text style={styles.btnPillOutlineText}>Export CSV</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnPillPrimary} activeOpacity={0.8}>
              <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2}>
                <Line x1={12} y1={5} x2={12} y2={19} />
                <Line x1={5} y1={12} x2={19} y2={12} />
              </Svg>
              <Text style={styles.btnPillPrimaryText}>Add User</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ===== TABLE CARD ===== */}
        <View style={styles.tableCard}>
          {/* Table Header */}
          <View style={styles.tableRow}>
            <Text style={[styles.tableHead, styles.colUser]}>User</Text>
            <Text style={[styles.tableHead, styles.colDate]}>Joined</Text>
            <Text style={[styles.tableHead, styles.colDate]}>T&C Accepted</Text>
            <Text style={[styles.tableHead, styles.colTopics]}>Topics</Text>
            <Text style={[styles.tableHead, styles.colActions]} />
          </View>

          {/* Table Body */}
          {isLoading ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>Loading users...</Text>
            </View>
          ) : pageUsers.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No users found</Text>
            </View>
          ) : (
            pageUsers.map((user) => (
              <View key={user.id} style={styles.tableRow}>
                {/* User cell */}
                <View style={[styles.tableCell, styles.colUser]}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{(user.name || '?')[0].toUpperCase()}</Text>
                  </View>
                  <View style={styles.userDetails}>
                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.userSubtext}>ID: {user.id.slice(0, 8)}</Text>
                  </View>
                </View>

                {/* Joined */}
                <View style={[styles.tableCell, styles.colDate]}>
                  <Text style={styles.tableCellText}>{formatDate(user.created_at)}</Text>
                </View>

                {/* T&C */}
                <View style={[styles.tableCell, styles.colDate]}>
                  <Text style={styles.tableCellText}>{formatDateTime(user.terms_accepted_at)}</Text>
                </View>

                {/* Topics */}
                <View style={[styles.tableCell, styles.colTopics]}>
                  <View style={styles.topicsWrap}>
                    {(user.topics || []).length > 0
                      ? user.topics.map(t => (
                          <View key={t} style={styles.topicBadge}>
                            <Text style={styles.topicBadgeText}>{t}</Text>
                          </View>
                        ))
                      : <Text style={styles.noTopics}>—</Text>
                    }
                  </View>
                </View>

                {/* Actions */}
                <View style={[styles.tableCell, styles.colActions]}>
                  <TouchableOpacity style={styles.actionBtn} activeOpacity={0.6}>
                    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={2}>
                      <Circle cx={12} cy={12} r={1} />
                      <Circle cx={12} cy={5} r={1} />
                      <Circle cx={12} cy={19} r={1} />
                    </Svg>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}

          {/* Pagination */}
          {filteredUsers.length > 0 && (
            <View style={styles.paginationContainer}>
              <Text style={styles.paginationInfo}>
                Showing {pageStart + 1}–{Math.min(pageStart + PAGE_SIZE, filteredUsers.length)} of {filteredUsers.length}
              </Text>
              <View style={styles.paginationNav}>
                <TouchableOpacity
                  style={styles.pageBtn}
                  onPress={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  activeOpacity={0.6}
                >
                  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={2}>
                    <Polyline points="15 18 9 12 15 6" />
                  </Svg>
                </TouchableOpacity>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <TouchableOpacity
                    key={p}
                    style={[styles.pageBtn, p === currentPage && styles.pageBtnActive]}
                    onPress={() => setCurrentPage(p)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.pageBtnText, p === currentPage && styles.pageBtnTextActive]}>{p}</Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  style={styles.pageBtn}
                  onPress={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  activeOpacity={0.6}
                >
                  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={2}>
                    <Polyline points="9 18 15 12 9 6" />
                  </Svg>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  pageShell: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollView: {
    flex: 1,
  },
  contentWrapper: {
    padding: 24,
    paddingBottom: 40,
    flexGrow: 1,
  },

  // ---- HEADER ----
  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderBottomWidth: 2,
    borderBottomColor: '#e2e8f0',
    marginBottom: 12,
  },
  headerTab: {
    paddingBottom: 12,
    position: 'relative',
  },
  headerTabText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
  },
  headerTabUnderline: {
    position: 'absolute',
    bottom: -2,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#0f172a',
    borderRadius: 2,
  },

  // ---- TOOLBAR ----
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    flexWrap: 'wrap',
    gap: 12,
  },
  toolbarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flexWrap: 'wrap',
  },
  toolbarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  userCount: {
    fontSize: 16,
    color: '#475569',
  },
  userCountBold: {
    color: '#0f172a',
    fontWeight: '700',
  },

  // ---- SEARCH ----
  searchWrap: {
    position: 'relative',
    width: 240,
  },
  searchIcon: {
    position: 'absolute',
    left: 14,
    top: 10,
    zIndex: 1,
  },
  searchInput: {
    width: '100%',
    height: 40,
    paddingLeft: 38,
    paddingRight: 16,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    backgroundColor: 'transparent',
    fontSize: 14,
    color: '#0f172a',
  },

  // ---- BUTTONS ----
  btnPillOutline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: '#0f172a',
    backgroundColor: 'transparent',
  },
  btnPillOutlineText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },
  btnPillPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: '#2563eb',
    backgroundColor: '#2563eb',
  },
  btnPillPrimaryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },

  // ---- TABLE CARD ----
  tableCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    paddingHorizontal: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 15,
    elevation: 2,
  },

  // ---- TABLE ----
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    paddingVertical: 16,
  },
  tableHead: {
    fontSize: 13,
    fontWeight: '500',
    color: '#64748b',
    paddingBottom: 16,
  },
  tableCell: {
    justifyContent: 'center',
  },
  tableCellText: {
    fontSize: 14,
    color: '#334155',
  },
  colUser: { flex: 3 },
  colDate: { flex: 2 },
  colTopics: { flex: 2 },
  colActions: { flex: 0.5, alignItems: 'center' as any },

  // ---- USER CELL ----
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#475569',
  },
  userDetails: {
    flexDirection: 'column',
  },
  userName: {
    fontWeight: '600',
    color: '#0f172a',
    fontSize: 14,
  },
  userSubtext: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },

  // ---- TOPICS ----
  topicsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  topicBadge: {
    backgroundColor: '#eff6ff',
    borderRadius: 99,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  topicBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2563eb',
  },
  noTopics: {
    fontSize: 14,
    color: '#94a3b8',
  },

  // ---- ACTIONS ----
  actionBtn: {
    padding: 8,
    borderRadius: 20,
  },

  // ---- EMPTY ----
  emptyState: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#94a3b8',
  },

  // ---- PAGINATION ----
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    marginTop: 4,
  },
  paginationInfo: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94a3b8',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  paginationNav: {
    flexDirection: 'row',
    gap: 8,
  },
  pageBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
  },
  pageBtnActive: {
    backgroundColor: '#2563eb',
  },
  pageBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
  },
  pageBtnTextActive: {
    color: '#ffffff',
  },
});
