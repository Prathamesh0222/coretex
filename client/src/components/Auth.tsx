import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { EyeIcon } from "../icons/EyeIcon";
import { EyeSlashIcon } from "../icons/EyeSlashIcon";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type FormValues = {
  username: string;
  password: string;
};

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const authEndpoint = async (formData: FormValues, isSignup: boolean) => {
  const endpoint = isSignup ? "/signup" : "/signin";
  const response = await fetch(`${BACKEND_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error(`Error while ${isSignup ? "signing up" : "signing in"}`);
  }

  const data = await response.json();

  if (!isSignup && data.token) {
    localStorage.setItem("token", data.token);
  } else {
    throw new Error("Token not found in response");
  }
  return data;
};

export const Auth = ({ isSignup }: { isSignup: boolean }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const mutation = useMutation({
    mutationFn: (formData: FormValues) => authEndpoint(formData, isSignup),
    onSuccess: () => {
      if (isSignup) {
        toast.success("User signed up successfully!");
        navigate("/signin");
      } else {
        navigate("/dashboard");
        toast.success("User logged in successfully!", {
          theme: "dark",
        });
      }
    },
    onError: (error) => {
      console.error(
        `Error while ${isSignup ? "creating user" : "signing in"}`,
        error
      );
      toast.error(`Error while ${isSignup ? "creating user" : "signing in"}`, {
        theme: "dark",
      });
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    mutation.mutate(formData);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-dark-500 text-white">
      <div className="w-full max-w-sm p-8 rounded-xl bg-dark-400 shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="flex justify-center text-2xl font-bold mb-1">
            {isSignup ? "Register" : "Login"}
          </label>
          <p className="text-center mb-2">
            Enter the details to {isSignup ? "sign up" : "sign in"}
          </p>
          <label className="font-semibold text-sm">Username</label>
          <Input
            type="text"
            {...register("username", {
              required: "Username field is required",
            })}
            placeholder="Username"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
          <div className="relative">
            <label className="font-semibold text-sm">Password</label>
            <Input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password field is required",
              })}
              placeholder="Password"
            />
            <div className="absolute right-2 top-2 translate-y-8 transform">
              <button
                type="button"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
          <div className="mt-4">
            <Button
              fontWeight="md"
              fullWidth={true}
              variant="primary"
              text={
                mutation.isPending
                  ? isSignup
                    ? "Signing up..."
                    : "Signing in..."
                  : "Submit"
              }
              disabled={mutation.isPending}
            />
          </div>
          <h2 className="text-center mt-3 mb-2 text-sm">
            {isSignup ? "Already have an account? " : "Don't have an account? "}
            <a
              href={isSignup ? "/signin" : "/signup"}
              className="font-bold underline"
            >
              {isSignup ? "Signin" : "Signup"}
            </a>
          </h2>
        </form>
      </div>
    </div>
  );
};
