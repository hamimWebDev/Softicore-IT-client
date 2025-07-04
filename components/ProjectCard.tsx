import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiGithub, FiExternalLink } from "react-icons/fi";
import Badge from "./ui/Badge";

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveLink?: string;
  frontend?: string;
  backend?: string;
  category?: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const {
    title,
    description,
    image,
    technologies,
    liveLink,
    frontend,
    backend,
    category,
  } = project;

  return (
    <div className="card flex flex-col h-full rounded-2xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800">
      <div className="relative w-full h-64 bg-gray-100 dark:bg-gray-700">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>
      <div className="flex flex-col flex-1 p-6">
        <div className="text-gray-500 dark:text-gray-300 text-sm mb-2">
          Business / {project.category}
        </div>
        <div className="font-bold text-xl md:text-2xl text-gray-900 dark:text-white mb-2">
          {project.title}
        </div>
        {project?.liveLink && (
          <Link
            href={project?.liveLink}
            className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 hover:scale-105 ml-auto"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiExternalLink className="text-lg" />
            <span className="font-medium">Live Demo</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
