import { NextPage } from "next";
import { NextSeo } from 'next-seo';
import Script from "next/script";
import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import Button from "@/components/ui/Button";
import { pageSEOConfigs, structuredData } from '@/lib/seo-config';
import { useGetAllTeamMembersQuery } from "@/redux/features/team/teamApi";
import { ITeam } from "@/types/team.types";

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
  const { data: teamMembers, isLoading, isError } = useGetAllTeamMembersQuery(undefined);
  
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
        <section className="py-16  container-custom mx-auto px-4">
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
                    className="object-contain w-full h-auto p-8"
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
        <section className="py-16  bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
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
        <section className="py-16  bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
          <div className="container-custom mx-auto px-4">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                Meet Our Team
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Our diverse team of experts brings together years of experience in web development, design, and digital strategy.
              </p>
            </AnimatedSection>

            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : isError ? (
              <div className="text-center py-20">
                <p className="text-red-600 dark:text-red-400 text-lg">
                  Error loading team members. Please try again later.
                </p>
              </div>
            ) : teamMembers && Array.isArray(teamMembers) && teamMembers.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {teamMembers.slice(0, 6).map((member: ITeam, index: number) => (
                    <AnimatedSection key={index} className="group">
                      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-600">
                        <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg">
                          <Image
                            src={member.image || "/icon/profile_image.jpg"}
                            alt={member.name}
                            width={96}
                            height={96}
                            className="object-cover w-full h-auto"
                            onError={(e) => {
                              e.currentTarget.src = "/icon/profile_image.jpg";
                            }}
                          />
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{member.name}</h3>
                        <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">{member.position}</p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                          {member.email}
                        </p>
                        
                        {/* Social Links */}
                        <div className="flex justify-center space-x-3">
                          {member.facebook && (
                            <a
                              href={member.facebook}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                              </svg>
                            </a>
                          )}
                          {member.linkedin && (
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                              </svg>
                            </a>
                          )}
                          {member.github && (
                            <a
                              href={member.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 transition-colors duration-300"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
                
                {/* View All Team Members Button */}
                {teamMembers && Array.isArray(teamMembers) && teamMembers.length > 6 && (
                  <div className="text-center mt-8">
                    <Link href="/our-team" passHref legacyBehavior>
                      <a><Button variant="outline" size="lg">View All Team Members</Button></a>
                    </Link>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">👥</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  No team members available
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our team information will be available soon.
                </p>
              </div>
            )}
          </div>
        </section>

      </div>
    </>
  );
};

export default About;
