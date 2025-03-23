"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Repeat, Bell, CreditCard, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavigationProps {
  className?: string;
  activeItem?: string;
}

export default function BottomNavigation({
  className,
  activeItem,
}: BottomNavigationProps) {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: Home,
    },
    {
      name: "Exchange",
      href: "/exchange",
      icon: Repeat,
    },
    {
      name: "Cards",
      href: "/cards",
      icon: CreditCard,
    },
    {
      name: "Notifications",
      href: "/notifications",
      icon: Bell,
    },
    {
      name: "Profile",
      href: "/profile",
      icon: User,
    },
  ];

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-lg",
        className
      )}
    >
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = activeItem
            ? item.name.toLowerCase() === activeItem.toLowerCase()
            : pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full transition-colors",
                isActive
                  ? "text-primary"
                  : "text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
              )}
            >
              <div className="flex flex-col items-center justify-center">
                <item.icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{item.name}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
