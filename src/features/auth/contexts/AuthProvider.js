"use client";

import { signOut, useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getData } from "@/utils/requests";
import { appRoutes } from "@/data/appRoutes";
import { appPages } from "@/data/appPages";
import { useLoader } from "@/contexts/LoaderProvider";
import { toast } from "react-toastify";
import { authMessages } from "../data/authMessages";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const router = useRouter();

  const { data: session, status } = useSession();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { incrementLoaderCount, decrementLoaderCount } = useLoader();

  useEffect(() => {
    if (status === "unauthenticated") {
      setIsLoaded(true);
      unauthenticateUser();
    } else if (status === "authenticated") {
      setToken(session.authToken);
    }
  }, [status]);

  useEffect(() => {
    if (token) {
      incrementLoaderCount();
      getData(appRoutes.users.show, token).then((res) => {
        setUser({ ...res.data });
        decrementLoaderCount();
      });
    } else {
      unauthenticateUser();
    }
  }, [token]);

  useEffect(() => {
    if (token && user) {
      setIsLoaded(true);
    }
  }, [token, user]);

  function unauthenticateUser() {
    setToken(null);
    setUser(null);
  }

  async function logout() {
    incrementLoaderCount();
    await signOut({ redirect: false });
    unauthenticateUser();
    toast.success(authMessages.logoutSuccessfully);
    decrementLoaderCount();
  }

  return (
    <AuthContext.Provider
      value={{
        isLoaded,
        token,
        setToken,
        user,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
