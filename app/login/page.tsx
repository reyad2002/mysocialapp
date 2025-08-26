"use client";
import React, { useContext, useState } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {authContext} from "../authContext/authContext";
type LoginFormValues = {
  email: string;
  password: string;
};


const schema = z.object({
  email: z.string().email({ message: "Email Not Valid" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

const Page = () => {
  
  const {token , setToken} = useContext(authContext);



  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const { register, handleSubmit , formState : {errors} } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const handelForm = async (data: LoginFormValues) => {
    // console.log("✅ Login Data:", data);
    try {
      const resData = await axios.post(
        "https://linked-posts.routemisr.com/users/signin",
        data
      );
      const response = resData.data;
      
      if (response.message === "success") {
        router.push("/");
      }
      if (response.token) {
        console.log(response.token);
        setToken(response.token);
        localStorage.setItem("token", response.token);
      }
    } catch (error: any) {
      console.log(error);
      setErrorMessage(error?.response?.data?.error || "An error occurred");
    }
  };

  return (
    <div className="h-[100vh]  bg-gray-900 ">
      <form
        onSubmit={handleSubmit(handelForm)}
        className="flex max-w-md flex-col gap-4 p-5 rounded-2xl bg-gray-800 relative top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]"
      >
        <div>
          {errorMessage && <p className="text-red-600">Account Not Found</p> }
          <div className="mb-2 block">
            <Label htmlFor="email1">Your Email</Label>
          </div>
          <TextInput
            id="email1"
            type="email"
            placeholder="name@flowbite.com"
            {...register("email", { required: true })}
          />
          {errors.email && <p className="text-red-600">{errors.email.message}</p> }
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1">Your Password</Label>
          </div>
          <TextInput
            id="password1"
            type="password"
            placeholder="********"
            {...register("password", { required: true })}
            />
            {errors.password && <p className="text-red-600">{errors.password.message}</p>}

        </div>

        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Remember me</Label>
        </div>

        <div className="flex items-center gap-2">
          <Label className="text-blue-300">
            <Link href="/register">Register Now</Link>
          </Label>
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default Page;
