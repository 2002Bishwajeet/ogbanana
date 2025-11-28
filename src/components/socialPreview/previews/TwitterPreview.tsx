import type { PreviewProps } from "./types";

export const TwitterPreview = ({
  url,
  hostname,
  title,
  image,
  description,
}: PreviewProps) => (
  <div className="w-full max-w-[500px] bg-black text-white rounded-2xl overflow-hidden border border-gray-800 font-sans shadow-xl">
    <div className="relative aspect-[1.91/1] w-full overflow-hidden bg-gray-900">
      <img src={image ?? ""} alt="OG" className="w-full h-full object-cover" />
      <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-xs font-bold text-white">
        {hostname}
      </div>
    </div>
    <div className="p-3">
      <div className="text-[#e7e9ea] text-sm mb-0.5 truncate">{url}</div>
      <div className="text-[#e7e9ea] font-bold leading-tight">{title}</div>
      <div className="text-[#71767b] text-sm mt-1 line-clamp-2">
        {description}
      </div>
    </div>
  </div>
);
