"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { OtpInput } from "@/components/auth/otp-input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function VerifyPage() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async () => {
    setLoading(true);
    setError("");

    try {
      // In a real app, this would verify the OTP
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/auth/success");
    } catch (err) {
      setError("Invalid verification code");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    // In a real app, this would resend the OTP
    console.log("Resending OTP...");
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <PageHeader title="Verify your phone number" />

      <div className="flex-1 p-4">
        <p className="mb-8 text-center text-gray-600">
          We have sent you an SMS with a code to number +17 0123456789.
        </p>

        <OtpInput value={otp} onChange={setOtp} error={error} />

        <div className="mt-4 text-center">
          <button onClick={handleResend} className="text-sm text-[#f8d0bc]">
            Didn&apos;t receive the OTP? Resend.
          </button>
        </div>

        <Button
          onClick={handleVerify}
          className="mt-8 w-full bg-[#0a0b25] text-white"
          disabled={loading || otp.length !== 4}
        >
          {loading ? "Verifying..." : "Confirm"}
        </Button>
      </div>
    </div>
  );
}
