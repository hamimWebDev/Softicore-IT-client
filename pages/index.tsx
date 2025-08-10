import { useEffect } from "react";
import { motion } from "framer-motion";
import { NextPage } from "next";
import { NextSeo } from 'next-seo';
import Script from "next/script";
import HeroSection from "@/components/HeroSection";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";
import HomeBlogs from "@/components/HomeBlogs";
import HomeProject from "./homeProject";
import MarketingScetion from "@/components/MarketingScetion";
import FeaturesSection from "@/components/FeaturesSection";
import FaqSection from "@/components/FaqSection";
import ExpertiesSection from "@/components/ExpertiesSection";
import { pageSEOConfigs, structuredData } from '@/lib/seo-config';
import ChatUi from "@/components/ui/ChatUi";

const Home: NextPage = () => {

  return (
    <>
      <NextSeo
        title={pageSEOConfigs.home.title}
        description={pageSEOConfigs.home.description}
        canonical={pageSEOConfigs.home.canonical}
        openGraph={pageSEOConfigs.home.openGraph}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'web development, custom websites, e-commerce development, digital solutions, software development, web design, frontend development, backend development, React development, Node.js development, MongoDB, responsive design, SEO optimization',
          },
        ]}
      />
      
      {/* Structured Data */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.organization),
        }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.website),
        }}
      />
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.localBusiness),
        }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.faq),
        }}
      />

      <div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <HeroSection />
          <FeaturesSection />
          <MarketingScetion />
          <FaqSection />
          <HomeProject />
          <HomeBlogs />
          <ExpertiesSection />

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-r  from-neutral-500 via-lime-500 to-purple-500 opacity-90 group-hover:opacity-100 transition-opacity text-white ">
            <div className="container-custom">
              <div className="text-center max-w-3xl mx-auto">
                <AnimatedSection>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Ready to Transform Your Business?
                  </h2>
                  <p className="text-lg mb-8 text-white/90">
                    Let's discuss your project and create a custom web solution that drives results. Our expert team is ready to bring your vision to life.
                  </p>
                  <Link
                    href="/contact"
                    className="btn bg-white text-primary-700 hover:bg-gray-100"
                  >
                    Start Your Project
                  </Link>
                </AnimatedSection>
              </div>
            </div>
          </section>

          {/* Floating Chat Widget */}
          <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 50 }}>
            <ChatUi />
            
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Home;
