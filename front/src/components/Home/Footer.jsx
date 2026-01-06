import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const year = new Date().getFullYear();

  const LINKS = {
    linkedin: 'https://www.linkedin.com/in/ahmad-reza-abdollahi-66148828a/',
    github: 'https://github.com/RezaAbdollahi2002',
  };

  return (
    <footer className="w-full bg-[#040B17] text-white border-t border-white/10">
      <div className="mx-auto max-w-[1200px] px-4 py-10 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Left: brand */}
          <div className="flex flex-col gap-1">
            <p className="text-base font-semibold tracking-wide text-amber-200">
              Job Tracker
            </p>
            <p className="text-sm text-white/70">
              Track your applications, resumes, and progress in one place.
            </p>
          </div>

          {/* Right: links */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <a
              href={LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/90 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-300"
            >
              <FaLinkedin className="text-lg" />
              LinkedIn
            </a>

            <a
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/90 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-300"
            >
              <FaGithub className="text-lg" />
              GitHub Repo
            </a>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p>© {year} Reza Abdollahi. All rights reserved.</p>
          <p className="text-white/50">
            Built with React + Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
