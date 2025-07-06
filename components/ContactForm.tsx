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
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl sm:rounded-3xl"></div>

      {/* Animated background elements - smaller on mobile */}
      <div className="absolute top-0 left-0 w-20 h-20 sm:w-40 sm:h-40 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute top-0 right-0 w-20 h-20 sm:w-40 sm:h-40 bg-indigo-200 dark:bg-indigo-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-0 left-0 w-20 h-20 sm:w-40 sm:h-40 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700/30 p-4 sm:p-6 md:p-8 lg:p-8 xl:p-10 w-full max-w-xl lg:max-w-2xl mx-auto">
        {submitted ? (
          <div className="text-center animate-fade-in">
            <div className="mb-6 sm:mb-8 lg:mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-16 lg:h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 lg:mb-4 animate-bounce">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3 sm:mb-4 lg:mb-3">
                Message Sent!
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg lg:text-base leading-relaxed max-w-md mx-auto px-2">
                Thank you for reaching out. We'll get back to you within 24 hours.
              </p>
            </div>
            <button
              onClick={resetForm}
              className="inline-flex items-center px-6 sm:px-8 lg:px-6 py-3 sm:py-4 lg:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base lg:text-sm"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-4 lg:h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Send Another Message
            </button>
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-6 xl:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3 sm:mb-4 lg:mb-3">
                Get In Touch
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg lg:text-base max-w-md mx-auto px-2">
                Ready to start your next project? Let's discuss how we can help bring your vision to life.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 lg:space-y-6 xl:space-y-7">
              {/* Name Field */}
              <div className="group">
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={`w-full px-4 sm:px-6 lg:px-5 py-4 sm:py-5 lg:py-4 text-gray-900 dark:text-white bg-white/70 dark:bg-gray-800/70 border-2 rounded-xl sm:rounded-2xl focus:ring-4 transition-all duration-300 backdrop-blur-sm peer text-base sm:text-lg lg:text-base ${errors.name
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
                    className={`absolute left-4 sm:left-6 lg:left-5 transition-all duration-300 pointer-events-none text-base sm:text-lg lg:text-base z-10
                      ${focused.name || form.name
                        ? 'top-0 -translate-y-1/2 text-xs sm:text-sm text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-900 px-2 py-0.5 rounded shadow-sm'
                        : 'top-4 sm:top-5 lg:top-4 text-gray-500 dark:text-gray-400 bg-transparent px-2'
                      }`
                    }
                    style={
                      focused.name || form.name
                        ? {
                          transform: 'translateY(-60%)',
                          left: '1rem',
                          paddingLeft: '0.5rem',
                          paddingRight: '0.5rem',
                          lineHeight: 1.2,
                        }
                        : {
                          left: '1rem',
                          paddingLeft: '0.5rem',
                          paddingRight: '0.5rem',
                          lineHeight: 1.2,
                        }
                    }
                  >
                    Full Name *
                  </label>
                  {errors.name && (
                    <div id="name-error" className="mt-2 text-red-600 dark:text-red-400 text-xs sm:text-sm flex items-center">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    className={`w-full px-4 sm:px-6 lg:px-5 py-4 sm:py-5 lg:py-4 text-gray-900 dark:text-white bg-white/70 dark:bg-gray-800/70 border-2 rounded-xl sm:rounded-2xl focus:ring-4 transition-all duration-300 backdrop-blur-sm peer text-base sm:text-lg lg:text-base ${errors.email
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
                    className={`absolute left-4 sm:left-6 lg:left-5 transition-all duration-300 pointer-events-none text-base sm:text-lg lg:text-base z-10
                      ${focused.email || form.email
                        ? 'top-0 -translate-y-1/2 text-xs sm:text-sm text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-900 px-2 py-0.5 rounded shadow-sm'
                        : 'top-4 sm:top-5 lg:top-4 text-gray-500 dark:text-gray-400 bg-transparent px-2'
                      }`
                    }
                    style={
                      focused.email || form.email
                        ? {
                          transform: 'translateY(-60%)',
                          left: '1rem',
                          paddingLeft: '0.5rem',
                          paddingRight: '0.5rem',
                          lineHeight: 1.2,
                        }
                        : {
                          left: '1rem',
                          paddingLeft: '0.5rem',
                          paddingRight: '0.5rem',
                          lineHeight: 1.2,
                        }
                    }
                  >
                    Email Address *
                  </label>
                  {errors.email && (
                    <div id="email-error" className="mt-2 text-red-600 dark:text-red-400 text-xs sm:text-sm flex items-center">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    className={`w-full px-4 sm:px-6 lg:px-5 py-4 sm:py-5 lg:py-4 text-gray-900 dark:text-white bg-white/70 dark:bg-gray-800/70 border-2 rounded-xl sm:rounded-2xl focus:ring-4 transition-all duration-300 backdrop-blur-sm peer text-base sm:text-lg lg:text-base ${errors.subject
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
                    className={`absolute left-4 sm:left-6 lg:left-5 transition-all duration-300 pointer-events-none text-base sm:text-lg lg:text-base z-10
                      ${focused.subject || form.subject
                        ? 'top-0 -translate-y-1/2 text-xs sm:text-sm text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-900 px-2 py-0.5 rounded shadow-sm'
                        : 'top-4 sm:top-5 lg:top-4 text-gray-500 dark:text-gray-400 bg-transparent px-2'
                      }`
                    }
                    style={
                      focused.subject || form.subject
                        ? {
                          transform: 'translateY(-60%)',
                          left: '1rem',
                          paddingLeft: '0.5rem',
                          paddingRight: '0.5rem',
                          lineHeight: 1.2,
                        }
                        : {
                          left: '1rem',
                          paddingLeft: '0.5rem',
                          paddingRight: '0.5rem',
                          lineHeight: 1.2,
                        }
                    }
                  >
                    Subject *
                  </label>
                  {errors.subject && (
                    <div id="subject-error" className="mt-2 text-red-600 dark:text-red-400 text-xs sm:text-sm flex items-center">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    className={`w-full px-4 sm:px-6 lg:px-5 py-4 sm:py-5 lg:py-4 text-gray-900 dark:text-white bg-white/70 dark:bg-gray-800/70 border-2 rounded-xl sm:rounded-2xl focus:ring-4 transition-all duration-300 backdrop-blur-sm peer resize-none min-h-[120px] sm:min-h-[140px] lg:min-h-[120px] xl:min-h-[130px] text-base sm:text-lg lg:text-base ${errors.message
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
                    className={`absolute left-4 sm:left-6 lg:left-5 transition-all duration-300 pointer-events-none text-base sm:text-lg lg:text-base z-10
                      ${focused.message || form.message
                        ? 'top-0 -translate-y-1/2 text-xs sm:text-sm text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-900 px-2 py-0.5 rounded shadow-sm'
                        : 'top-4 sm:top-5 lg:top-4 text-gray-500 dark:text-gray-400 bg-transparent px-2'
                      }`
                    }
                    style={
                      focused.message || form.message
                        ? {
                          transform: 'translateY(-60%)',
                          left: '1rem',
                          paddingLeft: '0.5rem',
                          paddingRight: '0.5rem',
                          lineHeight: 1.2,
                        }
                        : {
                          left: '1rem',
                          paddingLeft: '0.5rem',
                          paddingRight: '0.5rem',
                          lineHeight: 1.2,
                        }
                    }
                  >
                    Your Message *
                  </label>
                  {errors.message && (
                    <div id="message-error" className="mt-2 text-red-600 dark:text-red-400 text-xs sm:text-sm flex items-center">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {errors.message}
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2 sm:pt-4 lg:pt-3">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 sm:py-5 lg:py-4 px-6 sm:px-8 lg:px-6 rounded-xl sm:rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none text-base sm:text-lg lg:text-base"
                  disabled={loading}
                  aria-describedby="submit-status"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2 sm:space-x-3 lg:space-x-2">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-5 lg:h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-sm sm:text-base lg:text-sm">Sending Message...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2 sm:space-x-3 lg:space-x-2">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      <span className="text-sm sm:text-base lg:text-sm">Send Message</span>
                    </div>
                  )}
                </button>
                <div id="submit-status" className="sr-only" aria-live="polite">
                  {loading ? "Sending message..." : "Ready to send message"}
                </div>
              </div>
            </form>

            {/* Additional Info */}
            <div className="mt-6 sm:mt-8 lg:mt-6 xl:mt-7 text-center">
              <p className="text-xs sm:text-sm lg:text-xs text-gray-500 dark:text-gray-400 px-2">
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