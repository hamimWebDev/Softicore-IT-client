import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import Button from "@/components/ui/Button";

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>About Me | Portfolio</title>
        <meta name="description" content="Learn more about my journey, experience, and what drives me to create exceptional web applications." />
      </Head>
      <section className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 flex flex-col">
        {/* Hero Section */}
        <AnimatedSection direction="up" delay={0.1} className="section text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">About Me</h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Learn more about my journey, experience, and what drives me to create exceptional web applications.
          </p>
        </AnimatedSection>

        {/* Story Section */}
        <AnimatedSection direction="up" delay={0.2} className="section flex flex-col lg:flex-row items-center justify-center gap-12 container-custom">
          {/* Image */}
          <div className="w-full max-w-md flex-shrink-0 rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800">
            <Image
              src="/icon/profile_image.jpg"
              alt="Profile image"
              width={600}
              height={400}
              className="object-cover w-full h-full rounded-2xl"
              priority
            />
          </div>
          {/* Story Text */}
          <div className="flex-1 max-w-2xl text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">My Story</h2>
            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-4">
              I'm a passionate full-stack developer with a focus on the MERN stack (MongoDB, Express, React, Node.js). With over 5 years of experience in web development, I've had the opportunity to work on a wide range of projects from small business websites to complex web applications.
            </p>
            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-4">
              My journey in web development began when I was in college, where I discovered my passion for creating interactive and user-friendly web experiences. Since then, I've been constantly learning and improving my skills to stay up-to-date with the latest technologies and best practices.
            </p>
            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-8">
              What drives me is the opportunity to solve complex problems and create solutions that make a positive impact. I believe in clean code, user-centered design, and the power of technology to transform businesses and lives.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/projects" passHref legacyBehavior>
                <a><Button variant="primary" size="md">View My Work</Button></a>
              </Link>
              <Link href="/contact" passHref legacyBehavior>
                <a><Button variant="outline" size="md">Get in Touch</Button></a>
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
};

export default About;
