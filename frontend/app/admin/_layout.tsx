// frontend/app/admin/_layout.tsx
import { useState, useRef, useEffect } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput,
  ScrollView, Animated, Image} from 'react-native';

import { useRouter, usePathname } from 'expo-router';
import Svg, { Path, Circle, Rect, Line, Polyline } from 'react-native-svg';
import { Slot } from 'expo-router';

const PRIMARY = '#2a73d4';
const SIDEBAR_WIDTH = 260;
const SIDEBAR_COLLAPSED = 88;

const NAV_ITEMS = [
  { label: 'Dashboard', icon: 'dashboard', route: '/admin/dashboard' },
  { label: 'Therapist', icon: 'user', route: '/admin/therapist' },
  { label: 'Clients', icon: 'users', route: '/admin/dashboard' },
  { type: 'separator' },
  { label: 'Sessions & Schedule', icon: 'calendar', route: '/admin/sessions' },
  { label: 'Content Management', icon: 'book', route: '/admin/content' },
  { label: 'Communications', icon: 'chat', route: '/admin/communications' },
  { label: 'Compliance', icon: 'shield', route: '/admin/compliance' },
  { type: 'separator' },
  { label: 'Financials', icon: 'dollar', route: '/admin/financials' },
  { label: 'Analytics & Reporting', icon: 'chart', route: '/admin/analytics' },
  { label: 'Promotion & Offers', icon: 'tag', route: '/admin/promotions' },
];

const NavIcon = ({ name, color }: { name: string; color: string }) => {
  const s = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (name) {
    case 'dashboard':
      return <Svg {...s}><Rect x={3} y={3} width={7} height={7} /><Rect x={14} y={3} width={7} height={7} /><Rect x={14} y={14} width={7} height={7} /><Rect x={3} y={14} width={7} height={7} /></Svg>;
    case 'user':
      return <Svg {...s}><Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><Circle cx={12} cy={7} r={4} /></Svg>;
    case 'users':
      return <Svg {...s}><Path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><Circle cx={9} cy={7} r={4} /><Path d="M23 21v-2a4 4 0 0 0-3-3.87" /><Path d="M16 3.13a4 4 0 0 1 0 7.75" /></Svg>;
    case 'calendar':
      return <Svg {...s}><Rect x={3} y={4} width={18} height={18} rx={2} ry={2} /><Line x1={16} y1={2} x2={16} y2={6} /><Line x1={8} y1={2} x2={8} y2={6} /><Line x1={3} y1={10} x2={21} y2={10} /></Svg>;
    case 'book':
      return <Svg {...s}><Path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><Path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></Svg>;
    case 'chat':
      return <Svg {...s}><Path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></Svg>;
    case 'shield':
      return <Svg {...s}><Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></Svg>;
    case 'dollar':
      return <Svg {...s}><Path d="M6 3h12" /><Path d="M6 8h12" /><Path d="m6 13 8.5 8" /><Path d="M6 13h3" /><Path d="M9 13c6.667 0 6.667-10 0-10" /></Svg>;
    case 'chart':
      return <Svg {...s}><Line x1={18} y1={20} x2={18} y2={10} /><Line x1={12} y1={20} x2={12} y2={4} /><Line x1={6} y1={20} x2={6} y2={14} /></Svg>;
    case 'tag':
      return <Svg {...s}><Path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><Line x1={7} y1={7} x2={7.01} y2={7} /></Svg>;
    default:
      return null;
  }
};

