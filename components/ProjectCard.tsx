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
    <div className="group flex flex-col h-full border border-gray-200 dark:border-gray-700/50 rounded-2xl p-6 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900/90 dark:to-gray-800/80 dark:bg-gradient-to-br dark:backdrop-blur-sm transition-all duration-500 hover:border-gray-300 dark:hover:border-gray-600/70 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1">
      <div className="w-full h-[280px] rounded-xl flex items-center justify-center mb-6 relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-600/30">
        {category && (
          <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-600 dark:text-white text-xs font-semibold absolute z-40 top-4 left-4 uppercase tracking-wide shadow-lg">
            {category}
          </Badge>
        )}
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          priority
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover group-hover:scale-110 transition-all duration-700 ease-out work-image-scroll"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
      </div>

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
          {title}
        </h3>
        {liveLink && (
          <Link
            href={liveLink}
            className="bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-600 dark:to-blue-700 text-blue-700 dark:text-white rounded-full w-12 h-12 flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-all duration-500 hover:from-blue-200 hover:to-blue-300 dark:hover:from-blue-500 dark:hover:to-blue-600 shadow-lg hover:shadow-blue-500/25"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiArrowRight className="text-xl" />
          </Link>
        )}
      </div>

      <p className="text-gray-700 dark:text-gray-300 mb-5 leading-relaxed line-clamp-3 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors duration-300">
        {description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {technologies.map((tech, index) => (
          <Badge 
            key={index} 
            variant="outline" 
            className="bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200 hover:border-gray-400 dark:bg-gray-800/50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700/50 dark:hover:border-gray-500 transition-all duration-300 text-xs font-medium"
          >
            {tech}
          </Badge>
        ))}
      </div>

      <div className="mt-auto flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-700/50">
        {frontend && (
          <Link
            href={frontend}
            className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 hover:scale-105"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiGithub className="text-lg" /> 
            <span className="font-medium">Frontend</span>
          </Link>
        )}

        {backend && (
          <Link
            href={backend}
            className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 hover:scale-105"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiGithub className="text-lg" /> 
            <span className="font-medium">Backend</span>
          </Link>
        )}

        {liveLink && (
          <Link
            href={liveLink}
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
