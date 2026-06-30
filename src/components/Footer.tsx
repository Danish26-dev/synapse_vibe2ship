import React from "react";
import Logo from "./Logo";
import { Github, Linkedin, FileText, ShieldAlert, Globe } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-white border-t border-[#E6EEF3] py-16" id="footer">
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-8 animate-fade-in">
        
        {/* Brand & Logo */}
        <div className="flex items-center gap-3" id="footer-logo">
          <Logo size={32} animate={false} />
          <div className="flex flex-col">
            <span className="font-sans font-bold tracking-[0.15em] text-xs text-[#102A43] uppercase leading-none">
              Synapse
            </span>
            <span className="text-[8px] font-mono text-[#52667A]/50 tracking-widest uppercase mt-1 font-bold">
              Autonomous Cities
            </span>
          </div>
        </div>

        {/* Footer Navigation Links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-[10px] font-mono uppercase tracking-[0.15em] text-[#52667A] font-bold">
          <a href="#how-it-works" className="hover:text-[#2563EB] transition-colors">Documentation</a>
          <a href="#features" className="hover:text-[#2563EB] transition-colors">How It Works</a>
          <a href="#architecture" className="hover:text-[#2563EB] transition-colors">Architecture</a>
          <a href="#dashboard" className="hover:text-[#2563EB] transition-colors">Privacy</a>
          <a href="#footer" className="hover:text-[#2563EB] transition-colors">Terms of Service</a>
        </div>

        {/* Social Icons & Copyright */}
        <div className="flex flex-col items-center md:items-end gap-3" id="footer-socials">
          <div className="flex gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-[#F1F7FA] border border-[#DCE7EE] hover:border-[#22C97E]/40 text-[#52667A] hover:text-[#102A43] hover:bg-white transition-all duration-300 shadow-xs"
              title="GitHub"
            >
              <Github size={14} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-[#F1F7FA] border border-[#DCE7EE] hover:border-[#22C97E]/40 text-[#52667A] hover:text-[#102A43] hover:bg-white transition-all duration-300 shadow-xs"
              title="LinkedIn"
            >
              <Linkedin size={14} />
            </a>
            <a
              href="https://google.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-[#F1F7FA] border border-[#DCE7EE] hover:border-[#22C97E]/40 text-[#52667A] hover:text-[#102A43] hover:bg-white transition-all duration-300 shadow-xs"
              title="Global Gateway"
            >
              <Globe size={14} />
            </a>
          </div>
          <span className="text-[9px] font-mono text-[#52667A]/40 uppercase tracking-widest font-semibold">
            &copy; {currentYear} Synapse Technologies Inc. All rights reserved.
          </span>
        </div>

      </div>
    </footer>
  );
}
