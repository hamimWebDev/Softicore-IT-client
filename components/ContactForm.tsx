import { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const ContactForm = () => {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  });

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "");
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Subject validation
    if (!form.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (form.subject.trim().length < 5) {
      newErrors.subject = "Subject must be at least 5 characters";
    }

    // Message validation
    if (!form.message.trim()) {
      newErrors.message = "Message is required";
    } else if (form.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFocus = (field: string) => {
    setFocused(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: string) => {
    setFocused(prev => ({ ...prev, [field]: false }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const templateParams = {
        from_name: form.name.trim(),
        from_email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
        to_name: "Softicore IT Team",
      };

      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ""
      );

      if (response.status === 200) {
        setSubmitted(true);
        setForm({ name: "", email: "", subject: "", message: "" });
        setErrors({});
      }
    } catch (err) {
      console.error("EmailJS Error:", err);
      setErrors({ message: "Failed to send message. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setForm({ name: "", email: "", subject: "", message: "" });
    setErrors({});
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-3xl"></div>

      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-200 dark:bg-indigo-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700/30 p-8 md:p-10 lg:p-12 w-full max-w-2xl mx-auto">
        {submitted ? (
          <div className="text-center animate-fade-in">
            <div className="mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                Message Sent!
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed max-w-md mx-auto">
                Thank you for reaching out. We'll get back to you within 24 hours.
              </p>
            </div>
            <button
              onClick={resetForm}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Send Another Message
            </button>
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                Get In Touch
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg max-w-md mx-auto">
                Ready to start your next project? Let's discuss how we can help bring your vision to life.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name Field */}
              <div className="group">
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={`w-full px-6 py-5 text-gray-900 dark:text-white bg-white/70 dark:bg-gray-800/70 border-2 rounded-2xl focus:ring-4 transition-all duration-300 backdrop-blur-sm peer text-lg ${
                      errors.name 
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                        : focused.name 
                          ? 'border-blue-500 focus:border-blue-500 focus:ring-blue-500/20' 
                          : 'border-gray-200 dark:border-gray-600'
                    }`}
                    placeholder=" "
                    value={form.name}
                    onChange={handleChange}
                    onFocus={() => handleFocus('name')}
                    onBlur={() => handleBlur('name')}
                    required
                    autoComplete="name"
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  <label
                    htmlFor="name"
                    className={`absolute left-6 transition-all duration-300 pointer-events-none text-lg z-10
                      ${
                        focused.name || form.name
                          ? 'top-0 -translate-y-1/2 text-sm text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-900 px-2 py-0.5 rounded shadow-sm'
                          : 'top-5 text-gray-500 dark:text-gray-400 bg-transparent px-2'
                      }`
                    }
                    style={
                      focused.name || form.name
                        ? {
                            transform: 'translateY(-60%)',
                            left: '1.5rem',
                            paddingLeft: '0.5rem',
                            paddingRight: '0.5rem',
                            lineHeight: 1.2,
                          }
                        : {
                            left: '1.5rem',
                            paddingLeft: '0.5rem',
                            paddingRight: '0.5rem',
                            lineHeight: 1.2,
                          }
                    }
                  >
                    Full Name *
                  </label>
                  {errors.name && (
                    <div id="name-error" className="mt-2 text-red-600 dark:text-red-400 text-sm flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {errors.name}
                    </div>
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div className="group">
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`w-full px-6 py-5 text-gray-900 dark:text-white bg-white/70 dark:bg-gray-800/70 border-2 rounded-2xl focus:ring-4 transition-all duration-300 backdrop-blur-sm peer text-lg ${
                      errors.email 
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                        : focused.email 
                          ? 'border-blue-500 focus:border-blue-500 focus:ring-blue-500/20' 
                          : 'border-gray-200 dark:border-gray-600'
                    }`}
                    placeholder=" "
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={() => handleBlur('email')}
                    required
                    autoComplete="email"
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  <label
                    htmlFor="email"
                    className={`absolute left-6 transition-all duration-300 pointer-events-none text-lg z-10
                      ${
                        focused.email || form.email
                          ? 'top-0 -translate-y-1/2 text-sm text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-900 px-2 py-0.5 rounded shadow-sm'
                          : 'top-5 text-gray-500 dark:text-gray-400 bg-transparent px-2'
                      }`
                    }
                    style={
                      focused.email || form.email
                        ? {
                            transform: 'translateY(-60%)',
                            left: '1.5rem',
                            paddingLeft: '0.5rem',
                            paddingRight: '0.5rem',
                            lineHeight: 1.2,
                          }
                        : {
                            left: '1.5rem',
                            paddingLeft: '0.5rem',
                            paddingRight: '0.5rem',
                            lineHeight: 1.2,
                          }
                    }
                  >
                    Email Address *
                  </label>
                  {errors.email && (
                    <div id="email-error" className="mt-2 text-red-600 dark:text-red-400 text-sm flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {errors.email}
                    </div>
                  )}
                </div>
              </div>

              {/* Subject Field */}
              <div className="group">
                <div className="relative">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className={`w-full px-6 py-5 text-gray-900 dark:text-white bg-white/70 dark:bg-gray-800/70 border-2 rounded-2xl focus:ring-4 transition-all duration-300 backdrop-blur-sm peer text-lg ${
                      errors.subject 
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                        : focused.subject 
                          ? 'border-blue-500 focus:border-blue-500 focus:ring-blue-500/20' 
                          : 'border-gray-200 dark:border-gray-600'
                    }`}
                    placeholder=" "
                    value={form.subject}
                    onChange={handleChange}
                    onFocus={() => handleFocus('subject')}
                    onBlur={() => handleBlur('subject')}
                    required
                    aria-describedby={errors.subject ? "subject-error" : undefined}
                  />
                  <label
                    htmlFor="subject"
                    className={`absolute left-6 transition-all duration-300 pointer-events-none text-lg z-10
                      ${
                        focused.subject || form.subject
                          ? 'top-0 -translate-y-1/2 text-sm text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-900 px-2 py-0.5 rounded shadow-sm'
                          : 'top-5 text-gray-500 dark:text-gray-400 bg-transparent px-2'
                      }`
                    }
                    style={
                      focused.subject || form.subject
                        ? {
                            transform: 'translateY(-60%)',
                            left: '1.5rem',
                            paddingLeft: '0.5rem',
                            paddingRight: '0.5rem',
                            lineHeight: 1.2,
                          }
                        : {
                            left: '1.5rem',
                            paddingLeft: '0.5rem',
                            paddingRight: '0.5rem',
                            lineHeight: 1.2,
                          }
                    }
                  >
                    Subject *
                  </label>
                  {errors.subject && (
                    <div id="subject-error" className="mt-2 text-red-600 dark:text-red-400 text-sm flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {errors.subject}
                    </div>
                  )}
                </div>
              </div>

              {/* Message Field */}
              <div className="group">
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    className={`w-full px-6 py-5 text-gray-900 dark:text-white bg-white/70 dark:bg-gray-800/70 border-2 rounded-2xl focus:ring-4 transition-all duration-300 backdrop-blur-sm peer resize-none min-h-[140px] text-lg ${
                      errors.message 
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                        : focused.message 
                          ? 'border-blue-500 focus:border-blue-500 focus:ring-blue-500/20' 
                          : 'border-gray-200 dark:border-gray-600'
                    }`}
                    placeholder=" "
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => handleFocus('message')}
                    onBlur={() => handleBlur('message')}
                    required
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  <label
                    htmlFor="message"
                    className={`absolute left-6 transition-all duration-300 pointer-events-none text-lg z-10
                      ${
                        focused.message || form.message
                          ? 'top-0 -translate-y-1/2 text-sm text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-900 px-2 py-0.5 rounded shadow-sm'
                          : 'top-5 text-gray-500 dark:text-gray-400 bg-transparent px-2'
                      }`
                    }
                    style={
                      focused.message || form.message
                        ? {
                            transform: 'translateY(-60%)',
                            left: '1.5rem',
                            paddingLeft: '0.5rem',
                            paddingRight: '0.5rem',
                            lineHeight: 1.2,
                          }
                        : {
                            left: '1.5rem',
                            paddingLeft: '0.5rem',
                            paddingRight: '0.5rem',
                            lineHeight: 1.2,
                          }
                    }
                  >
                    Your Message *
                  </label>
                  {errors.message && (
                    <div id="message-error" className="mt-2 text-red-600 dark:text-red-400 text-sm flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {errors.message}
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-5 px-8 rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none text-lg"
                  disabled={loading}
                  aria-describedby="submit-status"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending Message...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-3">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      <span>Send Message</span>
                    </div>
                  )}
                </button>
                <div id="submit-status" className="sr-only" aria-live="polite">
                  {loading ? "Sending message..." : "Ready to send message"}
                </div>
              </div>
            </form>

            {/* Additional Info */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                * Required fields. We typically respond within 24 hours.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactForm;