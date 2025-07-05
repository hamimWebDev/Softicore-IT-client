"use client"

import { useEffect, useState } from "react";
import { NextPage } from "next";
import { motion, AnimatePresence } from "framer-motion";
import { NextSeo } from 'next-seo';
import Script from "next/script";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useGetAllClientsQuery } from "@/redux/features/client/clientApi";

const OurClients: NextPage = () => {
  const { data: clients, isLoading, isError } = useGetAllClientsQuery(undefined);
  const [visibleItems, setVisibleItems] = useState(8);
  const [clientList, setClientList] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredClients, setFilteredClients] = useState<any[]>([]);

  useEffect(() => {
    if (Array.isArray(clients)) {
      setClientList(clients);
      setFilteredClients(clients);
    }
  }, [clients]);

  // Search functionality
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredClients(clientList);
      setVisibleItems(8);
      return;
    }

    const filtered = clientList.filter((client) => {
      const searchLower = searchTerm.toLowerCase();
      const nameMatch = client.name?.toLowerCase().includes(searchLower);
      const websiteMatch = client.website?.toLowerCase().includes(searchLower);

      return nameMatch || websiteMatch;
    });

    setFilteredClients(filtered);
    setVisibleItems(8); // Reset visible items when searching
  }, [searchTerm, clientList]);

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
        title="Our Clients - Web Development Portfolio"
        description="Meet our valued clients who trust Softicore IT for their web development needs. Explore successful partnerships and digital solutions we've delivered."
        canonical="https://softicoreit.com/our-clients"
        openGraph={{
          title: "Our Clients | Softicore IT - Web Development Portfolio",
          description: "Meet our valued clients who trust Softicore IT for their web development needs. Explore successful partnerships and digital solutions we've delivered.",
          url: "https://softicoreit.com/our-clients",
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'web development clients, custom website clients, e-commerce clients, digital solutions clients, client portfolio, successful projects',
          },
        ]}
      />

      {/* Structured Data for Clients */}
      <Script
        id="clients-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Softicore IT Clients',
            description: 'Our valued clients and successful partnerships',
            url: 'https://softicoreit.com/our-clients',
            numberOfItems: clientList.length,
            itemListElement: clientList.slice(0, 10).map((client, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'Organization',
                name: client.name,
                url: client.website,
                logo: client.image,
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
                Our Clients
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                Meet the amazing clients who trust us with their digital success.
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <div className="relative">
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="text"
                    placeholder="Search clients by name or website..."
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
                      Found {filteredClients.length} result{filteredClients.length !== 1 ? 's' : ''} for "{searchTerm}"
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
                  Error loading clients. Please try again later.
                </p>
              </div>
            ) : filteredClients.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">👥</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  No clients found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {searchTerm 
                    ? `No clients match your search for "${searchTerm}". Try different keywords.`
                    : "No clients available at the moment."
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
                    {filteredClients.slice(0, visibleItems).map((client, index) => (
                      <motion.div
                        key={client._id || index}
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
                            src={client.image}
                            alt={client.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            onError={(e) => {
                              e.currentTarget.src = "/icon/profile_image.jpg";
                            }}
                          />
                          
                          {/* Elegant Badge */}
                          <div className="absolute top-4 right-4 z-20">
                            <div className="px-3 py-1.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg">
                              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                                Our Client
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Content Section */}
                        <div className="relative p-6">
                          {/* Client Name with Elegant Typography */}
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                            {client.name?.split(' ').filter((word: string) => word.trim() !== '').join(' ')}
                          </h3>

                          {/* Elegant Divider */}
                          <div className="flex items-center mb-5">
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
                            <div className="mx-3 w-2 h-2 bg-blue-500 rounded-full"></div>
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
                          </div>

                          {/* Action Section */}
                          <div className="space-y-4">
                            {client.website && (
                              <a
                                href={client.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/btn flex items-center justify-center w-full px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-[1.02]"
                              >
                                <svg className="w-4 h-4 mr-2 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                Visit Website
                              </a>
                            )}

                            {/* Trust Indicator */}
                            <div className="flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
                              <div className="flex items-center space-x-1">
                                <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Trusted Partnership</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Subtle Hover Glow */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 pointer-events-none"></div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                
                {visibleItems < filteredClients.length && (
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

export default OurClients; 