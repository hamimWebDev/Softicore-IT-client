import { NextPage } from "next";
import { NextSeo } from 'next-seo';
import Script from "next/script";
import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import Button from "@/components/ui/Button";
import { pageSEOConfigs, structuredData } from '@/lib/seo-config';

const companyStats = [
  { label: "Years Experience", value: "5+ Years" },
  { label: "Projects Delivered", value: "150+ Projects" },
  { label: "Happy Clients", value: "80+ Clients" },
  { label: "Team Members", value: "15+ Experts" },
];

const coreValues = [
  {
    title: "Innovation",
    description: "We stay ahead of technology trends to deliver cutting-edge solutions.",
    icon: "🚀"
  },
  {
    title: "Quality",
    description: "Every line of code is crafted with precision and attention to detail.",
    icon: "✨"
  },
  {
    title: "Collaboration",
    description: "We work closely with clients to ensure their vision becomes reality.",
    icon: "🤝"
  },
  {
    title: "Reliability",
    description: "Consistent delivery and ongoing support for all our projects.",
    icon: "🛡️"
  }
];

const About: NextPage = () => {
  return (
    <>
      <NextSeo
        title={pageSEOConfigs.about.title}
        description={pageSEOConfigs.about.description}
        canonical={pageSEOConfigs.about.canonical}
        openGraph={pageSEOConfigs.about.openGraph}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'about Softicore IT, web development agency, custom websites, e-commerce solutions, digital transformation, software development company',
          },
        ]}
      />

      {/* Structured Data for About Page */}
      <Script
        id="about-organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            ...structuredData.organization,
            foundingDate: '2019',
            numberOfEmployees: '15',
            award: [
              'Top Web Development Agency 2023',
              'Best E-commerce Solutions Provider'
            ],
          }),
        }}
      />

      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Hero Section */}
        <section className="pt-28 pb-16 text-gray-900 dark:text-white">
          <div className="container-custom mx-auto px-4 text-center">
            <AnimatedSection>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                About <span className="text-blue-600 dark:text-yellow-200">Softicore IT</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 dark:text-blue-200 max-w-3xl mx-auto">
                Transforming ideas into powerful digital experiences through innovative web development solutions.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Company Story Section */}
        <section className="py-16 container-custom mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Company Image */}
            <AnimatedSection className="flex justify-center lg:justify-start">
              <div className="relative">
                <div className="w-80 h-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-center">
                  <Image
                    src="/icon/icon.png"
                    alt="Softicore IT Logo"
                    width={320}
                    height={320}
                    className="object-contain w-full h-full p-8"
                    priority
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-2xl">💻</span>
                </div>
              </div>
            </AnimatedSection>

            {/* Company Story */}
            <AnimatedSection className="flex flex-col gap-6">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                Our Story
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Founded in 2019, Softicore IT has grown from a small startup to a trusted web development partner for businesses worldwide. We specialize in creating modern, scalable web applications that drive business growth and enhance user experiences.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Our team of passionate developers, designers, and strategists work together to deliver innovative solutions that meet the unique needs of each client. From e-commerce platforms to enterprise applications, we've successfully delivered over 150 projects across various industries.
              </p>
              
              {/* Company Stats */}
              <div className="grid grid-cols-2 gap-4 my-6">
                {companyStats.map((stat) => (
                  <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg text-center border border-gray-200 dark:border-gray-700">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mt-4">
                <Link href="/projects" passHref legacyBehavior>
                  <a><Button variant="primary" size="lg">View Our Work</Button></a>
                </Link>
                <Link href="/contact" passHref legacyBehavior>
                  <a><Button variant="outline" size="lg">Get Free Quote</Button></a>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container-custom mx-auto px-4">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                Our Core Values
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                These principles guide everything we do and ensure we deliver exceptional results for our clients.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValues.map((value, index) => (
                <AnimatedSection key={value.title} className="group">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-600">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-16 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
          <div className="container-custom mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <AnimatedSection>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Our Mission</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    To empower businesses with innovative web solutions that drive growth, enhance user experiences, and create lasting digital impact in an ever-evolving technological landscape.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="text-4xl mb-4">🔮</div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Our Vision</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    To be the leading web development agency that sets industry standards for innovation, quality, and client success, while fostering a culture of continuous learning and technological advancement.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container-custom mx-auto px-4">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                Meet Our Team
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Our diverse team of experts brings together years of experience in web development, design, and digital strategy.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <AnimatedSection className="group">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-600">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg">
                    <Image
                      src="/icon/profile_image.jpg"
                      alt="Team Member"
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Md. Hamim</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">Lead Developer</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Full-stack developer with expertise in modern web technologies and cloud solutions.
                  </p>
                </div>
              </AnimatedSection>

              {/* Team Member 2 */}
              <AnimatedSection className="group">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-600">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">UI</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">UI/UX Designer</h3>
                  <p className="text-purple-600 dark:text-purple-400 font-medium mb-3">Creative Designer</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Passionate about creating intuitive and beautiful user experiences that delight users.
                  </p>
                </div>
              </AnimatedSection>

              {/* Team Member 3 */}
              <AnimatedSection className="group">
                <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-600">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg bg-gradient-to-br from-green-400 to-blue-400 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">DEV</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Backend Developer</h3>
                  <p className="text-green-600 dark:text-green-400 font-medium mb-3">System Architect</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Expert in building scalable backend systems and database architecture.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-800 dark:via-purple-800 dark:to-indigo-800 text-white">
          <div className="container-custom mx-auto px-4 text-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Start Your Project?
              </h2>
              <p className="text-xl text-blue-100 dark:text-blue-200 mb-8 max-w-2xl mx-auto">
                Let's discuss how we can help bring your vision to life with our innovative web development solutions.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact" passHref legacyBehavior>
                  <a><Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 dark:hover:bg-white dark:hover:text-blue-600">Get Started</Button></a>
                </Link>
                <Link href="/projects" passHref legacyBehavior>
                  <a><Button variant="ghost" size="lg" className="text-white hover:bg-white/20">View Portfolio</Button></a>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
