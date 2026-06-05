// frontend/app/(user)/home.tsx
import { useState, useRef, useEffect } from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, Animated,, Image} from 'react-native';

import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, Line, Polyline, Polygon } from 'react-native-svg';
import { useAuthStore } from '../../stores/authStore';

const MOODS = [
  { id: 'energized', label: 'Energized', emoji: '⚡' },
  { id: 'calm', label: 'Calm', emoji: '😌' },
  { id: 'okay', label: 'Okay', emoji: '🙂' },
  { id: 'stressed', label: 'Stressed', emoji: '😟' },
  { id: 'overwhelmed', label: 'Overwhelmed', emoji: '😵' },
];

const CONTENT_ITEMS = [
  { id: 1, title: 'Breathing Exercise', meta: '5 min • Audio', color: '#E0F2FE' },
  { id: 2, title: 'Sleep Stories', meta: '10 min • Audio', color: '#FEF3C7' },
  { id: 3, title: 'Stress Relief', meta: '15 min • Video', color: '#D1FAE5' },
  { id: 4, title: 'Mindfulness', meta: '8 min • Audio', color: '#EDE9FE' },
];

const TABS = [
  { label: 'Home', icon: '🏠', route: '/(user)/home' },
  { label: 'Discover', icon: '🔍', route: '/(user)/discover' },
  { label: 'Sessions', icon: '📅', route: '/(user)/sessions' },
  { label: 'Chat', icon: '💬', route: '/(user)/chat' },
  { label: 'Profile', icon: '👤', route: '/(user)/profile' },
];

