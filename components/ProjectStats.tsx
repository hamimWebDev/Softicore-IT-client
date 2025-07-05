import React from "react";
import { FiClock, FiUsers, FiTrendingUp, FiAward } from "react-icons/fi";

interface ProjectStatsProps {
  completionDate?: string;
  technologies?: string[];
  category?: string;
}

const ProjectStats: React.FC<ProjectStatsProps> = ({ 
  completionDate, 
  technologies, 
  category 
}) => {
  const stats = [
    {
      icon: FiClock,
      label: "Completion Date",
      value: completionDate ? new Date(completionDate).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }) : "N/A",
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      icon: FiUsers,
      label: "Category",
      value: category || "N/A",
      color: "text-green-600 dark:text-green-400"
    },
    {
      icon: FiTrendingUp,
      label: "Technologies",
      value: technologies?.length || 0,
      color: "text-purple-600 dark:text-purple-400"
    },
    {
      icon: FiAward,
      label: "Status",
      value: "Completed",
      color: "text-orange-600 dark:text-orange-400"
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        Project Statistics
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <div className={`w-12 h-12 mx-auto mb-3 bg-gray-100 dark:bg-gray-600 rounded-full flex items-center justify-center ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Project Quality</span>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-4 h-4 text-yellow-400 fill-current"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectStats; 