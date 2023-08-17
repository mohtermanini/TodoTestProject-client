import MainFooter from "@/components/UI/MainFooter/MainFooter";
import MainNavbar from "@/components/UI/MainNavbar/MainNavbar";
import AuthForm from "@/features/auth/components/UI/AuthForm";
import RequireGuest from "@/features/auth/components/RequireGuest";
import { appData } from "@/data/appData";

export const metadata = {
  title: `Sign up | ${appData.title}`,
  description: `${appData.titleDescription}`,
};

export default function Signup() {
  return (
    <RequireGuest>
      <MainNavbar login />
      <main>
        <AuthForm signup />
      </main>
      <MainFooter />
    </RequireGuest>
  );
}
