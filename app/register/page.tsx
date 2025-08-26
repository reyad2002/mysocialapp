"use client";
import React, { useState } from "react";
import { Button, Checkbox, TextInput, Label, Radio } from "flowbite-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Snippet } from "next/font/google";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

// typeScript
type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  dateOfBirth: string;
  gender: "male" | "female";
};

// zod validation
const schema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Invalid Email Address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, { message: "Password must contain an uppercase letter" })
      .regex(/[a-z]/, { message: "Password must contain a lowercase letter" })
      .regex(/[0-9]/, { message: "Password must contain a number" })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain a special character",
      }),
    rePassword: z.string(),
    dateOfBirth: z.string().refine(
      (value) => {
        const selDate = new Date(value);
        const currDate = new Date();
        const age = currDate.getFullYear() - selDate.getFullYear();
        const hasBirthdayPassed =
          currDate.getMonth() > selDate.getMonth() ||
          (currDate.getMonth() === selDate.getMonth() &&
            currDate.getDate() >= selDate.getDate());
        const realAge = hasBirthdayPassed ? age : age - 1;
        return realAge >= 13;
      },
      { message: "Age must be greater than or equal to 13" }
    ),
    gender: z.enum(["male", "female"], {
      message: "Expected one of male or female",
    }),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "Passwords do not match",
  });

export default function RegisterPage() {
  const router = useRouter();
  const [apiError, setApiError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "male",
    },
    resolver: zodResolver(schema),
  });

  const handleForm = async (dataForm: RegisterFormValues) => {
    try {
      const res = await axios.post(
        "https://linked-posts.routemisr.com/users/signup",
        dataForm
      );

      if (res.data.message === "success") {
        setApiError("");
        router.push("/login");
      } else {
        console.error("❌ Error:", res.data.error || "Unknown error");
      }
    } catch (error: any) {
      // console.error("🚨 Axios Error:", error.response?.data || error.message);
      setApiError(error.response.data.error);
    }
  };

  // reusable field
  const Field = ({
    id,
    label,
    type,
    registerField,
    error,
  }: {
    id: string;
    label: string;
    type: string;
    registerField: any;
    error?: string;
  }) => (
    <div className="flex flex-col gap-1">
      <Label htmlFor={id}>{label}</Label>
      <TextInput id={id} type={type} shadow {...registerField} />
      <div className="min-h-[20px]">
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );

  return (
    <div className="  py-10 flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSubmit(handleForm)}
        className="flex flex-col w-full max-w-md p-6 rounded-2xl bg-gray-800 shadow-lg scale-90"
      >
        <h2 className="text-2xl font-bold text-center text-white mb-2">
          Register New Account
        </h2>
        {apiError && (
          <Alert color="failure" icon={HiInformationCircle}>
            <span className="font-medium">User already exist</span>
          </Alert>
        )}
        
        <Field
          id="name"
          label="Your Name"
          type="text"
          registerField={register("name")}
          error={errors.name?.message}
        />
        <Field
          id="email"
          label="Your Email"
          type="email"
          registerField={register("email")}
          error={errors.email?.message}
        />
        <Field
          id="password"
          label="Password"
          type="password"
          registerField={register("password")}
          error={errors.password?.message}
        />
        <Field
          id="rePassword"
          label="Repeat Password"
          type="password"
          registerField={register("rePassword")}
          error={errors.rePassword?.message}
        />
        <Field
          id="dateOfBirth"
          label="Date of Birth"
          type="date"
          registerField={register("dateOfBirth")}
          error={errors.dateOfBirth?.message}
        />

        {/* Gender */}
        <div className="flex flex-col gap-1">
          <Label>Gender</Label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-white">
              <Radio {...register("gender")} value="male" /> Male
            </label>
            <label className="flex items-center gap-2 text-white">
              <Radio {...register("gender")} value="female" /> Female
            </label>
          </div>
          <div className="min-h-[20px]">
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender.message}</p>
            )}
          </div>
        </div>

        {/* Terms */}
        <div className="flex items-center gap-2 text-sm text-white">
          <Checkbox id="agree" />
          <Label htmlFor="agree" className="flex">
            I agree with the&nbsp;
            <Link
              href="#"
              className="text-cyan-400 hover:underline dark:text-cyan-500"
            >
              terms and conditions
            </Link>
          </Label>
        </div>
        <p className="text-white mt-3">
          I already have account &nbsp;
          <Link
            href="/login"
            className="text-cyan-400 hover:underline dark:text-cyan-500"
          >
            Login
          </Link>
        </p>

        <Button type="submit" className="w-full mt-2">
          Register
        </Button>
      </form>
    </div>
  );
}