export default function HomeScreen() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [showJournal, setShowJournal] = useState(false);
  const [journalText, setJournalText] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const greeting = getGreeting();
  const userName = user?.profile?.firstName || 'User';

  const handleLogout = () => {
    logout();
    router.replace('/(user)/splash');
  };

  return (
    <View style={styles.container}>
      {/* ===== FIXED HEADER (blue gradient with curved bottom) ===== */}
      <LinearGradient
        colors={['rgba(59,130,246,0.12)', 'rgba(226,239,250,1)']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.fixedHeader}
      >
        {/* Top Action Row */}
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.userProfile} onPress={() => setShowDropdown(!showDropdown)}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{(userName || '?')[0].toUpperCase()}</Text>
            </View>
            <View style={styles.userNameBox}>
              <Text style={styles.userName}>{userName}</Text>
              <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#1a293b" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <Polyline points="6 9 12 15 18 9" />
              </Svg>
            </View>

            {/* Dropdown */}
            {showDropdown && (
              <View style={styles.userDropdown}>
                <TouchableOpacity style={[styles.dropdownItem, styles.dropdownLogout]} onPress={handleLogout}>
                  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                    <Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <Polyline points="16 17 21 12 16 7" />
                    <Line x1={21} y1={12} x2={9} y2={12} />
                  </Svg>
                  <Text style={styles.dropdownLogoutText}>Log out</Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.notificationBtn} onPress={() => setShowNotifications(!showNotifications)}>
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#384e68" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <Path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </Svg>
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* ===== SCROLLABLE CONTENT ===== */}
      <ScrollView style={styles.contentWrapper} showsVerticalScrollIndicator={false}>

        {/* Verify Banner */}
        <View style={styles.verifyBanner}>
          <View style={styles.verifyLeft}>
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <Polyline points="9 12 11 14 15 10" />
            </Svg>
            <Text style={styles.verifyText}>Please verify your account to{'\n'}book Therapists.</Text>
          </View>
          <TouchableOpacity style={styles.verifyBtn} activeOpacity={0.7} onPress={() => router.push('/(user)/signup/phone-verify')}>
            <Text style={styles.verifyBtnText}>Verify</Text>
            <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#387bd5" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
              <Polyline points="9 18 15 12 9 6" />
            </Svg>
          </TouchableOpacity>
        </View>

        {/* Greeting Section */}
        <View style={styles.greetingSection}>
          <View style={styles.greetingContent}>
            <Text style={styles.greetingTitle}>{greeting}, {userName}</Text>
            <Text style={styles.greetingSubtitle}>We're here to help you manage your stress today. Take a moment for yourself.</Text>
          </View>
          <Image source={require('../../assets/images/Heali.png')} style={styles.greetingHeali} resizeMode="contain" />
        </View>

        {/* Mood Card */}
        <View style={[styles.card, styles.moodCard]}>
          <View style={styles.moodHeader}>
            <Text style={styles.moodTitle}>How Are You Feeling today?</Text>
            <TouchableOpacity onPress={() => { setSelectedMood(null); setShowJournal(false); }} style={styles.closeIcon}>
              <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <Line x1={18} y1={6} x2={6} y2={18} />
                <Line x1={6} y1={6} x2={18} y2={18} />
              </Svg>
            </TouchableOpacity>
          </View>

          <View style={styles.moodFaces}>
            {MOODS.map((mood) => {
              const isSelected = selectedMood === mood.id;
              return (
                <TouchableOpacity
                  key={mood.id}
                  style={[styles.moodItem, isSelected && styles.moodItemSelected]}
                  onPress={() => { setSelectedMood(mood.id); setShowJournal(true); }}
                  activeOpacity={0.7}
                >
                  <View style={[styles.moodIconWrapper, isSelected && styles.moodIconWrapperSelected]}>
                    <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                  </View>
                  <Text style={[styles.moodLabel, isSelected && styles.moodLabelSelected]}>{mood.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Journal Section */}
          {showJournal && (
            <View style={styles.journalSection}>
              <Text style={styles.journalPrompt}>What's on your mind? Write a quick journal entry.</Text>
              <TextInput
                style={styles.journalTextarea}
                placeholder="Type here..."
                placeholderTextColor="#94a3b8"
                multiline
                numberOfLines={3}
                value={journalText}
                onChangeText={setJournalText}
                textAlignVertical="top"
              />
              <TouchableOpacity style={styles.journalSaveBtn} activeOpacity={0.8}>
                <Text style={styles.journalSaveText}>Save Entry</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Appointment Card (placeholder) */}
        <View style={styles.apptCard}>
          <View style={styles.apptHeader}>
            <View style={styles.apptStatus}>
              <Text style={styles.apptStatusText}>Upcoming</Text>
            </View>
            <Text style={styles.apptId}>#TH-2026</Text>
          </View>
          <View style={styles.therapistInfo}>
            <View style={styles.therapistAvatar}>
              <Text style={styles.therapistAvatarText}>DR</Text>
            </View>
            <View style={styles.therapistDetails}>
              <Text style={styles.therapistName}>Dr. Sarah Mitchell</Text>
              <Text style={styles.therapistSpec}>Clinical Psychologist</Text>
            </View>
          </View>
          <View style={styles.apptTimeInfo}>
            <View style={styles.timeBlock}>
              <Text style={styles.timeLabel}>Date</Text>
              <Text style={styles.timeValue}>Jun 12, 2026</Text>
            </View>
            <View style={styles.timeDivider} />
            <View style={styles.timeBlock}>
              <Text style={styles.timeLabel}>Time</Text>
              <Text style={styles.timeValue}>10:00 AM</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.joinBtn} activeOpacity={0.85}>
            <Text style={styles.joinBtnText}>Join Session</Text>
            <Svg width={18} height={18} viewBox="0 0 24 24" fill="#fff" stroke="#fff" strokeWidth={2}>
              <Path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <Polyline points="10 17 15 12 10 7" />
              <Line x1={15} y1={12} x2={3} y2={12} />
            </Svg>
          </TouchableOpacity>
        </View>

        {/* Recommended Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended for You</Text>
          <TouchableOpacity><Text style={styles.sectionLink}>See All</Text></TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.contentRow}>
          {CONTENT_ITEMS.map((item) => (
            <TouchableOpacity key={item.id} style={styles.contentCard} activeOpacity={0.8}>
              <View style={[styles.contentImgBox, { backgroundColor: item.color }]}>
                <View style={styles.playIconOverlay}>
                  <Svg width={28} height={28} viewBox="0 0 24 24" fill="#fff" stroke="#fff" strokeWidth={1.5}>
                    <Polygon points="5 3 19 12 5 21 5 3" />
                  </Svg>
                </View>
              </View>
              <Text style={styles.contentCardTitle} numberOfLines={2}>{item.title}</Text>
              <Text style={styles.contentCardMeta}>{item.meta}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Bottom spacer for tab bar */}
        <View style={{ height: 20 }} />
      </ScrollView>

      {/* ===== BOTTOM TAB BAR ===== */}
      <View style={styles.tabBar}>
        {TABS.map((tab) => {
          const isActive = tab.route === '/(user)/home';
          return (
            <TouchableOpacity
              key={tab.label}
              style={styles.tabItem}
              onPress={() => { if (!isActive) router.push(tab.route as any); }}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabIcon, isActive && styles.tabIconActive]}>{tab.icon}</Text>
              <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>{tab.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfcfd',
  },

  // ---- FIXED HEADER ----
  fixedHeader: {
    paddingTop: 25,
    paddingHorizontal: 20,
    paddingBottom: 25,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 4,
    zIndex: 10,
  },

  // ---- HEADER ROW ----
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    position: 'relative',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#d1b894',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  userNameBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a293b',
  },

  // ---- DROPDOWN ----
  userDropdown: {
    position: 'absolute',
    top: 55,
    left: -10,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 16,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(59,130,246,0.15)',
    width: 140,
    paddingVertical: 6,
    zIndex: 100,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    marginHorizontal: 2,
  },
  dropdownLogout: {},
  dropdownLogoutText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ef4444',
  },

  // ---- NOTIFICATION ----
  notificationBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 10,
    height: 10,
    backgroundColor: '#ef4444',
    borderWidth: 2,
    borderColor: '#ffffff',
    borderRadius: 5,
  },

  // ---- CONTENT ----
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },

  // ---- VERIFY BANNER ----
  verifyBanner: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    padding: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(56,123,213,0.15)',
    marginBottom: 8,
  },
  verifyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  verifyText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '500',
    color: '#64748b',
  },
  verifyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  verifyBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#387bd5',
  },

  // ---- GREETING ----
  greetingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    gap: 12,
  },
  greetingContent: {
    flex: 1,
  },
  greetingTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a293b',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  greetingSubtitle: {
    fontSize: 13,
    color: '#64748b',
    lineHeight: 18,
  },
  greetingHeali: {
    width: 72,
    height: 72,
  },

  // ---- CARD ----
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.03,
    shadowRadius: 35,
    elevation: 2,
    marginBottom: 16,
  },

  // ---- MOOD CARD ----
  moodCard: {},
  moodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  moodTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a293b',
    letterSpacing: -0.3,
  },
  closeIcon: {
    padding: 4,
  },
  moodFaces: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  moodItem: {
    alignItems: 'center',
    gap: 10,
  },
  moodItemSelected: {},
  moodIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
  },
  moodIconWrapperSelected: {
    backgroundColor: '#e2effb',
    transform: [{ scale: 1.15 }],
  },
  moodEmoji: {
    fontSize: 24,
  },
  moodLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748b',
  },
  moodLabelSelected: {
    color: '#1a293b',
  },

  // ---- JOURNAL ----
  journalSection: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  journalPrompt: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 12,
    fontWeight: '500',
  },
  journalTextarea: {
    width: '100%',
    height: 80,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    color: '#1a293b',
    backgroundColor: '#f8fafc',
    marginBottom: 12,
  },
  journalSaveBtn: {
    alignSelf: 'flex-end',
    backgroundColor: '#387bd5',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  journalSaveText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },

  // ---- APPOINTMENT CARD ----
  apptCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 30,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    marginBottom: 16,
  },
  apptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  apptStatus: {
    backgroundColor: '#e2effb',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  apptStatusText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1e5ab8',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  apptId: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94a3b8',
  },
  therapistInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 20,
  },
  therapistAvatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#e2effb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  therapistAvatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e5ab8',
  },
  therapistDetails: {
    flex: 1,
  },
  therapistName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a293b',
    marginBottom: 4,
  },
  therapistSpec: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '500',
  },
  apptTimeInfo: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  timeBlock: {
    flex: 1,
    gap: 6,
  },
  timeDivider: {
    width: 1.5,
    backgroundColor: '#e2e8f0',
    marginHorizontal: 12,
  },
  timeLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  timeValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a293b',
  },
  joinBtn: {
    width: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 6,
  },
  joinBtnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },

  // ---- RECOMMENDED ----
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 10,
    marginBottom: 4,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#1a293b',
  },
  sectionLink: {
    fontSize: 13,
    fontWeight: '600',
    color: '#387bd5',
  },
  contentRow: {
    flexDirection: 'row',
    marginHorizontal: -20,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  contentCard: {
    width: 160,
    marginRight: 16,
  },
  contentImgBox: {
    width: '100%',
    height: 110,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIconOverlay: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a293b',
    lineHeight: 18,
    marginBottom: 4,
  },
  contentCardMeta: {
    fontSize: 11,
    fontWeight: '500',
    color: '#64748b',
  },

  // ---- TAB BAR ----
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 8,
    paddingBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 4,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  tabIcon: {
    fontSize: 22,
    marginBottom: 2,
    opacity: 0.5,
  },
  tabIconActive: {
    opacity: 1,
  },
  tabLabel: {
    fontSize: 10,
    color: '#94a3b8',
    fontWeight: '500',
  },
  tabLabelActive: {
    color: '#387bd5',
    fontWeight: '600',
  },
});
