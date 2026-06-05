// frontend/services/api.ts

function getApiBaseUrl(): string {
  // Explicit env variable takes priority
  const envUrl = process.env.EXPO_PUBLIC_API_URL;
  if (envUrl) return envUrl;

  // On web (browser), use same origin or localhost
  if (typeof window !== 'undefined') {
    const { protocol, hostname, port } = window.location;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:3001/api/v1';
    }
    // On phone or other device, the hostname is the dev machine's IP
    // Metro bundler serves from the same IP, but backend is on port 3001
    return `${protocol}//${hostname}:3001/api/v1`;
  }

  return 'http://localhost:3001/api/v1';
}

const API_BASE = getApiBaseUrl();

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE}${path}`;
  console.log('[API]', options?.method || 'GET', url);
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as any).message || `API error ${res.status}`);
  }
  return res.json();
}

export const api = {
  // Users
  getAllUsers: () => apiFetch('/users'),

  onboardUser: (data: { name: string; termsAcceptedAt: string; topics?: string[] }) =>
    apiFetch('/users/onboard', { method: 'POST', body: JSON.stringify(data) }),

  getUser: (id: string) => apiFetch(`/users/${id}`),

  updateUser: (id: string, data: { name?: string; topics?: string[] }) =>
    apiFetch(`/users/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),

  deleteUser: (id: string) => apiFetch(`/users/${id}`, { method: 'DELETE' }),

  // Profiles
  upsertProfile: (userId: string, data: Record<string, any>) =>
    apiFetch(`/users/${userId}/profile`, { method: 'POST', body: JSON.stringify(data) }),

  getProfile: (userId: string) => apiFetch(`/users/${userId}/profile`),

  // Auth
  adminLogin: (username: string, password: string) =>
    apiFetch('/auth/admin/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),

  signUp: (email: string, password: string) =>
    apiFetch('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  signIn: (email: string, password: string) =>
    apiFetch('/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
};
