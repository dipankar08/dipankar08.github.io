import Image from "next/image";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import type { Project } from "../types";

interface Props {
  project: Project;
}

export default function ProjectCardItem({ project }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      {project.imageUrl && (
        <Image
          src={project.imageUrl}
          alt={project.title}
          width={400}
          height={160}
          className="w-full h-40 object-cover"
        />
      )}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-base font-semibold text-gray-900 mb-2">
          {project.title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-3 flex-1">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-3">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-800 transition-colors"
            >
              <FiExternalLink size={16} />
            </a>
          )}
          {project.sourceUrl && (
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-800 transition-colors"
            >
              <FiGithub size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
