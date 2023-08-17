import MainFooter from "@/components/UI/MainFooter/MainFooter";
import MainNavbar from "@/components/UI/MainNavbar/MainNavbar";
import AuthForm from "@/features/auth/components/UI/AuthForm";
import RequireGuest from "@/features/auth/components/RequireGuest";
import { appData } from "@/data/appData";

export const metadata = {
  title: `Login | ${appData.title}`,
  description: `${appData.titleDescription}`,
};

export default function Login() {
  return (
    <RequireGuest>
      <MainNavbar signup />
      <main>
        <AuthForm login />
      </main>
      <MainFooter />
    </RequireGuest>
  );
}
