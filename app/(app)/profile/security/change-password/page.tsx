"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { AuthInput } from "@/components/auth/auth-input";
import { Lock } from "lucide-react";

export default function ChangePasswordPage() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate passwords
    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords don't match");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // In a real app, this would call an API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Show success message and navigate back
      alert("Password changed successfully");
      router.back();
    } catch (error) {
      console.error("Failed to change password:", error);
      setError("Failed to change password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <PageHeader title="Change Password" />

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <AuthInput
          icon={<Lock className="h-5 w-5" />}
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={setCurrentPassword}
        />

        <AuthInput
          icon={<Lock className="h-5 w-5" />}
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={setNewPassword}
        />

        <AuthInput
          icon={<Lock className="h-5 w-5" />}
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={setConfirmPassword}
        />

        <div className="pt-4">
          <Button
            type="submit"
            className="w-full bg-[#0a0b25]"
            disabled={
              loading || !currentPassword || !newPassword || !confirmPassword
            }
          >
            {loading ? "Changing Password..." : "Change Password"}
          </Button>
        </div>
      </form>
    </div>
  );
}
