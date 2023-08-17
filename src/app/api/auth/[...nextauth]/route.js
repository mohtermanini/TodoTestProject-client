import { appPages } from "@/data/appPages";
import { appRoutes } from "@/data/appRoutes";
import { axiosClient } from "@/services/axiosClient";
import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          const response = await axiosClient.post(appRoutes.auth.store, {
            email,
            password,
          });
          return { authToken: response.data.data.token, user: response.data.data.user };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.authToken = token.authToken;
      session.userRole = token.userRole;
      return session;
    },
    async jwt({ token, user, account }) {
      if (account) {
        token.authToken = user.authToken;
        token.userRole = user.user.role.name;
      }
      return token;
    },
  },
  pages: {
    signIn: appPages.login,
  },
});

export { handler as GET, handler as POST };
