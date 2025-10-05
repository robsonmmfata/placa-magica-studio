import { Facebook, Instagram } from "lucide-react";
import logowhatsapp from "@/logowhatsapp.png";

export const FloatingSocialButtons = () => {
  return (
    <div className="fixed right-2 sm:right-4 top-1/3 flex flex-col gap-2 sm:gap-4 z-50">
      {[
        {
          href: "https://facebook.com/casadasplacas",
          icon: <Facebook className="w-7 h-7 sm:w-9 sm:h-9" />,
          label: "Nosso Facebook",
          color: "bg-blue-600",
        },
        {
          href: "https://instagram.com/casadasplacas",
          icon: <Instagram className="w-6 h-6 sm:w-8 sm:h-8" />,
          label: "Nosso Instagram",
          color: "bg-pink-500",
        },
        {
          href: "https://wa.me/5527996860022",
          icon: <img src={logowhatsapp} alt="WhatsApp" className="w-11 h-11 sm:w-12 sm:h-12" />,
          label: "Nosso WhatsApp",
          color: "bg-green-500",
        },
      ].map((item, index) => (
        <a
          key={index}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${item.color} text-white flex items-center gap-2 px-1.5 py-1.5 sm:px-2 sm:py-2 rounded-l-full transform transition-all duration-300 group hover:pl-4 sm:hover:pl-6`}
        >
          {item.icon}
          <span className="hidden group-hover:inline text-xs sm:text-sm font-medium whitespace-nowrap">
            {item.label}
          </span>
        </a>
      ))}
    </div>
  );
};
