import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { Link } from 'react-router-dom';
import Logo from '../../assets/HomeIcon.png';

const HomePageInfo = () => {
  return (
    <section className="w-full min-h-[70vh] flex items-center justify-center px-4 py-14 bg-[#071324]">
      <div className="w-full max-w-6xl">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl">
          {/* subtle glow */}
          <div className="pointer-events-none absolute -top-28 -right-28 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 p-8 md:p-12 items-center">
            {/* Left: Logo + mini badges */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <img
                src={Logo}
                alt="Job Application Tracker"
                className="w-56 md:w-72 h-auto rounded-lg bg-transparent"
              />

              <div className="mt-6 flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="px-3 py-1 text-sm text-white/90 rounded-full bg-white/10 border border-white/10">
                  Organized
                </span>
                <span className="px-3 py-1 text-sm text-white/90 rounded-full bg-white/10 border border-white/10">
                  Fast
                </span>
                <span className="px-3 py-1 text-sm text-white/90 rounded-full bg-white/10 border border-white/10">
                  All-in-one
                </span>
                <span className="px-3 py-1 text-sm text-white/90 rounded-full bg-white/10 border border-white/10">
                  Secure
                </span>
              </div>
            </div>

            {/* Right: Copy */}
            <div>
              <p className="text-sm font-semibold tracking-wide text-white/70 uppercase">
                Job Application Tracker
              </p>

              <h1 className="mt-2 text-3xl md:text-4xl font-extrabold text-white leading-tight">
                <Typewriter
                  words={[
                    'Track every job you apply to.',
                    'Store your resumes and details in one place.',
                    'Stay on top of interviews and follow-ups.',
                  ]}
                  loop
                  cursor
                  cursorStyle="_"
                  typeSpeed={60}
                  deleteSpeed={35}
                  delaySpeed={1400}
                />
              </h1>

              <p className="mt-5 text-base md:text-lg text-gray-200/80 leading-relaxed">
                Keep your job search organized with a simple dashboard that tracks applications,
                statuses, deadlines, and notes—while securely saving your personal information for
                faster applying.
              </p>

              <ul className="mt-6 space-y-3 text-gray-200/90">
                <li className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-white/70" />
                  <span>
                    <span className="font-semibold text-white">Application history</span> — company,
                    role, date applied, and current status.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-white/70" />
                  <span>
                    <span className="font-semibold text-white">Follow-up reminders</span> — don’t
                    miss important next steps and interview dates.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-white/70" />
                  <span>
                    <span className="font-semibold text-white">Saved profile</span> — store your
                    contact details, links, and documents to reuse quickly.
                  </span>
                </li>
              </ul>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/entrygate"
                  className="inline-flex items-center justify-center rounded-lg bg-white text-[#071324] font-semibold px-6 py-3 hover:bg-white/90 transition"
                >
                  Get Started
                </Link>

                <Link
                  to="/about"
                  className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 text-white font-semibold px-6 py-3 hover:bg-white/10 transition"
                >
                  About
                </Link>
              </div>

              <p className="mt-4 text-xs text-white/60">
                Everything stays organized—so you can focus on getting hired.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePageInfo;
