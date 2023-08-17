"use client";

import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { appPages } from "@/data/appPages";
import { useRouter } from "next/navigation";
import SpinLoader from "@/components/UI/SpinLoader/SpinLoader";

export default function RequireAuth({ children }) {
  const router = useRouter();
  const { isLoaded, token } = useAuth();

  useEffect(() => {
    if (isLoaded && token === null) {
      router.push(appPages.login);
    }
  }, [isLoaded, token]);

  if (!isLoaded || token === null) {
    return <SpinLoader />;
  }

  return <>{children}</>;
}
