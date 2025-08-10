import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AdminDashboardLayout from "@/components/AdminDashboardLayout";
import PrivateRoute from "@/pages/utils/PrivateRoute";
import { useCreateAdminMutation } from "@/redux/features/auth/authApi";

interface ICreateAdminForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const CreateAdminPage = () => {
  const [createAdmin, { isLoading, error }] = useCreateAdminMutation();
  const router = useRouter();

  const [form, setForm] = useState<ICreateAdminForm>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setPasswordError("");
    setShowPassword(false);
    setShowConfirmPassword(false);
    setFormKey(prev => prev + 1);
  };

  // Reset form when component mounts
  useEffect(() => {
    resetForm();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    
    // Clear password error when user starts typing
    if (e.target.name === 'password' || e.target.name === 'confirmPassword') {
      setPasswordError("");
    }
  };

  const validateForm = () => {
    // Check if passwords match
    if (form.password !== form.confirmPassword) {
      setPasswordError("Passwords do not match");
      return false;
    }

    // Check password strength
    if (form.password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return false;
    }

    // Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      alert("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      const adminData = {
        name: form.name,
        email: form.email,
        password: form.password,
        role: 'admin'
      };
      
      console.log('Creating admin with data:', adminData);
      
      const result = await createAdmin(adminData).unwrap();
      console.log('Admin creation result:', result);
      
      setSubmitted(true);
      resetForm();
      
      setTimeout(() => {
        setSubmitted(false);
        router.push('/dashboard');
      }, 2000);
    } catch (error) {
      console.error('Failed to create admin:', error);
      if (error && typeof error === 'object' && 'data' in error) {
        console.error('Error data:', (error as any).data);
        alert(`Failed to create admin: ${(error as any).data?.message || 'Unknown error'}`);
      } else {
        alert('Failed to create admin. Please try again.');
      }
    }
  };

  return (
    <AdminDashboardLayout>
      <PrivateRoute allowedRoles={["admin"]}>
        <div className="max-w-2xl mx-auto mt-10 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6">Create Admin User</h1>
          <form key={formKey} onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={form.name} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  placeholder="Enter full name"
                  required 
                />
              </div>
              
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  value={form.email} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  placeholder="admin@example.com"
                  required 
                />
              </div>
              
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"}
                    name="password" 
                    value={form.password} 
                    onChange={handleChange} 
                    className="w-full px-3 py-2 pr-10 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    placeholder="Enter password (min 6 characters)"
                    required 
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    {showPassword ? (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Confirm Password</label>
                <div className="relative">
                  <input 
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword" 
                    value={form.confirmPassword} 
                    onChange={handleChange} 
                    className="w-full px-3 py-2 pr-10 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    placeholder="Confirm password"
                    required 
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    {showConfirmPassword ? (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {passwordError && (
                  <p className="text-sm text-red-600 mt-1">{passwordError}</p>
                )}
              </div>
            </div>
            
            <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Important Notes:</h3>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <li>• The new admin will have full access to the dashboard</li>
                <li>• Password must be at least 6 characters long</li>
                <li>• Email must be unique and valid</li>
                <li>• The admin role will be automatically assigned</li>
              </ul>
            </div>
            
            <button 
              type="submit" 
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition w-full disabled:opacity-50 disabled:cursor-not-allowed" 
              disabled={isLoading}
            >
              {isLoading ? "Creating Admin..." : "Create Admin User"}
            </button>
            
            {!!error && (
              <div className="mt-4 text-red-600 font-semibold text-center">
                Error creating admin. Please try again.
              </div>
            )}
            
            {submitted && (
              <div className="mt-4 text-green-600 font-semibold text-center">
                Admin user created successfully!
              </div>
            )}
          </form>
        </div>
      </PrivateRoute>
    </AdminDashboardLayout>
  );
};

export default CreateAdminPage; 