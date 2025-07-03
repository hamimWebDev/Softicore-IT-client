import { NextPage } from "next";
import { FiMapPin, FiMail, FiPhone, FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import ContactForm from "@/components/ContactForm";
import AnimatedSection from "@/components/AnimatedSection";
import Head from "next/head";
import Image from "next/image";

const Contact: NextPage = () => {
  return (
    <>
      <Head>
        <title>Contact Me | Portfolio</title>
        <meta name="description" content="Contact page for portfolio" />
      </Head>
      <section className="section bg-gray-900 min-h-screen flex flex-col justify-center items-center px-2 sm:px-4 mt-4">
        <div className="container-custom w-full">
          <AnimatedSection delay={0.1}>
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-3 gradient-text">Contact Me</h1>
            <p className="text-center text-gray-400 mb-8 md:mb-12 max-w-2xl mx-auto">
              Have a question or want to work together? Feel free to get in touch.
            </p>
          </AnimatedSection>
          <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16 justify-center items-stretch w-full">
            {/* Left Info Section */}
            <AnimatedSection delay={0.2} direction="right" className="flex-1 min-w-0 w-full max-w-full md:max-w-lg mx-auto lg:mx-0 mb-8 lg:mb-0">
              <div className="bg-gray-800/80 rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col h-full justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-white">Let's Connect</h2>
                  <p className="text-gray-400 mb-8">
                    I'm interested in freelance opportunities – especially ambitious or large projects. However, if you have any other requests or questions, don't hesitate to use the form or contact me directly.
                  </p>
                  <div className="space-y-6 mb-8">
                    <div className="flex items-start gap-4">
                      <span className="bg-primary-600/20 text-primary-400 p-3 rounded-xl">
                        <FiMapPin size={22} />
                      </span>
                      <div>
                        <div className="font-semibold text-white">Location</div>
                        <div className="text-gray-400 text-sm">San Francisco, CA</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <span className="bg-primary-600/20 text-primary-400 p-3 rounded-xl">
                        <FiMail size={22} />
                      </span>
                      <div>
                        <div className="font-semibold text-white">Email</div>
                        <div className="text-gray-400 text-sm">contact@example.com</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <span className="bg-primary-600/20 text-primary-400 p-3 rounded-xl">
                        <FiPhone size={22} />
                      </span>
                      <div>
                        <div className="font-semibold text-white">Phone</div>
                        <div className="text-gray-400 text-sm">+1 (555) 555-5555</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-white mb-2">Connect with me</div>
                    <div className="flex gap-4 flex-wrap">
                      <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="bg-gray-700 hover:bg-primary-600 text-white p-2 rounded-full transition-colors">
                        <FiGithub size={20} />
                      </a>
                      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-gray-700 hover:bg-primary-600 text-white p-2 rounded-full transition-colors">
                        <FiLinkedin size={20} />
                      </a>
                      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-gray-700 hover:bg-primary-600 text-white p-2 rounded-full transition-colors">
                        <FiTwitter size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            {/* Right Form Section */}
            <AnimatedSection delay={0.3} direction="left" className="flex-1 min-w-0 w-full max-w-full md:max-w-xl mx-auto lg:mx-0">
              <ContactForm />
            </AnimatedSection>
          </div>
          {/* Map Section */}
          <AnimatedSection delay={0.4} className="mt-10 md:mt-16 w-full">
            <div className="w-full max-w-full md:max-w-3xl lg:max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-xl border border-gray-700/40">
              <iframe
                title="San Francisco Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019019857726!2d-122.4194151846817!3d37.7749297797597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c7e3b6b0b%3A0x8c9e6e8e6e8e6e8e!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
                width="100%"
                height="260"
                className="min-h-[180px] sm:min-h-[220px] md:min-h-[260px] w-full"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default Contact;
