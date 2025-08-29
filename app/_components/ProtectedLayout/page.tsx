"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authContext } from "../../authContext/authContext";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token } = useContext(authContext);
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    }
  }, [token, router]);

  return <>{children}</>;
}
