import type { PreviewProps } from "./types";

export const FacebookPreview = ({
  hostname,
  title,
  description,
  image,
}: PreviewProps) => (
  <div className="w-full max-w-[500px] bg-white rounded-lg overflow-hidden border border-gray-300 font-sans shadow-md">
    <div className="aspect-[1.91/1] w-full overflow-hidden bg-gray-100">
      <img src={image ?? ""} alt="OG" className="w-full h-full object-cover" />
    </div>
    <div className="p-3 bg-[#F0F2F5]">
      <div className="uppercase text-[11px] text-[#65676B] mb-1 font-semibold tracking-wide truncate">
        {hostname}
      </div>
      <div className="text-[#050505] font-bold text-[16px] leading-tight mb-1">
        {title}
      </div>
      <div className="text-[#65676B] text-[14px] line-clamp-1">
        {description}
      </div>
    </div>
  </div>
);
