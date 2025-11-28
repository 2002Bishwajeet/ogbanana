import type { PreviewProps } from "./types";

export const LinkedInPreview = ({
  hostname,
  title,
  image,
  description,
}: PreviewProps) => (
  <div className="w-full max-w-[500px] bg-white rounded-lg overflow-hidden border border-gray-300 font-sans shadow-sm">
    <div className="aspect-[1.91/1] w-full overflow-hidden bg-gray-100">
      <img src={image ?? ""} alt="OG" className="w-full h-full object-cover" />
    </div>
    <div className="p-3 bg-white">
      <div className="text-[#000000E6] font-semibold text-[16px] leading-tight mb-1">
        {title}
      </div>
      <div className="text-[#00000099] text-[14px] line-clamp-2">
        {description}
      </div>
      <div className="text-[#00000099] text-[12px] truncate mt-1">
        {hostname}
      </div>
    </div>
  </div>
);
