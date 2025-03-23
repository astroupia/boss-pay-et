"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { NotificationCard } from "@/components/ui/notification-card";
import { useNotifications } from "@/lib/hooks/use-notifications";
import { AppLayout } from "@/components/layout/app-layout";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { AnimatedCard } from "@/components/ui/animated-card";
import { motion } from "framer-motion";

export default function NotificationsPage() {
  const router = useRouter();
  const { notifications, markAllAsRead, loading } = useNotifications();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNotifications = searchQuery
    ? notifications.filter(
        (n) =>
          n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (n.message &&
            n.message.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : notifications;

  const handleNotificationClick = (id: string) => {
    router.push(`/notifications/${id}`);
  };

  if (loading) {
    return (
      <AppLayout title="Notifications">
        <div className="flex items-center justify-center h-full">
          <LoadingSpinner size="lg" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Notifications">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Recent Notifications
          </h2>
          {notifications.some((n) => !n.read) && (
            <Button
              variant="ghost"
              size="sm"
              className="text-[#4da9e4] hover:text-[#3d99d4] transition-colors"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search notifications"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-3"
        >
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification, index) => (
              <AnimatedCard key={notification.id} delay={index * 0.05}>
                <NotificationCard
                  notification={notification}
                  onClick={() => handleNotificationClick(notification.id)}
                />
              </AnimatedCard>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              {searchQuery
                ? `No notifications found matching "${searchQuery}"`
                : "No notifications yet"}
            </div>
          )}
        </motion.div>
      </div>
    </AppLayout>
  );
}
