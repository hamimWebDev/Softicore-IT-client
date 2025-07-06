import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiGithub, FiExternalLink, FiEye } from "react-icons/fi";
import Badge from "./ui/Badge";

interface Project {
  _id?: string;
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
    _id,
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
    <div className="card flex flex-col h-full rounded-2xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
      <div className="relative w-full h-64 bg-gray-100 dark:bg-gray-700 overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover work-image-scroll group-hover:scale-105 group-hover:translate-y-2 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

      </div>
      <div className="flex flex-col flex-1 p-6">
        <div className="text-gray-500 dark:text-gray-300 text-sm mb-2">
          Business / {project.category}
        </div>
        <div className="font-bold text-xl md:text-2xl text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {project.title}
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Technologies preview */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {project.technologies.slice(0, 3).map((tech, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{project.technologies.length - 3} more
              </Badge>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mt-auto">
          <Link
            href={`/projects/${_id}`}
            className="flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-300 font-medium"
          >
            <span>View Details</span>
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          {project?.liveLink && (
            <Link
              href={project?.liveLink}
              className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 hover:scale-105"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <FiExternalLink className="text-lg" />
              <span className="font-medium">Demo</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
