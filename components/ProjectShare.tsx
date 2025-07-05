import React, { useState } from "react";
import { FiShare2, FiCopy, FiCheck, FiTwitter, FiLinkedin, FiFacebook } from "react-icons/fi";
import Badge from "./ui/Badge";

interface ProjectShareProps {
  projectTitle: string;
  projectUrl: string;
  projectDescription: string;
}

const ProjectShare: React.FC<ProjectShareProps> = ({ 
  projectTitle, 
  projectUrl, 
  projectDescription 
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(projectUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const shareLinks = [
    {
      name: 'Twitter',
      icon: FiTwitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this amazing project: ${projectTitle}`)}&url=${encodeURIComponent(projectUrl)}`,
      color: 'hover:text-blue-500'
    },
    {
      name: 'LinkedIn',
      icon: FiLinkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(projectUrl)}`,
      color: 'hover:text-blue-600'
    },
    {
      name: 'Facebook',
      icon: FiFacebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(projectUrl)}`,
      color: 'hover:text-blue-700'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <FiShare2 className="w-5 h-5 text-primary-600" />
        Share Project
      </h3>
      
      <div className="space-y-4">
        {/* Copy Link */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <input
            type="text"
            value={projectUrl}
            readOnly
            className="flex-1 bg-transparent text-sm text-gray-600 dark:text-gray-300 border-none outline-none"
          />
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-3 py-1.5 bg-primary-600 text-white rounded-full text-sm hover:bg-primary-700 transition-colors"
          >
            {copied ? (
              <>
                <FiCheck className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <FiCopy className="w-4 h-4" />
                Copy
              </>
            )}
          </button>
        </div>

        {/* Social Media Links */}
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Share on social media:
          </p>
          <div className="flex gap-3">
            {shareLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 bg-gray-100 dark:bg-gray-700 rounded-full transition-all duration-300 hover:scale-110 ${link.color}`}
                title={`Share on ${link.name}`}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Project Info */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Share this project with your network and help us reach more clients!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectShare; 