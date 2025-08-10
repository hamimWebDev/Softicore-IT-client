"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";



const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  const user = auth?.user;
  console.log(user)
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  if (!user) return null;

  return <>{children}</>;
};

export default PrivateRoute;
