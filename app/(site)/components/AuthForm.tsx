"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";

import { BsGoogle, BsGithub } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    if (variant === "REGISTER") {
      //Axios Registration
      const response = await axios
        .post("/api/register", data)
        .catch((error) => {
          toast.error(error?.response?.data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((response) => {
          if (response?.error) {
            toast.error(response?.error);
          } else if (response?.ok) {
            toast.success("Login successful");
          }
        })
        .finally(() => {
          reset();
          setIsLoading(false);
        });
    }
  };

  const socialActions = (action: string) => {
    setIsLoading(true);
    signIn(action, { redirect: false })
      .then((response) => {
        if (response?.error) {
          toast.error(response?.error);
        } else if (response?.ok) {
          toast.success("Login successful");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="mt-6 sm:w-full sm:max-w-md sm:mx-auto">
      <div className="bg-white px-4 py-8 sm:rounded-lg sm:px-10 shadow">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              id="name"
              type="text"
              label="Name"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          )}
          <Input
            id="email"
            type="email"
            label="Email Address"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Input
            id="password"
            type="password"
            label="Password"
            register={register}
            errors={errors}
            disabled={isLoading}
          />

          <div>
            <Button type="submit" fullWidth disabled={isLoading}>
              {variant === "LOGIN" ? "Sign In" : "Register"}
            </Button>
          </div>
        </form>
        <div className="mt-6 ">
          <div className="relative ">
            <div className="absolute flex items-center inset-0">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or Continue with
              </span>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialActions("google")}
            />
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialActions("github")}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-center gap-2 px-2 text-gray-500 text-sm">
          <div>
            {variant === "LOGIN"
              ? "New to Messenger ?"
              : "Already have an account"}
          </div>
          <div className="cursor-pointer underline" onClick={toggleVariant}>
            {variant === "LOGIN" ? "Create a new account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
