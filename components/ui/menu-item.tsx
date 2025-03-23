"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

interface MenuItemProps {
  icon: ReactNode;
  label: string;
  href: string;
  rightElement?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function MenuItem({
  icon,
  label,
  href,
  rightElement = <ChevronRight className="h-5 w-5 text-gray-400" />,
  onClick,
  className = "",
}: MenuItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center justify-between p-4 bg-white rounded-xl ${className}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-md bg-[#f8d0bc] flex items-center justify-center">
          {icon}
        </div>
        <span className="font-medium">{label}</span>
      </div>
      {rightElement}
    </Link>
  );
}
