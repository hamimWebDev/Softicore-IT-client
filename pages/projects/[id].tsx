import { useRouter } from "next/router";
import { NextPage } from "next";
import { motion } from "framer-motion";
import { NextSeo } from 'next-seo';
import Script from "next/script";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiExternalLink, FiGithub, FiCalendar, FiTag, FiGlobe, FiCode } from "react-icons/fi";
import { useGetProductByIdQuery } from "@/redux/features/products/productsApi";
import Badge from "@/components/ui/Badge";
import AnimatedSection from "@/components/AnimatedSection";
import ProjectDetailsSkeleton from "@/components/ProjectDetailsSkeleton";
import ProjectErrorBoundary from "@/components/ProjectErrorBoundary";
import ProjectBreadcrumb from "@/components/ProjectBreadcrumb";
import RelatedProjects from "@/components/RelatedProjects";
import ProjectShare from "@/components/ProjectShare";
import ProjectStats from "@/components/ProjectStats";
import { IWork } from "@/types/work.types";

const ProjectDetails: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  
  // Wait for router to be ready before making the query
  const { data: project, isLoading, isError } = useGetProductByIdQuery(id as string, {
    skip: !id || !router.isReady
  }) as { data: IWork | undefined, isLoading: boolean, isError: boolean };

  // Show loading while router is not ready or data is loading
  if (!router.isReady || isLoading) {
    return <ProjectDetailsSkeleton />;
  }

  // Show error if no ID or project not found
  if (!id || isError || !project) {
    return (
      <ProjectErrorBoundary
        error="The project you're looking for doesn't exist or has been removed."
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <>
      <NextSeo
        title={`${project.title} - Project Details | Softicore IT`}
        description={project.description}
        canonical={`https://softicoreit.com/projects/${project._id}`}
        openGraph={{
          title: `${project.title} - Project Details`,
          description: project.description,
          url: `https://softicoreit.com/projects/${project._id}`,
          images: [
            {
              url: project.image,
              width: 1200,
              height: 630,
              alt: project.title,
            },
          ],
        }}
      />

      {/* Structured Data for Project */}
      <Script
        id="project-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            name: project.title,
            description: project.description,
            image: project.image,
            url: project.liveLink,
            creator: {
              '@type': 'Organization',
              name: 'Softicore IT',
            },
            dateCreated: project.createdAt,
            dateModified: project.updatedAt,
            category: project.category,
          }),
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="pt-32 pb-16 min-h-screen bg-gradient-to-r from-blue-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
      >
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumb Navigation */}
            <AnimatedSection direction="left" delay={0.1}>
              <ProjectBreadcrumb projectTitle={project.title} />
            </AnimatedSection>

            {/* Project Image */}
            <AnimatedSection direction="up" delay={0.3}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700 mb-8 group">
                <div className="relative w-full h-96 md:h-[500px]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover work-image-scroll group-hover:scale-105 group-hover:translate-y-2 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Project Header */}
                <AnimatedSection direction="up" delay={0.2}>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="outline" className="text-xs">
                        {project.category}
                      </Badge>
                      {project.createdAt && (
                        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm">
                          <FiCalendar className="w-4 h-4" />
                          {new Date(project.createdAt).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                      )}
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                      {project.title}
                    </h1>

                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4">
                      {project.liveLink && (
                        <Link
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-all duration-300 hover:scale-105 shadow-lg"
                        >
                          <FiExternalLink className="w-4 h-4" />
                          Live Demo
                        </Link>
                      )}
                      {project.frontend && (
                        <Link
                          href={project.frontend}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 dark:bg-gray-700 text-white rounded-full hover:bg-gray-900 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105"
                        >
                          <FiGithub className="w-4 h-4" />
                          Frontend Code
                        </Link>
                      )}
                      {project.backend && (
                        <Link
                          href={project.backend}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 dark:bg-gray-700 text-white rounded-full hover:bg-gray-900 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105"
                        >
                          <FiCode className="w-4 h-4" />
                          Backend Code
                        </Link>
                      )}
                    </div>
                  </div>
                </AnimatedSection>



                {/* Project Details */}
                <AnimatedSection direction="up" delay={0.4}>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      Project Overview
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                          Category
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {project.category}
                        </p>
                      </div>

                      {project.createdAt && (
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                            Completion Date
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300">
                            {new Date(project.createdAt).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </AnimatedSection>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <AnimatedSection direction="right" delay={0.5}>
                  {/* Project Statistics */}
                  <ProjectStats
                    completionDate={project.createdAt}
                    technologies={project.technologies}
                    category={project.category}
                  />

                  {/* Technologies Used */}
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700 mb-6 mt-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <FiTag className="w-5 h-5 text-primary-600" />
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies?.map((tech, index) => (
                        <Badge key={index} variant="outline" className="text-sm">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Project Links */}
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700 mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <FiGlobe className="w-5 h-5 text-primary-600" />
                      Project Links
                    </h3>
                    <div className="space-y-3">
                      {project.liveLink && (
                        <Link
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        >
                          <FiExternalLink className="w-4 h-4" />
                          <span>Live Demo</span>
                        </Link>
                      )}
                      {project.frontend && (
                        <Link
                          href={project.frontend}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        >
                          <FiGithub className="w-4 h-4" />
                          <span>Frontend Repository</span>
                        </Link>
                      )}
                      {project.backend && (
                        <Link
                          href={project.backend}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        >
                          <FiCode className="w-4 h-4" />
                          <span>Backend Repository</span>
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Share Project */}
                  <ProjectShare
                    projectTitle={project.title}
                    projectUrl={typeof window !== 'undefined' ? window.location.href : ''}
                    projectDescription={project.description}
                  />
                </AnimatedSection>
              </div>
            </div>

            {/* Related Projects */}
            <RelatedProjects
              currentProjectId={project._id}
              category={project.category}
              maxProjects={3}
            />

            {/* CTA Section */}
            <AnimatedSection direction="up" delay={0.8}>
              <div className="mt-16 text-center">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Ready to Start Your Project?
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                    Let's discuss how we can help bring your vision to life with our innovative web development solutions.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-all duration-300 hover:scale-105 shadow-lg font-semibold"
                    >
                      Start Your Project
                      <FiArrowLeft className="w-4 h-4 rotate-180" />
                    </Link>
                    <Link
                      href="/projects"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 font-semibold"
                    >
                      View All Projects
                    </Link>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ProjectDetails; 