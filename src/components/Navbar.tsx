import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import Logo from "./Logo";
import { Github, ArrowRight, Menu, X } from "lucide-react";

interface NavbarProps {
  onLaunchDemo: () => void;
  activeSection: string;
}

export default function Navbar({ onLaunchDemo, activeSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 30);
  });

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Features", href: "#features" },
    { name: "Architecture", href: "#architecture" },
    { name: "Dashboard", href: "#dashboard" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-7xl mx-auto transition-all duration-300 ${
          isScrolled
            ? "py-2 bg-white/72 backdrop-blur-[24px] border border-[#E6EEF3] shadow-[0_20px_60px_rgba(16,42,67,0.08)]"
            : "py-3.5 bg-white/50 backdrop-blur-[16px] border border-[#DCE7EE]/60 shadow-[0_10px_40px_rgba(16,42,67,0.04)]"
        } rounded-full`}
        id="synapse-navbar"
      >
        <div className="w-full px-6 md:px-8 flex items-center justify-between">
          {/* Logo & Brand */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, "#home")}
            className="flex items-center gap-3 group relative cursor-pointer"
            id="nav-logo"
          >
            <Logo size={32} animate={true} />
            <span className="font-sans font-semibold tracking-[0.15em] text-xs text-[#102A43] uppercase">
              Synapse
            </span>
            {/* Ambient Logo Underglow */}
            <div className="absolute -inset-1.5 bg-[#2563EB]/5 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </a>

          {/* Nav Links (Desktop) */}
          <div className="hidden md:flex items-center gap-1 bg-white/[0.01] border border-[#E6EEF3] px-1.5 py-0.5 rounded-full backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="relative px-4 py-1 text-[11px] font-sans font-bold tracking-wider uppercase transition-colors duration-300"
                  style={{
                    color: isActive ? "#2563EB" : "#52667A",
                  }}
                >
                  {/* Sliding active bubble under link */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBubble"
                      className="absolute inset-0 bg-[#2563EB]/6 border border-[#2563EB]/15 rounded-full z-[-1]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Action Links & CTAs (Desktop) */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-[11px] font-sans font-bold tracking-wider uppercase text-[#52667A] hover:text-[#102A43] transition-colors duration-200"
              title="GitHub Repository"
              id="github-link"
            >
              GitHub
            </a>

            {/* Launch App Button - Premium Gradient */}
            <button
              onClick={onLaunchDemo}
              style={{
                background: "linear-gradient(135deg, #2563EB, #22C97E)",
              }}
              className="text-white px-5 py-2.5 rounded-full text-[11px] font-sans font-bold uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all duration-300 shadow-[0_4px_20px_rgba(37,99,235,0.25)] hover:shadow-[0_4px_24px_rgba(34,201,126,0.35)] cursor-pointer hover:scale-[1.03]"
              id="nav-launch-btn"
            >
              Launch App
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-[#52667A] hover:text-[#102A43] transition-colors cursor-pointer"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 pt-24 pb-8 px-6 bg-[#F8FBFD]/98 backdrop-blur-2xl z-40 border-b border-[#E6EEF3] flex flex-col justify-between md:hidden"
            id="mobile-drawer"
          >
            <div className="flex flex-col gap-5">
              {navLinks.map((link, idx) => (
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-base font-sans font-bold tracking-widest text-[#52667A] hover:text-[#2563EB] uppercase py-2 border-b border-[#E6EEF3]"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-3 bg-white border border-[#DCE7EE] rounded-xl text-[#52667A] hover:text-[#102A43] font-mono text-xs uppercase tracking-widest"
              >
                <Github size={14} />
                Source Code
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLaunchDemo();
                }}
                style={{
                  background: "linear-gradient(135deg, #2563EB, #22C97E)",
                }}
                className="w-full py-3.5 rounded-xl text-white font-sans font-bold tracking-widest text-xs uppercase text-center cursor-pointer transition-all duration-300 hover:scale-[1.03] shadow-[0_4px_20px_rgba(37,99,235,0.2)]"
              >
                Launch App
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
