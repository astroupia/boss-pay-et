import type React from "react";
export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-[#0a0b25]">{children}</div>;
}
