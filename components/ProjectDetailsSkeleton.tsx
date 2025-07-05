import React from "react";

const ProjectDetailsSkeleton: React.FC = () => {
  return (
    <div className="pt-32 pb-16 min-h-screen bg-gradient-to-r from-blue-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Back Button Skeleton */}
          <div className="animate-pulse mb-8">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Project Header Skeleton */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 mb-8 animate-pulse">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                </div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="space-y-3 mb-6">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
                </div>
                <div className="flex gap-4">
                  <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-full w-32"></div>
                  <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-full w-36"></div>
                </div>
              </div>

              {/* Project Image Skeleton */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700 mb-8 animate-pulse">
                <div className="w-full h-96 md:h-[500px] bg-gray-200 dark:bg-gray-700"></div>
              </div>

              {/* Project Details Skeleton */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 animate-pulse">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-3"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                  </div>
                  <div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-36 mb-3"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-40"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Technologies Skeleton */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700 mb-6 animate-pulse">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-40 mb-4"></div>
                <div className="flex flex-wrap gap-2">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-14"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-18"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-12"></div>
                </div>
              </div>

              {/* Project Links Skeleton */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700 animate-pulse">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-28"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-36"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section Skeleton */}
          <div className="mt-16 text-center animate-pulse">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-80 mx-auto mb-4"></div>
              <div className="space-y-3 mb-6 max-w-2xl mx-auto">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mx-auto"></div>
              </div>
              <div className="h-14 bg-gray-200 dark:bg-gray-700 rounded-full w-48 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsSkeleton; 