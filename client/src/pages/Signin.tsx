import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { BACKEND_URL } from "../config";
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

const signupEnpoint = async (formData: FormValues) => {
  const response = await fetch(`${BACKEND_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Error whiles creating user");
  }

  const data = await response.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
  } else {
    throw new Error("Token not found in response");
  }
  return data;
};

export const Signin = () => {
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
    mutationFn: signupEnpoint,
    onSuccess: () => {
      navigate("/dashboard");
      toast.success("User logged in successfully!");
    },
    onError: (error) => {
      console.error("Error while creating user", error);
      toast.error("Error while signing in");
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    mutation.mutate(formData);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-dark-500 text-white">
      <div className="w-full max-w-sm p-6 rounded-lg bg-dark-400 shadow-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="flex justify-center text-2xl font-bold mb-2">
            Login
          </label>
          <h2 className="text-center mb-2">Enter the details to sign in</h2>
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
              text={mutation.isPending ? "Signing up..." : "Submit"}
              disabled={mutation.isPending}
            />
          </div>
          <h2 className="text-center mt-3">
            Don't have an Account?{" "}
            <a href="/signup" className="font-bold underline">
              Signup
            </a>
          </h2>
        </form>
      </div>
    </div>
  );
};
