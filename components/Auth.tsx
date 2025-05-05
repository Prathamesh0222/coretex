"use client";

import {
  SignInInput,
  SigninSchema,
  SignUpInput,
  SignupSchema,
} from "@/app/validators/auth.validator";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { Github } from "lucide-react";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ThemeToggle } from "./ThemeToggle";
import { CoretexLogo } from "./CortexLogo";

export const Auth = ({ isSignup }: { isSignup: boolean }) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const form = useForm<SignInInput | SignUpInput>({
    resolver: zodResolver(isSignup ? SignupSchema : SigninSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const signupMutation = useMutation({
    mutationFn: async (data: SignUpInput) => {
      const response = await axios.post("/api/register", data);
      if (!response.data) {
        throw new Error("Signup failed");
      }
      return response.data;
    },

    onSuccess: async (_, variables) => {
      const result = await signIn("credentials", {
        redirect: false,
        email: variables.email,
        password: variables.password,
      });

      if (result?.error) {
        console.error("Signin error:", result.error);
        throw new Error(result.error);
      }
      router.push("/dashboard");
      toast.success("Signup successful!");
    },

    onError: (error) => {
      console.error("Signup error", error);
      toast.error("Signup failed");
    },
  });

  const signinMutation = useMutation({
    mutationFn: async (data: SignInInput) => {
      const response = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if (response?.error) {
        throw new Error(response.error);
      }
    },
    onSuccess: () => {
      toast.success("Signin successful!");
      router.push("/dashboard");
    },

    onError: (error) => {
      toast.error("Signin failed!");
      console.error("Signin Failed", error);
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const handleSumit = (data: SignInInput | SignUpInput) => {
    if (isSignup) {
      signupMutation.mutate(data as SignUpInput);
    } else {
      signinMutation.mutate(data as SignInInput);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="grid lg:grid-cols-2 md:border p-5 md:p-6 lg:p-8 w-full max-w-6xl rounded-xl">
        <div className="space-y-5 md:mx-12 flex flex-col justify-center">
          <CoretexLogo />
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-semibold">
                {isSignup ? "Create an Account" : "Welcome Back"}
              </h1>
              <p className="text-muted-foreground">
                Fill the form to create account
              </p>
            </div>
            <ThemeToggle />
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSumit)}
              className="space-y-5"
            >
              {isSignup && (
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          className="py-5"
                          placeholder="John Doe"
                          type="string"
                          {...field}
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="py-5"
                        placeholder="john@example.com"
                        type="string"
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="*********"
                        className="py-5"
                        type="password"
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full font-semibold py-5">
                {isSignup ? "Sign up" : "Sign in"}
              </Button>
              <div className="w-full flex items-center mt-1 px-4">
                <div className="flex-grow border-t border-muted-foreground"></div>
                <span className="mx-4 text-muted-foreground text-sm">or</span>
                <div className="flex-grow border-t border-muted-foreground"></div>
              </div>
            </form>
          </Form>
          <div className="flex gap-2 w-full">
            <Button
              onClick={() => {
                signIn("google", { callbackUrl: "/dashboard" });
              }}
              variant={"outline"}
              className="w-[49%] py-5"
            >
              <span className="flex gap-2 justify-center items-center font-semibold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  ></path>
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  ></path>
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                </svg>
                Google
              </span>
            </Button>
            <Button
              onClick={() => {
                signIn("github", { callbackUrl: "/dashboard" });
              }}
              variant={"outline"}
              className="w-[49%] py-5"
            >
              <span className="flex gap-2 justify-center items-center font-semibold">
                <Github />
                Github
              </span>
            </Button>
          </div>
          <div className="flex justify-center gap-2">
            <p>
              {isSignup ? "Already have an Account?" : "Don't have an account?"}
            </p>
            <a
              className="underline font-semibold"
              href={isSignup ? "/signin" : "signup"}
            >
              {isSignup ? "Signin" : "Signup"}
            </a>
          </div>
        </div>
        <div>
          <div className="bg-[url('/sample/Second_Brain-Light.jpg')] dark:bg-[url('/sample/Second_Brain_Dark.jpg')] h-[600px] w-full bg-cover bg-center rounded-xl lg:block hidden"></div>
        </div>
      </div>
    </div>
  );
};
