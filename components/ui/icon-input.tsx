"use client";

import { Input } from "@/components/ui/input";
import type { ReactNode } from "react";

interface IconInputProps {
  icon: ReactNode;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  maxLength?: number;
  className?: string;
}

export function IconInput({
  icon,
  placeholder,
  value,
  onChange,
  type = "text",
  className = "",
}: IconInputProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute left-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-md bg-[#f8d0bc] flex items-center justify-center">
        {icon}
      </div>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-14"
      />
    </div>
  );
}
