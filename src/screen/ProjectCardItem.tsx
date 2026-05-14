"use client";

import { useState } from "react";
import Image from "next/image";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import { HiX } from "react-icons/hi";
import type { Project } from "../types";

interface Props {
  project: Project;
}

export default function ProjectCardItem({ project }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
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
          <p className="text-sm text-gray-500 leading-relaxed mb-3 flex-1 line-clamp-3">
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
          <div className="flex items-center justify-between">
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
            <button
              onClick={() => setOpen(true)}
              className="text-xs text-blue-500 hover:text-blue-700 cursor-pointer transition-colors"
            >
              Read more
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-xl shadow-xl max-w-lg w-full mx-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {project.imageUrl && (
              <Image
                src={project.imageUrl}
                alt={project.title}
                width={512}
                height={200}
                className="w-full h-[200px] object-cover"
              />
            )}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  {project.title}
                </h3>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-400 hover:text-gray-800 transition-colors cursor-pointer ml-4 shrink-0"
                >
                  <HiX size={20} />
                </button>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4 whitespace-pre-line">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-500 hover:text-blue-700 transition-colors"
                  >
                    Live demo &rarr;
                  </a>
                )}
                {project.sourceUrl && (
                  <a
                    href={project.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-500 hover:text-blue-700 transition-colors"
                  >
                    Source code &rarr;
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
