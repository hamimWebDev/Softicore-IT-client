import { NextPage } from "next";
import { FiMapPin, FiMail, FiPhone, FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import { NextSeo } from 'next-seo';
import Script from "next/script";
import ContactForm from "@/components/ContactForm";
import AnimatedSection from "@/components/AnimatedSection";
import { pageSEOConfigs, structuredData } from '@/lib/seo-config';

const Contact: NextPage = () => {
  return (
    <>
      <NextSeo
        title={pageSEOConfigs.contact.title}
        description={pageSEOConfigs.contact.description}
        canonical={pageSEOConfigs.contact.canonical}
        openGraph={pageSEOConfigs.contact.openGraph}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'contact web development, web development services, custom website development, e-commerce development, digital solutions',
          },
        ]}
      />

      {/* Structured Data for Contact Page */}
      <Script
        id="contact-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Contact Softicore IT',
            description: 'Get in touch with Softicore IT for professional web development services',
            url: 'https://softicoreit.com/contact',
            mainEntity: {
              '@type': 'Organization',
              name: 'Softicore IT',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+880-1234-567890',
                contactType: 'customer service',
                email: 'info@softicoreit.com',
                availableLanguage: 'English',
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Dhaka',
                addressCountry: 'Bangladesh',
              },
            },
          }),
        }}
      />

      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-gradient-to-r from-blue-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen flex flex-col justify-center items-center px-2 sm:px-4">
        <div className="container-custom w-full">
          <AnimatedSection delay={0.1}>
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-3 gradient-text">Contact Us</h1>
            <p className="text-center text-gray-400 mb-8 md:mb-12 max-w-2xl mx-auto">
              Ready to start your web development project? Get in touch with our expert team for a free consultation and quote.
            </p>
          </AnimatedSection>
          <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16 justify-center items-stretch w-full">
            {/* Left Info Section */}
            <AnimatedSection delay={0.2} direction="right" className="flex-1 min-w-0 w-full max-w-full md:max-w-lg mx-auto lg:mx-0 mb-8 lg:mb-0">
              <div className="bg-white dark:bg-gray-900/80 rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col h-full justify-between border border-gray-200 dark:border-gray-700">
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Let's Build Something Amazing</h2>
                  <p className="text-gray-400 mb-8">
                    Whether you need a custom website, e-commerce platform, or digital application, our team is here to help bring your vision to life. Contact us for a free consultation and project estimate.
                  </p>
                  <div className="space-y-6 mb-8">
                    <div className="flex items-start gap-4">
                      <span className="bg-primary-600/20 text-primary-400 p-3 rounded-xl">
                        <FiMapPin size={22} />
                      </span>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">Office Location</div>
                        <div className="text-gray-400 text-sm">Dhaka, Bangladesh</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <span className="bg-primary-600/20 text-primary-400 p-3 rounded-xl">
                        <FiMail size={22} />
                      </span>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">Email</div>
                        <div className="text-gray-400 text-sm">info@softicoreit.com</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <span className="bg-primary-600/20 text-primary-400 p-3 rounded-xl">
                        <FiPhone size={22} />
                      </span>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">Phone</div>
                        <div className="text-gray-400 text-sm">+880 1234-567890</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white mb-2">Follow Us</div>
                    <div className="flex gap-4 flex-wrap">
                      <a href="https://github.com/softicoreit" target="_blank" rel="noopener noreferrer" className="bg-gray-200 dark:bg-gray-700 hover:bg-primary-100 dark:hover:bg-primary-600 text-gray-900 dark:text-white p-2 rounded-full transition-colors">
                        <FiGithub size={20} />
                      </a>
                      <a href="https://linkedin.com/company/softicoreit" target="_blank" rel="noopener noreferrer" className="bg-gray-200 dark:bg-gray-700 hover:bg-primary-100 dark:hover:bg-primary-600 text-gray-900 dark:text-white p-2 rounded-full transition-colors">
                        <FiLinkedin size={20} />
                      </a>
                      <a href="https://twitter.com/softicoreit" target="_blank" rel="noopener noreferrer" className="bg-gray-200 dark:bg-gray-700 hover:bg-primary-100 dark:hover:bg-primary-600 text-gray-900 dark:text-white p-2 rounded-full transition-colors">
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
            <div className="w-full max-w-full md:max-w-3xl lg:max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700/40 bg-white dark:bg-gray-800/80">
              <iframe
                title="Dhaka, Bangladesh Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902442430136!2d90.3656286!3d23.7562021!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8a426199b0d%3A0x6a2c655d06c88e89!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
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
