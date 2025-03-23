import type React from "react";
// Consolidated type definitions

// Common types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phoneNumber?: string;
}

export interface Account {
  id: string;
  type: string;
  name: string;
  balance: number;
  currency: string;
  cardNumber: string;
  expiryDate?: string;
  isDefault?: boolean;
}

export interface Transaction {
  id: string;
  name: string;
  type: string;
  amount: number;
  date: string;
  direction?: "incoming" | "outgoing";
  status?: string;
  title?: string;
  description?: string;
  currency?: string;
  category?: string;
  icon?: string;
}

export interface Contact {
  email: string;
  id: string;
  name: string;
  initial: string;
  accountNumber?: string;
  avatar?: string;
}

export interface Currency {
  code: string;
  name: string;
  rate: number;
  inverse: number;
  flag: string;
  symbol?: string;
}

export interface Notification {
  id: string;
  title: string;
  message?: string;
  date: string;
  type: "success" | "warning" | "error" | "info";
  read: boolean;
}

export type NavItem =
  | "home"
  | "cards"
  | "exchange"
  | "notifications"
  | "more"
  | "transfer"
  | "history";

export interface PaymentMethod {
  id: string;
  type: string;
  name: string;
  icon: string;
  route?: string;
  description?: string;
  info?: boolean;
}

export interface CardDetails {
  id: string;
  type: string;
  number: string;
  currency: string;
  expiry: string;
  balance: number;
  color: string;
  isDefault?: boolean;
}

export interface PaymentLimit {
  type: string;
  limit: number;
  currency: string;
  period: "daily" | "monthly" | "yearly";
}

export interface BankAccount {
  id: string;
  type: "entrepreneur" | "personal";
  number: string;
  balance: number;
  currency: string;
}

export interface BeneficiaryInfo {
  name: string;
  iban: string;
  bic: string;
  bankName: string;
}

export interface TransferDetails {
  amount: number;
  currency: string;
  fromAccount: string;
  toAccount: string;
  comment?: string;
  fee?: number;
}

export interface CardMenuItem {
  id: string;
  title: string;
  icon: string;
  href: string;
}

// Transaction types
export interface TransactionDetails {
  id: string;
  amount: number;
  currency: string;
  date: string;
  time: string;
  recipient: string;
  cardNumber: string;
  fee: number;
  residualBalance: number;
  type: "incoming" | "outgoing";
  category: string;
  status: "completed" | "pending" | "failed";
  name: string;
}

export interface TransactionGroup {
  date: string;
  transactions: TransactionDetails[];
}

// Profile types
export interface UserProfile {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  dateOfBirth?: string;
  address?: string;
  avatar?: string;
}

export interface ProfileSettings {
  notifications: boolean;
  faceId: boolean;
  language: string;
}

export interface PersonalInfoFormData {
  name: string;
  phoneNumber: string;
  email: string;
  dateOfBirth: string;
  address: string;
}

// Auth types
export interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: User;
}

export interface AuthFormData {
  email: string;
  password: string;
  name?: string;
  confirmPassword?: string;
  phoneNumber?: string;
}

export interface AuthInputProps {
  icon?: React.ReactNode;
  placeholder: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  className?: string;
  required?: boolean;
  autoComplete?: string;
}

export interface SocialAuthButtonProps {
  provider: "google" | "facebook" | "twitter" | "apple";
  onClick: () => void;
  className?: string;
}

export interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  backHref?: string;
  className?: string;
}

export interface VerificationProps {
  phoneNumber: string;
  onVerificationComplete: () => void;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;
  login: (email: string, password: string) => Promise<AuthResponse>;
  signup: (data: AuthFormData) => Promise<AuthResponse>;
  logout: () => void;
  setOnboardingComplete: () => void;
}

// Onboarding types
export interface OnboardingSlide {
  id: number;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface OnboardingProps {
  slides: OnboardingSlide[];
  onComplete: () => void;
}

export interface SlideProps extends OnboardingSlide {
  isActive: boolean;
}

export interface ProgressIndicatorProps {
  total: number;
  current: number;
}

export interface OnboardingButtonProps {
  onClick: () => void;
  isLastSlide: boolean;
}
