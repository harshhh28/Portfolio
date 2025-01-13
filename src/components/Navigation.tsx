"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/blogs", label: "Blogs" },
    { href: "/contact", label: "Contact" },
    { href: "/news", label: "Tech News" },
  ];

  return (
    <nav className="fixed w-full z-50">
      <div
        className="backdrop-blur-xl bg-gradient-to-r from-black/40 via-black/30 to-black/40 
          border-b border-white/10 
          shadow-lg shadow-black/10 
          transition-all duration-500 
          hover:shadow-xl hover:shadow-black/20 hover:border-white/20
          group">
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 
            transition-opacity duration-500
            bg-gradient-to-r from-white/5 via-transparent to-white/5"
        />
        <div className="max-w-7xl mx-auto px-4 py-4 relative">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold relative group/logo">
              <span
                className="bg-clip-text text-transparent bg-gradient-to-r 
                from-white via-white to-white/70 group-hover/logo:to-white 
                transition-all duration-500">
                Portfolio
              </span>
              <span
                className="absolute -bottom-0.5 left-0 w-0 h-0.5 
                bg-gradient-to-r from-white/50 to-transparent 
                group-hover/logo:w-full transition-all duration-500"
              />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden relative p-2.5 rounded-lg 
                transition-all duration-300 active:scale-95
                hover:bg-white/10 focus:outline-none focus:ring-2 
                focus:ring-white/20 ${isOpen ? "transform rotate-90" : ""}`}>
              <div
                className={`transition-transform duration-300 ${
                  isOpen ? "rotate-35" : ""
                }`}>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex gap-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 
                    relative group/link overflow-hidden
                    ${
                      pathname === link.href
                        ? "text-white font-medium bg-white/10"
                        : "text-white/60 hover:text-white"
                    }`}>
                  <span className="relative z-10">{link.label}</span>
                  <span
                    className={`absolute inset-0 -z-0 rounded-lg
                      transition-all duration-500
                      ${
                        pathname === link.href
                          ? "bg-white/10"
                          : "bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover/link:opacity-100"
                      }`}
                  />
                  <span
                    className="absolute bottom-0 left-0 h-0.5 w-0 
                      bg-gradient-to-r from-white/50 to-transparent
                      group-hover/link:w-full transition-all duration-500"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out
              ${isOpen ? "max-h-[400px] mt-4" : "max-h-0"}`}>
            <div className="flex flex-col gap-2 pb-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-2.5 rounded-lg 
                    transition-all duration-300 relative group/mobile
                    ${
                      pathname === link.href
                        ? "text-white font-medium bg-white/10"
                        : "text-white/60 hover:text-white"
                    }`}>
                  <span className="relative z-10">{link.label}</span>
                  <span
                    className={`absolute inset-0 -z-0 rounded-lg bg-gradient-to-r 
                      from-white/10 to-transparent opacity-0 
                      group-hover/mobile:opacity-100 transition-all duration-300`}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
