import { useEffect } from "react";
import { motion } from "framer-motion";
import { NextPage } from "next";
import HeroSection from "@/components/HeroSection";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";
import HomeBlogs from "@/components/HomeBlogs";
import HomeProject from "./homeProject";
import FeaturesSection from "@/components/FeaturesSection";


const Home: NextPage = () => {

  return (
    <div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >

        <HeroSection />
        <FeaturesSection/>

        {/* Featured Projects Section */}
        <section className="py-20">
          <div className="container-custom">
            <AnimatedSection className="text-center mb-16">
              <div className="lg:py-10 mb-11 lg:mt-1 ">
                <div className="text-center">
                  <h3 className="text-4xl text-primary-500 ">
                    &lt; Projects /&gt;
                  </h3>
                  <h1 className="text-3xl mt-3 lg:text-5xl text-gray-900 dark:text-white font-bold lg:mt-5">
                    My Featured Projects
                  </h1>
                </div>
              </div>
            </AnimatedSection>
            <HomeProject />

          </div>
        </section>


        <HomeBlogs />

        {/* Skills Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container-custom">
            <AnimatedSection className="text-center mb-16">
              <div className="lg:py-10 mb-11 lg:mt-1 ">
                <div className="text-center">
                  <h3 className="text-4xl text-primary-500 ">
                    &lt; Expertise /&gt;
                  </h3>
                  <h1 className="text-3xl mt-3 lg:text-5xl text-gray-900 dark:text-white font-bold lg:mt-5">
                    My Technical Expertise
                  </h1>
                </div>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* Skill categories */}
              <AnimatedSection className="col-span-2 md:col-span-1" delay={0.1}>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm h-full">
                  <h3 className="text-xl font-semibold mb-4 text-primary-600 dark:text-primary-400">
                    Frontend
                  </h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>React.js & Next.js</li>
                    <li>TypeScript</li>
                    <li>Redux & Context API</li>
                    <li>Tailwind CSS</li>
                    <li>Framer Motion</li>
                  </ul>
                </div>
              </AnimatedSection>

              <AnimatedSection className="col-span-2 md:col-span-1" delay={0.2}>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm h-full">
                  <h3 className="text-xl font-semibold mb-4 text-secondary-600 dark:text-secondary-400">
                    Backend
                  </h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Node.js & Express</li>
                    <li>MongoDB & Mongoose</li>
                    <li>RESTful APIs</li>
                    <li>GraphQL</li>
                    <li>Authentication</li>
                  </ul>
                </div>
              </AnimatedSection>

              <AnimatedSection className="col-span-2 md:col-span-1" delay={0.3}>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm h-full">
                  <h3 className="text-xl font-semibold mb-4 text-accent-600 dark:text-accent-400">
                    Tools
                  </h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Git & GitHub</li>
                    <li>Docker</li>
                    <li>AWS & Vercel</li>
                    <li>Jest & Testing Library</li>
                    <li>CI/CD</li>
                  </ul>
                </div>
              </AnimatedSection>

              <AnimatedSection className="col-span-2 md:col-span-1" delay={0.4}>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm h-full">
                  <h3 className="text-xl font-semibold mb-4 text-success-500">
                    Other Skills
                  </h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>UI/UX Design</li>
                    <li>Responsive Design</li>
                    <li>Performance Optimization</li>
                    <li>SEO Best Practices</li>
                    <li>Agile Development</li>
                  </ul>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r  from-neutral-500 via-lime-500 to-purple-500 opacity-90 group-hover:opacity-100 transition-opacity text-white ">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto">
              <AnimatedSection>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Let's Work Together
                </h2>
                <p className="text-lg mb-8 text-white/90">
                  Have a project in mind? I'm currently available for freelance
                  work or collaboration. Let's build something amazing together!
                </p>
                <Link
                  href="/contact"
                  className="btn bg-white text-primary-700 hover:bg-gray-100"
                >
                  Get in Touch
                </Link>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </motion.div>
    </div>

  );
};

export default Home;
