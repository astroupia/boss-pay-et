"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react";
import type { Notification } from "@/types";
import { useEffect, useState } from "react";
import { useNotifications } from "@/lib/hooks/use-notifications";
import { PageTransition } from "@/components/ui/page-transition";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

// Mock data for notifications
const getNotificationById = (id: string): Notification => {
  const notifications: { [key: string]: Notification } = {
    "1": {
      id: "1",
      title: "Your loan application has been approved!",
      message:
        "Congratulations! Your loan application for $5,000 has been approved. The funds will be transferred to your account within 24 hours.",
      date: "2023-04-12T12:47:00",
      type: "success",
      read: false,
    },
    "2": {
      id: "2",
      title: "The loan repayment period expires!",
      message:
        "Your loan repayment period expires in 3 days. Please ensure you have sufficient funds in your account for the automatic payment.",
      date: "2023-04-12T12:47:00",
      type: "warning",
      read: false,
    },
    "3": {
      id: "3",
      title: "Your loan application was rejected!",
      message:
        "We regret to inform you that your loan application has been rejected. Please contact our customer support for more information.",
      date: "2023-04-12T12:47:00",
      type: "error",
      read: false,
    },
    "4": {
      id: "4",
      title: "Your piggy bank is full!",
      message:
        "Congratulations! You've reached your savings goal of $1,000 in your piggy bank. Would you like to set a new goal?",
      date: "2023-04-12T12:47:00",
      type: "success",
      read: false,
    },
  };

  return notifications[id] || notifications["1"]; // Default to first notification if not found
};

export default function NotificationDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { markAsRead } = useNotifications();
  const [notification, setNotification] = useState<Notification | null>(null);
  const [isMarked, setIsMarked] = useState(false);

  useEffect(() => {
    // Get notification data
    const notificationData = getNotificationById(params.id);
    setNotification(notificationData);

    // Mark as read only once
    if (!isMarked) {
      markAsRead(params.id);
      setIsMarked(true);
    }
  }, [params.id, markAsRead, isMarked]);

  if (!notification) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const getIcon = () => {
    switch (notification.type) {
      case "success":
        return <CheckCircle className="h-10 w-10 text-white" />;
      case "warning":
        return <AlertTriangle className="h-10 w-10 text-white" />;
      case "error":
        return <XCircle className="h-10 w-10 text-white" />;
      default:
        return <Info className="h-10 w-10 text-white" />;
    }
  };

  const getIconBgColor = () => {
    switch (notification.type) {
      case "success":
        return "bg-green-500";
      case "warning":
        return "bg-yellow-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-blue-500";
    }
  };

  const getCardBgColor = () => {
    switch (notification.type) {
      case "success":
        return "bg-green-50";
      case "warning":
        return "bg-yellow-50";
      case "error":
        return "bg-red-50";
      default:
        return "bg-blue-50";
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#f8f9fa]">
        <PageHeader title="Notification Details" />

        <div className="p-4 space-y-4">
          <div
            className={`${getCardBgColor()} rounded-xl p-6 border border-gray-100`}
          >
            <div className="flex flex-col items-center text-center">
              <div
                className={`h-16 w-16 rounded-full ${getIconBgColor()} flex items-center justify-center mb-4`}
              >
                {getIcon()}
              </div>
              <h1 className="text-xl font-bold mb-2">{notification.title}</h1>
              <p className="text-gray-600 mb-4">{notification.message}</p>
              <div className="text-sm text-gray-500">
                {formatDate(notification.date)}
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="flex-1"
            >
              Back
            </Button>

            <Button
              onClick={() => router.push("/")}
              className="flex-1 bg-[#0a0b25]"
            >
              Go to Home
            </Button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
