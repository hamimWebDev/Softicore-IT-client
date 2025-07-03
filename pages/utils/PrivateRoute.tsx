import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[]; // optional: কোন রোল অ্যাক্সেস পাবে
}

const PrivateRoute = ({ children, allowedRoles = ["admin"] }: PrivateRouteProps) => {
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      if (!user) {
        // 🔒 লগইন করা না থাকলে login page এ পাঠাও
        router.replace({ pathname: "/login", query: { from: router.asPath } });
      } else if (!allowedRoles.includes(user.role)) {
        // ❌ ইউজার রোল মেলে না → unauthorized page এ পাঠাও
        router.replace("/unauthorized");
      }
    }
  }, [user, allowedRoles, router, isClient]);

  if (!isClient || !user || !allowedRoles.includes(user.role)) {
    // Always render the same thing on server and client until auth is ready
    return <div>Loading...</div>;
  }

  // ✅ সব ঠিক থাকলে চাইল্ড রেন্ডার করো
  return <>{children}</>;
};

export default PrivateRoute;
