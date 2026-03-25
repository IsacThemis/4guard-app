"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserRole } from "@/store/useAppStore";

interface RoleGuardProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
}

export default function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const router = useRouter();
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("4guard-user-role") as UserRole;
    setUserRole(stored || "SUPERVISOR");
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading && userRole && !allowedRoles.includes(userRole)) {
      router.push("/");
    }
  }, [isLoading, userRole, allowedRoles, router]);

  if (isLoading || !userRole) {
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
