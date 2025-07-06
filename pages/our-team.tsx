"use client"

import { useEffect, useState } from "react";
import { NextPage } from "next";
import { motion, AnimatePresence } from "framer-motion";
import { NextSeo } from 'next-seo';
import Script from "next/script";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useGetAllTeamMembersQuery } from "@/redux/features/team/teamApi";

const OurTeam: NextPage = () => {
  const { data: teamMembers, isLoading, isError } = useGetAllTeamMembersQuery(undefined);
  const [visibleItems, setVisibleItems] = useState(8);
  const [teamList, setTeamList] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTeam, setFilteredTeam] = useState<any[]>([]);

  useEffect(() => {
    if (Array.isArray(teamMembers)) {
      setTeamList(teamMembers);
      setFilteredTeam(teamMembers);
    }
  }, [teamMembers]);

  // Search functionality
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredTeam(teamList);
      setVisibleItems(8);
      return;
    }

    const filtered = teamList.filter((member) => {
      const searchLower = searchTerm.toLowerCase();
      const nameMatch = member.name?.toLowerCase().includes(searchLower);
      const positionMatch = member.position?.toLowerCase().includes(searchLower);
      const emailMatch = member.email?.toLowerCase().includes(searchLower);

      return nameMatch || positionMatch || emailMatch;
    });

    setFilteredTeam(filtered);
    setVisibleItems(8); // Reset visible items when searching
  }, [searchTerm, teamList]);

  // Load more handler
  const loadMoreItem = () => {
    setVisibleItems((prev) => prev + 4);
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <>
      <NextSeo
        title="Our Team - Web Development Portfolio"
        description="Meet the talented team behind Softicore IT. Our skilled professionals are dedicated to delivering exceptional web development solutions and digital experiences."
        canonical="https://softicoreit.com/our-team"
        openGraph={{
          title: "Our Team | Softicore IT - Web Development Portfolio",
          description: "Meet the talented team behind Softicore IT. Our skilled professionals are dedicated to delivering exceptional web development solutions and digital experiences.",
          url: "https://softicoreit.com/our-team",
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'web development team, software developers, UI/UX designers, project managers, development team, tech professionals',
          },
        ]}
      />

      {/* Structured Data for Team */}
      <Script
        id="team-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Softicore IT Team',
            description: 'Our talented team of web development professionals',
            url: 'https://softicoreit.com/our-team',
            numberOfItems: teamList.length,
            itemListElement: teamList.slice(0, 10).map((member, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'Person',
                name: member.name,
                jobTitle: member.position,
                email: member.email,
                image: member.image,
                sameAs: [
                  member.facebook,
                  member.linkedin,
                  member.github
                ].filter(Boolean),
              },
            })),
          }),
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <section className="pt-32 pb-8 md:pt-40 md:pb-12 bg-gradient-to-r from-blue-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Our Team
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                Meet the amazing people behind our company's success.
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <div className="relative">
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="text"
                    placeholder="Search team members by name, position, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 text-lg border-2 border-gray-200 dark:border-gray-600 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-300"
                  />
                  {searchTerm && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                    >
                      <FaTimes className="text-lg" />
                    </button>
                  )}
                </div>
                
                {/* Search Results Info */}
                {searchTerm && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 text-center"
                  >
                    <p className="text-gray-600 dark:text-gray-400">
                      Found {filteredTeam.length} result{filteredTeam.length !== 1 ? 's' : ''} for "{searchTerm}"
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-8 bg-gradient-to-r from-blue-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="container-custom">
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
            ) : filteredTeam.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">👥</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  No team members found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {searchTerm 
                    ? `No team members match your search for "${searchTerm}". Try different keywords.`
                    : "No team members available at the moment."
                  }
                </p>
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <AnimatePresence>
                    {filteredTeam.slice(0, visibleItems).map((member, index) => (
                      <motion.div
                        key={member._id || index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden border border-white/20 dark:border-gray-700/50"
                      >
                        {/* Elegant Background Pattern */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-pink-900/10"></div>
                        
                        {/* Image Section */}
                        <div className="relative h-56 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10"></div>
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            onError={(e) => {
                              e.currentTarget.src = "/icon/profile_image.jpg";
                            }}
                          />
                          
                          {/* Team Member Badge */}
                          <div className="absolute top-4 right-4 z-20">
                            <div className="px-3 py-1.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg">
                              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                                Team Member
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Content Section */}
                        <div className="relative p-6">
                          {/* Member Name with Elegant Typography */}
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                            {member.name}
                          </h3>
                          
                          {/* Position with Beautiful Styling */}
                          <p className="text-blue-600 dark:text-blue-400 font-semibold mb-3 text-sm uppercase tracking-wide">
                            {member.position}
                          </p>
                          
                          {/* Email with Icon */}
                          <div className="flex items-center mb-5 text-gray-600 dark:text-gray-300 text-sm">
                            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="truncate">{member.email}</span>
                          </div>

                          {/* Elegant Divider */}
                          <div className="flex items-center mb-5">
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
                            <div className="mx-3 w-2 h-2 bg-blue-500 rounded-full"></div>
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
                          </div>

                          {/* Social Media Links */}
                          <div className="flex justify-center space-x-4">
                            {member.facebook && (
                              <a
                                href={member.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/social p-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-full text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-110"
                              >
                                <svg className="w-4 h-4 transition-transform duration-300 group-hover/social:rotate-12" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                              </a>
                            )}
                            {member.linkedin && (
                              <a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/social p-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-full text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/25 transform hover:scale-110"
                              >
                                <svg className="w-4 h-4 transition-transform duration-300 group-hover/social:rotate-12" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                              </a>
                            )}
                            {member.github && (
                              <a
                                href={member.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/social p-2.5 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 rounded-full text-white transition-all duration-300 hover:shadow-lg hover:shadow-gray-700/25 transform hover:scale-110"
                              >
                                <svg className="w-4 h-4 transition-transform duration-300 group-hover/social:rotate-12" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Subtle Hover Glow */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 pointer-events-none"></div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                
                {visibleItems < filteredTeam.length && (
                  <div className="flex justify-center mt-8 sm:mt-12 lg:mt-16">
                    <button
                      onClick={loadMoreItem}
                      className="btn btn-accent px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium rounded-full hover:scale-105 transition-all duration-300"
                    >
                      Load More
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default OurTeam; 