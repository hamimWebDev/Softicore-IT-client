import React from "react";
import Link from "next/link";
import { FiArrowLeft, FiRefreshCw, FiHome } from "react-icons/fi";

interface ProjectErrorBoundaryProps {
  error?: string;
  onRetry?: () => void;
}

const ProjectErrorBoundary: React.FC<ProjectErrorBoundaryProps> = ({ 
  error = "Something went wrong", 
  onRetry 
}) => {
  return (
    <div className="pt-32 pb-16 min-h-screen bg-gradient-to-r from-blue-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
            {/* Error Icon */}
            <div className="w-20 h-20 mx-auto mb-6 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-red-600 dark:text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Oops! Something went wrong
            </h1>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {error}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors font-medium"
                >
                  <FiRefreshCw className="w-4 h-4" />
                  Try Again
                </button>
              )}
              
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
              >
                <FiArrowLeft className="w-4 h-4" />
                Back to Projects
              </Link>
              
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
              >
                <FiHome className="w-4 h-4" />
                Go Home
              </Link>
            </div>

            {/* Additional Help */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Still having trouble?
              </p>
              <Link
                href="/contact"
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium transition-colors"
              >
                Contact our support team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectErrorBoundary; 