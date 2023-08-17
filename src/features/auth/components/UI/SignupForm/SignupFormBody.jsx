import PasswordField from "@/components/UI/Forms/PasswordField";
import React, { useEffect } from "react";
import { SubmitButton } from "../Form.elements";
import TextField from "@/components/UI/Forms/TextField";
import EmailField from "@/components/UI/Forms/EmailField";
import { GoDotFill } from "react-icons/go";
import { styled } from "styled-components";
import { breakpoints } from "@/data/breakpoints";
import { theme } from "@/data/theme";
import { useForm } from "react-hook-form";
import { useLoader } from "@/contexts/LoaderProvider";
import { postData } from "@/utils/requests";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { authMessages } from "@/features/auth/data/authMessages";
import { appRoutes } from "@/data/appRoutes";

const NameContainer = styled.div`
  display: flex;
  gap: 50px;
  @media (max-width: ${breakpoints.laptop}) {
    display: block;
  }
`;

const PasswordContainer = styled.div``;

const HintsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Hint = styled.div`
  display: flex;
  gap: 6px;
  color: ${theme.palette.grey[600]};
`;

const Dot = styled(GoDotFill)`
  width: 16px;
  height: 16px;
  flex-shrink: 0;
`;

const HintText = styled.div`
  font: ${theme.typography.label.lg.regular};
  @media (max-width: ${breakpoints.desktop}) {
    font: ${theme.typography.label.md.regular};
  }
  @media (max-width: ${breakpoints.tablet}) {
    font: ${theme.typography.label.sm.regular};
  }
`;

const PasswordConfirmationContainer = styled.div`
  margin-top: 16px;
`;

export default function SignupFormBody({ onSubmit }) {
  const { incrementLoaderCount, decrementLoaderCount } = useLoader();

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    watch,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const passwordsWatcher = watch(["password", "passwordConfirmation"]);
  useEffect(() => {
    if (
      dirtyFields.passwordConfirmation &&
      passwordsWatcher[0] !== passwordsWatcher[1]
    ) {
      setError("password", { message: "Passwords does not match." });
    } else {
      clearErrors("password");
    }
  }, [passwordsWatcher[0], passwordsWatcher[1]]);

  async function onSubmitSignupForm(data) {
    try {
      incrementLoaderCount();
      const formData = {
        ...data,
        first_name: data.firstName,
        last_name: data.lastName,
        password_confirmation: data.passwordConfirmation,
      };
      await postData(appRoutes.users.store, formData);
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      toast.success(authMessages.signupSuccessfully);
    } catch (error) {
    } finally {
      decrementLoaderCount();
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmitSignupForm)}>
      <NameContainer>
        <TextField
          name={"firstName"}
          label={"First Name"}
          register={register}
          errors={errors}
        />
        <TextField
          name={"lastName"}
          label={"Last Name"}
          register={register}
          errors={errors}
        />
      </NameContainer>
      <EmailField
        name={"email"}
        label={"Email"}
        register={register}
        errors={errors}
      />
      <PasswordContainer>
        <PasswordField
          name={"password"}
          label={"Password"}
          register={register}
          errors={errors}
          minLength={8}
          validate={{
            checkPasswordContainsOneSmallCaseLetter: (value) => {
              return (
                /[a-z]/.test(value) ||
                "Password must contain at least one smallcase letter."
              );
            },
            checkPasswordContainsOneupperCaseLetter: (value) => {
              return (
                /[A-Z]/.test(value) ||
                "Password must contain at least one uppercase letter."
              );
            },
            checkPasswordContainsOneNumber: (value) => {
              return (
                /[0-9]/.test(value) ||
                "Password must contain at least one number."
              );
            },
          }}
        />
        <HintsContainer>
          <Hint>
            <Dot />
            <HintText>Password length must be at least 8 characters.</HintText>
          </Hint>
          <Hint>
            <Dot />
            <HintText>
              Password must contain at least 1 upper case letter, 1 small case
              letter and one number.
            </HintText>
          </Hint>
        </HintsContainer>
      </PasswordContainer>
      <PasswordConfirmationContainer>
        <PasswordField
          name={"passwordConfirmation"}
          label={"Password Confirmation"}
          register={register}
          errors={errors}
        />
      </PasswordConfirmationContainer>
      <SubmitButton>Create Account</SubmitButton>
    </form>
  );
}
