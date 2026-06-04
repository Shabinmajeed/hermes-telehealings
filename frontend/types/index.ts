// frontend/types/index.ts
export enum Role {
  USER = 'USER',
  THERAPIST = 'THERAPIST',
  ADMIN = 'ADMIN',
}

export interface User {
  id: string;
  supabaseId: string;
  email: string;
  role: Role;
  profile?: UserProfile;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatarUrl?: string;
  dateOfBirth?: string;
  bio?: string;
}

export interface Therapist {
  id: string;
  userId: string;
  licenseNumber: string;
  yearsExperience: number;
  hourlyRate: number;
  isVerified: boolean;
  isAvailable: boolean;
  rating?: number;
  totalReviews: number;
  specializations: Specialization[];
  user?: User;
}

export interface Specialization {
  id: string;
  name: string;
  description?: string;
}

export interface Appointment {
  id: string;
  userId: string;
  therapistId: string;
  status: AppointmentStatus;
  startTime: string;
  endTime: string;
  notes?: string;
}

export enum AppointmentStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW',
}

export interface Session {
  id: string;
  appointmentId: string;
  therapistId: string;
  status: SessionStatus;
  startedAt?: string;
  endedAt?: string;
  videoRoomId?: string;
}

export enum SessionStatus {
  SCHEDULED = 'SCHEDULED',
  LIVE = 'LIVE',
  ENDED = 'ENDED',
  CANCELLED = 'CANCELLED',
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export interface Conversation {
  id: string;
  isGroup: boolean;
  participants: User[];
  lastMessage?: Message;
}

export interface Payment {
  id: string;
  appointmentId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  createdAt: string;
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}
