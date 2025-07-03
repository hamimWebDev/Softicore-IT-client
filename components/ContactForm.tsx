import { useState, useEffect } from "react";

const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFocus = (field: string) => {
    setFocused({ ...focused, [field]: true });
  };

  const handleBlur = (field: string) => {
    setFocused({ ...focused, [field]: false });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 1200); // Simulate async
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-2xl"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-primary-200 dark:bg-primary-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-200 dark:bg-secondary-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent-200 dark:bg-accent-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/20 p-8 md:p-10 lg:p-12 w-full max-w-xl mx-auto">
        {submitted ? (
          <div className="text-center animate-fade-in">
            <div className="mb-6">
              <div className="w-16 h-16 bg-success-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-3">
                Thank you!
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                Your message has been sent successfully. I'll get back to you soon.
              </p>
            </div>
            <button
              className="btn btn-primary mt-6 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={() => setSubmitted(false)}
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-2">
                Get In Touch
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Let's start a conversation about your next project
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="group animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-4 text-gray-900 dark:text-white bg-white/50 dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 backdrop-blur-sm peer"
                    placeholder=" "
                    value={form.name}
                    onChange={handleChange}
                    onFocus={() => handleFocus('name')}
                    onBlur={() => handleBlur('name')}
                    required
                    autoComplete="name"
                  />
                  <label
                    htmlFor="name"
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                      focused.name || form.name
                        ? 'top-2 text-xs text-primary-600 dark:text-primary-400 bg-white dark:bg-gray-900 px-2'
                        : 'top-4 text-base text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    Full Name
                  </label>
                </div>
              </div>

              <div className="group animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-4 text-gray-900 dark:text-white bg-white/50 dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 backdrop-blur-sm peer"
                    placeholder=" "
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={() => handleBlur('email')}
                    required
                    autoComplete="email"
                  />
                  <label
                    htmlFor="email"
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                      focused.email || form.email
                        ? 'top-2 text-xs text-primary-600 dark:text-primary-400 bg-white dark:bg-gray-900 px-2'
                        : 'top-4 text-base text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    Email Address
                  </label>
                </div>
              </div>

              <div className="group animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <div className="relative">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-4 text-gray-900 dark:text-white bg-white/50 dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 backdrop-blur-sm peer"
                    placeholder=" "
                    value={form.subject}
                    onChange={handleChange}
                    onFocus={() => handleFocus('subject')}
                    onBlur={() => handleBlur('subject')}
                    required
                  />
                  <label
                    htmlFor="subject"
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                      focused.subject || form.subject
                        ? 'top-2 text-xs text-primary-600 dark:text-primary-400 bg-white dark:bg-gray-900 px-2'
                        : 'top-4 text-base text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    Subject
                  </label>
                </div>
              </div>

              <div className="group animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    className="w-full px-4 py-4 text-gray-900 dark:text-white bg-white/50 dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 backdrop-blur-sm peer resize-none min-h-[120px]"
                    placeholder=" "
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => handleFocus('message')}
                    onBlur={() => handleBlur('message')}
                    required
                  />
                  <label
                    htmlFor="message"
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                      focused.message || form.message
                        ? 'top-2 text-xs text-primary-600 dark:text-primary-400 bg-white dark:bg-gray-900 px-2'
                        : 'top-4 text-base text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    Your Message
                  </label>
                </div>
              </div>

              <div className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-semibold py-4 px-6 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending Message...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      <span>Send Message</span>
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
