import type { PreviewProps } from "./types";

export const DiscordPreview = ({
  title,
  description,
  image,
  hostname,
}: PreviewProps) => (
  <div className="w-full max-w-[500px] bg-[#2f3136] rounded-lg overflow-hidden font-sans shadow-xl border-l-4 border-primary">
    <div className="p-4">
      <div className="text-sm text-white mb-2 font-semibold">{hostname}</div>
      <div className="text-[#dcddde] font-bold text-base leading-tight">
        {title}
      </div>
      <div className="text-[#b9bbbe] text-sm mt-1 line-clamp-2">
        {description}
      </div>
    </div>
    <div className="px-4 pb-4">
      <div className="relative aspect-[1.91/1] w-full overflow-hidden rounded-md">
        <img
          src={image ?? ""}
          alt="OG"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
);
