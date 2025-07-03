import { useEffect, useState } from "react";
import { NextPage } from "next";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import ProjectCard from "@/components/ProjectCard";
import AnimatedSection from "@/components/AnimatedSection";
import Head from "next/head";
import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";

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

const homeProject: NextPage = () => {
  const { data: projects, isLoading, isError } = useGetAllProductsQuery(undefined);
  const [tabValue, setTabValue] = useState("all");
  const [visibleItems, setVisibleItems] = useState(6);
  const [projectList, setProjectList] = useState<any[]>([]);

  useEffect(() => {
    if (Array.isArray(projects)) {
      setProjectList(projects);
    }
  }, [projects]);

  // Extract unique categories
  const uniqueCategories = Array.from(
    new Set(projectList.flatMap((item) => item.category || []))
  ).filter(Boolean);

  // Tab data
  const tabData = [
    { category: "all" },
    ...uniqueCategories.map((category) => ({ category })),
  ];

  // Filtered projects
  const filteredProjects =
    tabValue === "all"
      ? projectList
      : projectList.filter((item) => item.category === tabValue);

  // Load more handler
  const loadMoreItem = () => {
    setVisibleItems((prev) => prev + 3);
  };

  return (
    <>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        
        <section>
          <div className="container-custom">
            <Tabs value={tabValue} onValueChange={setTabValue}>
              {({ value, onValueChange }: any) => (
                <>
                  <TabsList>
                    {tabData.map((item, idx) => (
                      <TabsTrigger
                        key={`${item.category}-${idx}`}
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
                            key={`${project.id ?? "noid"}-${index}`}
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
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default homeProject;
