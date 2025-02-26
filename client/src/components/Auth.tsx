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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-100">
      <div className="w-full max-w-md p-8 mx-4 rounded-2xl bg-gradient-to-b from-gray-800 to-gray-900 shadow-2xl border border-gray-700">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-gray-400">
            {isSignup ? "Join our community today" : "Sign in to continue"}
          </p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 block">Username</label>
            <div className="relative">
              <Input
                type="text"
                {...register("username", {
                  required: "Username field is required",
                })}
                placeholder="Enter your username"
               
              />
            </div>
            {errors.username && (
              <p className="text-red-400 text-xs mt-1">
                {errors.username.message}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 block">Password</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password field is required",
                })}
                placeholder="Enter your password"
                
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors duration-200"
              >
                {showPassword ? <EyeSlashIcon  /> : <EyeIcon  />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          
          <div className="pt-2">
            <Button
              fullWidth={true}
              variant="primary"
              text={
                mutation.isPending
                  ? isSignup
                    ? "Creating Account..."
                    : "Signing In..."
                  : isSignup
                    ? "Create Account"
                    : "Sign In"
              }
              disabled={mutation.isPending}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-900"
            />
          </div>
          
          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm">
              {isSignup ? "Already have an account? " : "Don't have an account? "}
              <a
                href={isSignup ? "/signin" : "/signup"}
                className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
              >
                {isSignup ? "Sign In" : "Create Account"}
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};