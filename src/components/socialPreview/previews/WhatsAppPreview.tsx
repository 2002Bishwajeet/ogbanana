import type { PreviewProps } from "./types";

export const WhatsAppPreview = ({
  hostname,
  title,
  description,
  image,
}: PreviewProps) => (
  <div className="w-full max-w-[420px] bg-[#E7FFDB] p-2 rounded-xl shadow-md font-sans flex flex-col gap-1">
    <div className="text-sm text-black px-1 pb-1 font-sans">
      Check this out! 👇
    </div>
    <div className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-200">
      <div className="aspect-[1.91/1] w-full overflow-hidden bg-gray-100">
        <img
          src={image ?? ""}
          alt="OG"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3">
        <div className="text-gray-800 font-bold text-sm leading-tight line-clamp-2">
          {title}
        </div>
        <div className="text-gray-500 text-xs leading-tight line-clamp-2 mt-1">
          {description}
        </div>
        <div className="uppercase text-[11px] text-gray-400 mt-2 font-semibold tracking-wide truncate">
          {hostname}
        </div>
      </div>
    </div>
    <div className="text-[11px] text-gray-400 text-right px-2">12:42 PM</div>
  </div>
);
