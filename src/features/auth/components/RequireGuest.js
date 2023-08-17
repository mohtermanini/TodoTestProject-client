"use client";

import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { appPages } from "@/data/appPages";
import { useRouter } from "next/navigation";
import { useLoader } from "@/contexts/LoaderProvider";
import SpinLoader from "@/components/UI/SpinLoader/SpinLoader";

export default function RequireGuest({ children }) {
  const router = useRouter();
  const { isLoaded, token, user } = useAuth();

  useEffect(() => {
    if (user !== null) {
      router.push(appPages.dashboard);
    }
  }, [user]);

  if (!isLoaded || token !== null) {
    return <SpinLoader />;
  }

  return <>{children}</>;
}
