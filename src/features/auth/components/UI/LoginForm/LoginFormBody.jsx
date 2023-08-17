import PasswordField from "@/components/UI/Forms/PasswordField";
import React from "react";
import { SubmitButton } from "../Form.elements";
import EmailField from "@/components/UI/Forms/EmailField";
import { useForm } from "react-hook-form";
import { useLoader } from "@/contexts/LoaderProvider";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { authMessages } from "@/features/auth/data/authMessages";

export default function LoginFormBody() {
  const { incrementLoaderCount, decrementLoaderCount } = useLoader();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmitLoginForm(data) {
    incrementLoaderCount();
    const signInResult = await signIn("credentials", {
      ...data,
      redirect: false,
    });
    decrementLoaderCount();
    if (signInResult.error === null) {
      toast.success(authMessages.loginSuccessfully);
      return;
    }
    toast.error(authMessages.loginFailed);
  }

  return (
    <form onSubmit={handleSubmit(onSubmitLoginForm)}>
      <EmailField
        name={"email"}
        label={"Email"}
        register={register}
        errors={errors}
      />
      <PasswordField
        name={"password"}
        label={"Password"}
        register={register}
        errors={errors}
      />
      <SubmitButton>Login</SubmitButton>
    </form>
  );
}
