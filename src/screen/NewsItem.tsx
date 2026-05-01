"use client";

import { useState } from "react";
import Image from "next/image";
import { HiX } from "react-icons/hi";
import type { NewsItem as NewsItemType } from "../types";

interface Props {
  item: NewsItemType;
}

export default function NewsItem({ item }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="w-[200px] shrink-0 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
        {item.imageUrl && (
          <Image
            src={item.imageUrl}
            alt={item.title}
            width={200}
            height={130}
            className="w-full h-[130px] object-cover"
          />
        )}
        <div className="p-3 flex flex-col flex-1">
          <p className="text-[13px] font-medium text-[#333] leading-[1.5] mb-1">
            {item.title}
          </p>
          <p className="text-[11px] text-[#777] leading-[1.5] mb-2 flex-1 line-clamp-3">
            {item.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#999]">{item.date}</span>
            <button
              onClick={() => setOpen(true)}
              className="text-[11px] text-blue-500 hover:text-blue-700 cursor-pointer transition-colors"
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
            {item.imageUrl && (
              <Image
                src={item.imageUrl}
                alt={item.title}
                width={512}
                height={200}
                className="w-full h-[200px] object-cover"
              />
            )}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-[18px] font-semibold text-[#222]">
                  {item.title}
                </h3>
                <button
                  onClick={() => setOpen(false)}
                  className="text-[#999] hover:text-[#222] transition-colors cursor-pointer ml-4 shrink-0"
                >
                  <HiX size={20} />
                </button>
              </div>
              <p className="text-[14px] text-[#555] leading-[1.7] mb-4">
                {item.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-[#999]">{item.date}</span>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] text-blue-500 hover:text-blue-700 transition-colors"
                  >
                    Visit link &rarr;
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
