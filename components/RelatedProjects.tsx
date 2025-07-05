import React from "react";
import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";
import { IWork } from "@/types/work.types";
import ProjectCard from "./ProjectCard";
import AnimatedSection from "./AnimatedSection";

interface RelatedProjectsProps {
  currentProjectId?: string;
  category?: string;
  maxProjects?: number;
}

const RelatedProjects: React.FC<RelatedProjectsProps> = ({ 
  currentProjectId, 
  category, 
  maxProjects = 3 
}) => {
  const { data: allProjects, isLoading } = useGetAllProductsQuery(undefined);

  if (isLoading || !allProjects) {
    return null;
  }

  // Filter out current project and get projects with same category
  const relatedProjects = (allProjects as IWork[])
    .filter((project: IWork) => 
      project._id !== currentProjectId && 
      project.category === category
    )
    .slice(0, maxProjects);

  if (relatedProjects.length === 0) {
    return null;
  }

  return (
    <AnimatedSection direction="up" delay={0.7}>
      <div className="mt-16">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Related Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Explore more projects in the same category
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProjects.map((project: any, index: number) => (
              <AnimatedSection 
                key={project._id} 
                direction="up" 
                delay={0.8 + index * 0.1}
              >
                <ProjectCard project={project} index={index} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default RelatedProjects; 