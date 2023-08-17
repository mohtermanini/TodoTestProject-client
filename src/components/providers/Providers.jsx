"use client";
import LoaderProvider from "@/contexts/LoaderProvider";
import AuthProvider from "@/features/auth/contexts/AuthProvider";
import React from "react";
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <LoaderProvider>
        <AuthProvider>{children}</AuthProvider>
      </LoaderProvider>
    </SessionProvider>
  );
}
