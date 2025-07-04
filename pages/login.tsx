import { useState } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import verifyToken from "../lib/verifyToken";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const Login = () => {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    let toastId: string | number = "";
    try {
      e.preventDefault();
      toastId = toast.loading("Logging in...");

      if (!email || !password) {
        toast.error("Please fill in all fields", { id: toastId });
        return;
      }

      const userInfo = { email, password };
      const res = await login(userInfo).unwrap();

      if (!res?.data?.accessToken) {
        throw new Error("Invalid credentials");
      }

      const user = await verifyToken(res?.data?.accessToken || "");
      dispatch(setUser({ user: user, token: res?.data?.accessToken || "" }));
      toast.success("Logged in successfully", { id: toastId });
      router.push("/dashboard");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message || "An unknown error occurred", { id: toastId });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <Card variant="glass" className="p-10">
          <div className="flex flex-col items-center gap-3">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center text-3xl font-extrabold gradient-text"
            >
              Sign in to your account
            </motion.h2>
            <div className="flex gap-4 mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEmail("admin@gmail.com");
                  setPassword("admin123456");
                }}
              >
                Admin Credentials
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEmail("user@gmail.com");
                  setPassword("user123457");
                }}
              >
                User Credentials
              </Button>
            </div>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-700 bg-gray-800/60 dark:bg-gray-800/60 placeholder-gray-400 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-700 bg-gray-800/60 dark:bg-gray-800/60 placeholder-gray-400 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm pr-10 transition-colors"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center mt-1 cursor-pointer"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-5 w-5 text-gray-400" />
                    ) : (
                      <FaEye className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-700 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-300"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  href="/register"
                  className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Create your account
                </Link>
              </div>
            </motion.div>

            <Button
              type="submit"
              loading={isLoading}
              className="w-full"
              size="lg"
            >
              Sign in
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
