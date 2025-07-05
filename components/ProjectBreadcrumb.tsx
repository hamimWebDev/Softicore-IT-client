import React from "react";
import Link from "next/link";
import { FiChevronRight, FiHome } from "react-icons/fi";

interface ProjectBreadcrumbProps {
  projectTitle?: string;
}

const ProjectBreadcrumb: React.FC<ProjectBreadcrumbProps> = ({ projectTitle }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-8">
      <Link
        href="/"
        className="flex items-center gap-1 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
      >
        <FiHome className="w-4 h-4" />
        <span>Home</span>
      </Link>
      
      <FiChevronRight className="w-4 h-4" />
      
      <Link
        href="/projects"
        className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
      >
        Projects
      </Link>
      
      {projectTitle && (
        <>
          <FiChevronRight className="w-4 h-4" />
          <span className="text-gray-900 dark:text-white font-medium truncate max-w-xs">
            {projectTitle}
          </span>
        </>
      )}
    </nav>
  );
};

export default ProjectBreadcrumb; 