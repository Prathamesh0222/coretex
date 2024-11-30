import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { BACKEND_URL } from "../config";

export const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  type FormValues = {
    username: string;
    password: string;
  };

  const onSubmit: SubmitHandler<FormValues> = (formData) => {
    fetch(`${BACKEND_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error while creating user");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data", data);
        return data;
      })
      .catch((error) => {
        console.error("Fetch without async error", error);
        throw error;
      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="w-full max-w-sm p-6 rounded-lg bg-white shadow-md border border-gray-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="flex justify-center text-2xl font-bold mb-2">
            Register
          </label>
          <h2 className="text-center mb-2">Enter the details to sign up</h2>
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
          <label className="font-semibold text-sm">Password</label>
          <Input
            type="password"
            {...register("password", {
              required: "Password field is required",
            })}
            placeholder="Password"
          />
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
              text="Submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
