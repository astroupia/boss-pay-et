"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CurvedHeader } from "@/components/profile/curved-header";
import { ProfileAvatar } from "@/components/profile/profile-avatar";
import { SettingsItem } from "@/components/profile/settings-item";
import { Button } from "@/components/ui/button";
import {
  User,
  Bell,
  Fingerprint,
  Globe,
  Shield,
  HelpCircle,
  LogOut,
  CreditCard,
  Lock,
} from "lucide-react";
import type { ProfileSettings } from "@/types/profile";
import { useAuth } from "@/contexts/auth-context";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/ui/page-transition";
import BottomNavigation from "@/components/layout/bottom-navigation";

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout, loading } = useAuth();
  const [settings, setSettings] = useState<ProfileSettings>({
    notifications: true,
    faceId: true,
    language: "English",
  });
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await logout();
    router.push("/auth/signin");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Fallback user data if auth context doesn't provide it
  const userData = user || {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
    phoneNumber: "+1 234 567 890",
  };

  const settingsItems = [
    {
      icon: <User className="h-5 w-5 text-[#4da9e4]" />,
      label: "Personal Info",
      type: "link" as const,
      onClick: () => router.push("/profile/edit"),
    },
    {
      icon: <CreditCard className="h-5 w-5 text-[#4da9e4]" />,
      label: "Payment Methods",
      type: "link" as const,
      onClick: () => router.push("/profile/payment-methods"),
    },
    {
      icon: <Bell className="h-5 w-5 text-[#4da9e4]" />,
      label: "Notifications",
      type: "toggle" as const,
      value: settings.notifications,
      onChange: (value: boolean) =>
        setSettings((prev) => ({ ...prev, notifications: value })),
    },
    {
      icon: <Fingerprint className="h-5 w-5 text-[#4da9e4]" />,
      label: "Biometric Authentication",
      type: "toggle" as const,
      value: settings.faceId,
      onChange: (value: boolean) =>
        setSettings((prev) => ({ ...prev, faceId: value })),
    },
    {
      icon: <Globe className="h-5 w-5 text-[#4da9e4]" />,
      label: "Language",
      type: "link" as const,
      rightText: settings.language,
      onClick: () => router.push("/profile/language"),
    },
    {
      icon: <Shield className="h-5 w-5 text-[#4da9e4]" />,
      label: "Security",
      type: "link" as const,
      onClick: () => router.push("/profile/security"),
    },
    {
      icon: <Lock className="h-5 w-5 text-[#4da9e4]" />,
      label: "Privacy",
      type: "link" as const,
      onClick: () => router.push("/profile/privacy"),
    },
    {
      icon: <HelpCircle className="h-5 w-5 text-[#4da9e4]" />,
      label: "Help & Support",
      type: "link" as const,
      onClick: () => router.push("/profile/support"),
    },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-white dark:bg-gray-900 pb-20">
        <CurvedHeader className="flex flex-col items-center pt-12 pb-6">
          <ProfileAvatar name={userData.name} src={userData.avatar} size="lg" />
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl font-bold text-white mt-4"
          >
            {userData.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300"
          >
            {userData.phoneNumber || userData.email}
          </motion.p>
        </CurvedHeader>

        <div className="p-4 space-y-3">
          {settingsItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <SettingsItem {...item} />
            </motion.div>
          ))}
        </div>

        <div className="p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              variant="outline"
              className="w-full text-red-500 border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              onClick={handleLogout}
              disabled={loggingOut}
            >
              {loggingOut ? (
                <span className="flex items-center justify-center">
                  <LoadingSpinner size="sm" className="mr-2" /> Logging out...
                </span>
              ) : (
                <span className="flex items-center">
                  <LogOut className="h-4 w-4 mr-2" /> Log Out
                </span>
              )}
            </Button>
          </motion.div>
        </div>

        <BottomNavigation activeItem="more" />
      </div>
    </PageTransition>
  );
}
