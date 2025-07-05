import { useEffect, useState } from "react";
import { NextPage } from "next";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { NextSeo } from 'next-seo';
import Script from "next/script";
import { FaSearch, FaTimes, FaFilter } from "react-icons/fa";

import ProjectCard from "@/components/ProjectCard";
import AnimatedSection from "@/components/AnimatedSection";
import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";
import { pageSEOConfigs } from '@/lib/seo-config';

// Simple Tabs implementation (inline, since no UI lib found)
const Tabs = ({ value, onValueChange, children }: any) => (
  <div>{children({ value, onValueChange })}</div>
);
const TabsList = ({ children }: any) => (
  <div className="flex flex-wrap gap-2 justify-center mb-8">{children}</div>
);
const TabsTrigger = ({ value, selected, onClick, children }: any) => (
  <button
    className={`uppercase text-xs sm:text-sm lg:text-base px-3 sm:px-4 lg:px-6 py-2 sm:py-3 min-w-fit flex-1 sm:flex-none rounded-full border transition-all duration-200 ${
      selected
        ? "bg-primary-600 text-white dark:bg-primary-400 dark:text-gray-900 border-primary-600 dark:border-primary-400"
        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-transparent hover:bg-primary-100 dark:hover:bg-primary-800"
    }`}
    onClick={onClick}
    type="button"
  >
    {children}
  </button>
);
const TabsContent = ({ children }: any) => <div>{children}</div>;

const Projects: NextPage = () => {
  const { data: projects, isLoading, isError } = useGetAllProductsQuery(undefined);
  const [tabValue, setTabValue] = useState("all");
  const [visibleItems, setVisibleItems] = useState(6);
  const [projectList, setProjectList] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("newest"); // newest, oldest, name, category

  useEffect(() => {
    if (Array.isArray(projects)) {
      setProjectList(projects);
      setFilteredProjects(projects);
    }
  }, [projects]);

  // Search and filter functionality
  useEffect(() => {
    let filtered = [...projectList]; // Create a new array to avoid read-only issues

    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter((project) => {
        const titleMatch = project.title?.toLowerCase().includes(searchLower);
        const descriptionMatch = project.description?.toLowerCase().includes(searchLower);
        const categoryMatch = project.category?.toLowerCase().includes(searchLower);
        const techMatch = project.technologies?.some((tech: string) => 
          tech.toLowerCase().includes(searchLower)
        );
        const clientMatch = project.client?.toLowerCase().includes(searchLower);

        return titleMatch || descriptionMatch || categoryMatch || techMatch || clientMatch;
      });
    }

    // Apply category filter
    if (tabValue !== "all") {
      filtered = filtered.filter((item) => item.category === tabValue);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        case "oldest":
          return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
        case "name":
          return (a.title || "").localeCompare(b.title || "");
        case "category":
          return (a.category || "").localeCompare(b.category || "");
        default:
          return 0;
      }
    });

    setFilteredProjects(filtered);
    setVisibleItems(6); // Reset visible items when filtering
  }, [searchTerm, tabValue, sortBy, projectList]);

  // Extract unique categories
  const uniqueCategories = Array.from(
    new Set(projectList.flatMap((item) => item.category || []))
  ).filter(Boolean);

  // Tab data
  const tabData = [
    { category: "all" },
    ...uniqueCategories.map((category) => ({ category })),
  ];

  // Load more handler
  const loadMoreItem = () => {
    setVisibleItems((prev) => prev + 3);
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm("");
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchTerm("");
    setTabValue("all");
    setSortBy("newest");
  };

  return (
    <>
      <NextSeo
        title={pageSEOConfigs.projects.title}
        description={pageSEOConfigs.projects.description}
        canonical={pageSEOConfigs.projects.canonical}
        openGraph={pageSEOConfigs.projects.openGraph}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'web development projects, custom websites, e-commerce development, digital applications, web design portfolio, React projects, Node.js development',
          },
        ]}
      />

      {/* Structured Data for Projects Portfolio */}
      <Script
        id="projects-portfolio-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Softicore IT Portfolio',
            description: 'Web development projects and digital solutions portfolio',
            numberOfItems: projectList.length,
            itemListElement: projectList.slice(0, 10).map((project, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'CreativeWork',
                name: project.title || `Project ${index + 1}`,
                description: project.description || 'Web development project',
                url: project.liveUrl || `https://softicoreit.com/projects/${project.id}`,
                creator: {
                  '@type': 'Organization',
                  name: 'Softicore IT',
                },
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
                Our Projects
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                Explore our portfolio of successful web development projects and digital solutions.
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto mb-6">
                <div className="relative">
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="text"
                    placeholder="Search projects by title, description, category, technologies, or client..."
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
                      Found {filteredProjects.length} result{filteredProjects.length !== 1 ? 's' : ''} for "{searchTerm}"
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Filter Controls */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <FaFilter className="text-sm" />
                  <span className="text-sm font-medium">Filters</span>
                </button>
                
                {(searchTerm || tabValue !== "all" || sortBy !== "newest") && (
                  <button
                    onClick={clearAllFilters}
                    className="px-4 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors duration-200 text-sm font-medium"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Advanced Filters */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="max-w-2xl mx-auto mb-6"
                  >
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Sort By
                          </label>
                          <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="name">Name A-Z</option>
                            <option value="category">Category</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
                  Error loading projects. Please try again later.
                </p>
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  No projects found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {searchTerm 
                    ? `No projects match your search for "${searchTerm}". Try different keywords.`
                    : "No projects available at the moment."
                  }
                </p>
                {(searchTerm || tabValue !== "all") && (
                  <button
                    onClick={clearAllFilters}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <>
                <Tabs value={tabValue} onValueChange={setTabValue}>
                  {({ value, onValueChange }: any) => (
                    <>
                      <TabsList>
                        {tabData.map((item) => (
                          <TabsTrigger
                            key={item.category}
                            value={item.category}
                            selected={value === item.category}
                            onClick={() => {
                              setTabValue(item.category);
                              setVisibleItems(6);
                            }}
                          >
                            {item.category}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                      <TabsContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                          <AnimatePresence>
                            {filteredProjects.slice(0, visibleItems).map((project, index) => (
                              <motion.div
                                key={project._id || index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                              >
                                <ProjectCard project={project} index={index} />
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>
                        {visibleItems < filteredProjects.length && (
                          <div className="flex justify-center mt-8 sm:mt-12 lg:mt-16">
                            <button
                              onClick={loadMoreItem}
                              className="btn btn-accent px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium rounded-full hover:scale-105 transition-all duration-300"
                            >
                              Load More
                            </button>
                          </div>
                        )}
                      </TabsContent>
                    </>
                  )}
                </Tabs>
              </>
            )}
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default Projects;
