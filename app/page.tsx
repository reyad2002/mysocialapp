"use client";
import React, { useContext, useEffect } from "react";
import HomePage from "./_components/homePage/HomePage";
import { authContext } from "./authContext/authContext";
import { useRouter } from "next/navigation";
import ProtectedLayout from "./_components/ProtectedLayout/page";

const page = () => {
  // const { token, setToken } = useContext(authContext);
  // const router = useRouter();
  // const rToken =localStorage.getItem("token")
  // useEffect(() => {
  //   if (! rToken ) {
  //     router.push("/login");
  //   }
  // }, [rToken , router]);

  // if (!rToken) return null;
  // return <HomePage />;
  return (
    <div>
      <ProtectedLayout>
        <HomePage />
      </ProtectedLayout>
    </div>
  );
};

export default page;
