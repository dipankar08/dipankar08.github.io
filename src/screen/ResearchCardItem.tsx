import type { ResearchItem } from "../types";

interface Props {
  item: ResearchItem;
}

export default function ResearchCardItem({ item }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden flex">
      {item.imageUrl && (
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-[140px] object-cover shrink-0"
        />
      )}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-2">
          <div>
            {item.link ? (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] font-semibold text-[#222] hover:text-blue-600 transition-colors"
              >
                {item.title}
              </a>
            ) : (
              <h3 className="text-[15px] font-semibold text-[#222]">
                {item.title}
              </h3>
            )}
            {item.venue && (
              <p className="text-xs text-blue-500 mt-0.5">{item.venue}</p>
            )}
          </div>
          {item.date && (
            <span className="text-xs text-[#999] whitespace-nowrap ml-4">
              {item.date}
            </span>
          )}
        </div>
        <p className="text-[13px] text-[#555] leading-relaxed mb-3">
          {item.description}
        </p>
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
      </div>
    </div>
  );
}
