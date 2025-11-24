import { memo, useId, type ReactNode } from "react";
import { Zap, LogOut } from "lucide-react";
import { NeoButton } from "../ui/NeoButton";
import { useNavigate } from "react-router";
import type { User } from "../../context/AuthContext";

interface NavBarProps {
  user: User | null;
  onOpenAuth: () => void;
  onLogout: () => void;
}

interface MobileActionProps {
  children: ReactNode;
  onAction: () => void;
  className: string;
  toggleId: string;
}

const MobileMenuAction = ({
  children,
  onAction,
  className,
  toggleId,
}: MobileActionProps) => (
  <label
    htmlFor={toggleId}
    className={className}
    role="button"
    tabIndex={0}
    onClick={(event) => {
      event.stopPropagation();
      onAction();
    }}
    onKeyDown={(event) => {
      if (event.key === "Enter" || event.key === " ") {
        onAction();
      }
    }}
  >
    {children}
  </label>
);

export const NavBar = memo(({ user, onOpenAuth, onLogout }: NavBarProps) => {
  const navigate = useNavigate();
  const mobileToggleId = useId();
  const navLinks = [
    {
      label: "THE_LOGIC",
      path: "/#how-it-works",
      hoverClass: "hover:bg-black hover:text-white",
    },
    {
      label: "COSTS",
      path: "/pricing",
      hoverClass: "hover:bg-accent hover:text-white",
    },
  ];

  const handleNavigation = (path: string) => {
    if (path.startsWith("/#")) {
      const targetId = path.split("#")[1];
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate(path);
      }
    } else {
      navigate(path);
    }
  };

  const renderLinks = (variant: "desktop" | "mobile") =>
    navLinks.map(({ label, path, hoverClass }) =>
      variant === "desktop" ? (
        <button
          key={label}
          onClick={() => handleNavigation(path)}
          className={`${hoverClass} px-2 py-1 transition-all`}
        >
          {label}
        </button>
      ) : (
        <MobileMenuAction
          key={label}
          onAction={() => handleNavigation(path)}
          toggleId={mobileToggleId}
          className={`w-full text-left px-4 py-3 border-t border-black ${hoverClass} transition-all`}
        >
          {label}
        </MobileMenuAction>
      )
    );

  return (
    <nav className="border-b-4 border-black bg-white sticky top-0 z-50 transition-all duration-300">
      <div className="relative">
        <input type="checkbox" id={mobileToggleId} className="peer hidden" />

        <div className="flex justify-between items-center p-4">
          <div
            className="text-2xl font-black tracking-tighter cursor-pointer flex items-center gap-2 select-none group"
            onClick={() => navigate("/")}
          >
            <div className="w-8 h-8 bg-black text-[#FFDE00] flex items-center justify-center border border-black group-hover:rotate-12 transition-transform">
              <Zap size={20} fill="#FFDE00" />
            </div>
            <span className="group-hover:text-[#FF90E8] transition-colors">
              OG:BANANA
            </span>
          </div>

          <div className="hidden md:flex gap-6 font-mono font-bold items-center text-sm tracking-wide">
            {renderLinks("desktop")}

            {user ? (
              <div className="flex items-center gap-4 animate-in fade-in">
                <div className="hidden lg:block text-xs text-right leading-tight">
                  <div className="bg-[#FFDE00] px-1 border border-black mb-0.5">
                    OP: {user.name.toUpperCase()}
                  </div>
                  <div className="bg-black text-white px-1 inline-block">
                    {user.credits} CREDITS
                  </div>
                </div>
                <NeoButton
                  onClick={() => navigate("/generator")}
                  variant="secondary"
                  className="py-1 px-4 text-xs"
                >
                  CONSOLE
                </NeoButton>
                <button
                  onClick={onLogout}
                  className="border-2 border-black p-2 hover:bg-red-500 hover:text-white transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <NeoButton onClick={onOpenAuth} className="py-2 px-6 text-xs">
                JOIN_CULT
              </NeoButton>
            )}
          </div>

          <label
            htmlFor={mobileToggleId}
            className="md:hidden cursor-pointer flex flex-col justify-center items-center gap-1 w-10 h-10 border-2 border-black bg-white"
            aria-label="Toggle navigation"
          >
            <span className="block w-6 h-0.5 bg-black transition-all peer-checked:translate-y-1.5 peer-checked:rotate-45"></span>
            <span className="block w-6 h-0.5 bg-black transition-opacity peer-checked:opacity-0"></span>
            <span className="block w-6 h-0.5 bg-black transition-all peer-checked:-translate-y-1.5 peer-checked:-rotate-45"></span>
          </label>
        </div>

        <div className="bg-[#FFDE00] text-black text-center text-xs font-bold py-1 border-t-2 border-black font-mono tracking-widest">
          BETA ACCESS: FREE RIDE WHILE IT LASTS
        </div>

        <div className="md:hidden overflow-hidden max-h-0 peer-checked:max-h-128 transition-all duration-300 border-t-4 border-b-4 border-black bg-white shadow-lg flex flex-col">
          <div className="font-mono font-bold text-sm tracking-wide flex flex-col">
            {renderLinks("mobile")}
          </div>
          <div className="border-t border-black p-4 flex flex-col gap-4">
            {user ? (
              <>
                <div className="text-xs">
                  <div className="bg-[#FFDE00] px-2 py-1 border border-black inline-block mb-2">
                    OP: {user.name.toUpperCase()}
                  </div>
                  <div className="bg-black text-white px-2 py-1 inline-block">
                    {user.credits} CREDITS
                  </div>
                </div>
                <MobileMenuAction
                  onAction={() => navigate("/generator")}
                  toggleId={mobileToggleId}
                  className="w-full py-3 text-center font-bold border-2 border-black bg-white hover:bg-black hover:text-white transition-colors"
                >
                  CONSOLE
                </MobileMenuAction>
                <MobileMenuAction
                  onAction={onLogout}
                  toggleId={mobileToggleId}
                  className="border-2 border-black py-3 flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white transition-colors"
                >
                  <LogOut size={16} />
                  SIGN_OUT
                </MobileMenuAction>
              </>
            ) : (
              <MobileMenuAction
                onAction={onOpenAuth}
                toggleId={mobileToggleId}
                className="w-full py-3 text-base font-bold border-2 border-black bg-[#FFDE00] hover:bg-black hover:text-white transition-colors"
              >
                JOIN_CULT
              </MobileMenuAction>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
});
