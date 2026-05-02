import { FiExternalLink } from "react-icons/fi";
import type { ResearchItem } from "../types";

interface Props {
  item: ResearchItem;
}

export default function ResearchCardItem({ item }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden flex">
      <div className="p-5 flex flex-col flex-1">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-1">
          <div>
            <h3 className="text-[15px] font-semibold text-[#222]">
              {item.title}
            </h3>
            {item.authors && (
              <p className="text-xs text-[#777] mt-0.5">{item.authors}</p>
            )}
            {item.venue && (
              <p className="text-xs text-blue-500 mt-0.5">{item.venue}</p>
            )}
          </div>
          {item.date && (
            <span className="text-xs text-[#999] whitespace-nowrap sm:ml-4">
              {item.date}
            </span>
          )}
        </div>
        <p className="text-[13px] text-[#555] leading-relaxed mb-3">
          {item.description}
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:justify-between">
          <div className="flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[13px] text-blue-500 hover:text-blue-700 transition-colors whitespace-nowrap ml-4"
            >
              View Publication <FiExternalLink size={13} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
