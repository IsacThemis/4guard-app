"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserRole, useAppStore } from "@/store/useAppStore";

interface RoleGuardProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
}

export default function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const router = useRouter();
  const { userRole, setUserRole } = useAppStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("4guard-user-role") as UserRole;
    if (stored && ["OPERATOR", "SUPERVISOR", "INSPECTOR", "MANAGER", "AUDITOR"].includes(stored)) {
      setUserRole(stored);
    }
    setIsReady(true);
  }, [setUserRole]);

  useEffect(() => {
    if (isReady && !allowedRoles.includes(userRole)) {
      router.push("/");
    }
  }, [isReady, userRole, allowedRoles, router]);

  if (!isReady) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!allowedRoles.includes(userRole)) {
    return null;
  }

  return <>{children}</>;
}