export default function AdminLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const isLoginPage = pathname === '/admin/login' || pathname === '/admin';

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: collapsed ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [collapsed]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  // Login page: no sidebar, full screen
  if (isLoginPage) {
    return <Slot />;
  }

  // All other admin pages: sidebar + content
  const w = collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_WIDTH;

  return (
    <View style={styles.shell}>
      {/* ===== SIDEBAR ===== */}
      <View style={[styles.sidebar, { width: w }]}>
        {/* Brand */}
        <View style={styles.brand}>
          <View style={styles.brandLeft}>
            <Image source={require('../../assets/images/Logo.png')} style={styles.brandImg} resizeMode="contain" />
            {!collapsed && <Text style={styles.brandText}>Telehealings</Text>}
          </View>
          <TouchableOpacity onPress={() => setCollapsed(!collapsed)} style={styles.toggleBtn}>
            <Animated.View style={{ transform: [{ rotate: rotation }] }}>
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={2}>
                <Polyline points="15 18 9 12 15 6" />
              </Svg>
            </Animated.View>
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchBox}>
          <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={2} style={styles.searchIcon}>
            <Circle cx={11} cy={11} r={8} />
            <Line x1={21} y1={21} x2={16.65} y2={16.65} />
          </Svg>
          {!collapsed && (
            <TextInput style={styles.searchInput} placeholder="Search" placeholderTextColor="#94a3b8" />
          )}
        </View>

        {/* Nav */}
        <ScrollView style={styles.navMenu} showsVerticalScrollIndicator={false}>
          {NAV_ITEMS.map((item, i) => {
            if (item.type === 'separator') {
              return <View key={`sep-${i}`} style={styles.navSeparator} />;
            }
            const isActive = pathname === item.route;
            return (
              <TouchableOpacity
                key={item.label}
                style={[styles.navItem, isActive && styles.navItemActive, collapsed && styles.navItemCollapsed]}
                onPress={() => item.route && router.push(item.route as any)}
                activeOpacity={0.7}
              >
                <NavIcon name={item.icon!} color={isActive ? '#fff' : '#64748b'} />
                {!collapsed && <Text style={[styles.navText, isActive && styles.navTextActive]}>{item.label}</Text>}
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* User Profile */}
        <View style={[styles.userProfile, collapsed && styles.userProfileCollapsed]}>
          <Image
            source={require('../../assets/images/Heali.png')}
            style={[styles.profileImg, collapsed && styles.profileImgCollapsed]}
            resizeMode="contain"
          />
          {!collapsed && (
            <>
              <Text style={styles.profileName}>Admin</Text>
              <Text style={styles.profileRole}>Administrator</Text>
            </>
          )}
        </View>
      </View>

      {/* ===== CONTENT AREA ===== */}
      <View style={[styles.contentArea, { marginLeft: 0 }]}>
        <Slot />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
  },

  // ---- SIDEBAR ----
  sidebar: {
    backgroundColor: '#FFFFFF',
    borderRightWidth: 1,
    borderRightColor: 'rgba(0,0,0,0.05)',
    paddingVertical: 30,
    paddingHorizontal: 20,
    flexShrink: 0,
  },

  // ---- BRAND ----
  brand: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  brandLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  brandImg: {
    width: 36,
    height: 36,
  },
  brandText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  toggleBtn: {
    padding: 4,
    borderRadius: 6,
  },

  // ---- SEARCH ----
  searchBox: {
    position: 'relative',
    marginBottom: 20,
    height: 44,
    justifyContent: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: 14,
    zIndex: 1,
  },
  searchInput: {
    width: '100%',
    height: 44,
    paddingLeft: 40,
    paddingRight: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#f8fafc',
    fontSize: 14,
    color: '#0f172a',
  },

  // ---- NAV ----
  navMenu: {
    flex: 1,
    marginBottom: 25,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 4,
  },
  navItemActive: {
    backgroundColor: '#1c52b8',
  },
  navItemCollapsed: {
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  navText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#475569',
  },
  navTextActive: {
    color: '#fff',
  },
  navSeparator: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 8,
    marginHorizontal: 16,
  },

  // ---- USER PROFILE ----
  userProfile: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  userProfileCollapsed: {
    padding: 10,
    backgroundColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
    borderWidth: 0,
  },
  profileImg: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    marginTop: -45,
    marginBottom: 10,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  profileImgCollapsed: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginTop: 0,
    marginBottom: 0,
    borderWidth: 0,
  },
  profileName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 2,
  },
  profileRole: {
    fontSize: 12,
    color: '#64748b',
  },

  // ---- CONTENT ----
  contentArea: {
    flex: 1,
    overflow: 'hidden',
  },
});
