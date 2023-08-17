import { appPages } from "@/data/appPages";
import { redirect } from "next/navigation";

export default function Home() {
  redirect(appPages.login);

  return <></>;
}
