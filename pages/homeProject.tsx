import { NextPage } from "next";
import AnimatedSection from "@/components/AnimatedSection";
import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";
import Image from "next/image";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";
import ProjectCard from "@/components/ProjectCard";

const HomeProject: NextPage = () => {
  const { data: projects, isLoading, isError } = useGetAllProductsQuery(undefined);
  const displayProjects = Array.isArray(projects) ? projects.slice(0, 3) : [];

  return (
    <section className="section bg-gradient-to-r from-blue-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container-custom">
        <AnimatedSection direction="up" delay={0.1}>
          <div className="flex flex-col items-center text-center mb-12">
            <h3 className="text-4xl text-primary-500 mb-2 ">
              &lt; Case Study /&gt;
            </h3>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-2">
              Recently Some Cases Done by Our <br /> Agency Team
            </h2>
          </div>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {displayProjects.map((project, idx) => (
            <AnimatedSection key={project._id || idx} delay={0.2 + idx * 0.1}>
              <ProjectCard project={project} index={idx} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeProject;
