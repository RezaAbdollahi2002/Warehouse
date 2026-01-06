import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <section className="min-h-screen w-full bg-[#071324] px-4 py-14 text-white">
      <div className="mx-auto w-full max-w-5xl">
        {/* Header */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 md:p-12 shadow-2xl">
          <p className="text-sm font-semibold tracking-wide text-white/70 uppercase">
            About
          </p>

          <h1 className="mt-2 text-3xl md:text-5xl font-extrabold leading-tight">
            Your job search, organized in one place.
          </h1>

          <p className="mt-4 text-base md:text-lg text-gray-200/80 leading-relaxed">
            This application helps you track every job you apply to—from the first submission to
            interviews and follow-ups—while keeping your key information (contact details, links,
            and documents) ready when you need it.
          </p>

          {/* Feature grid */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-lg font-bold">Track Applications</h3>
              <p className="mt-2 text-gray-200/80">
                Save company, role, date applied, status, and notes so you always know where you
                stand.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-lg font-bold">Stay Ahead of Follow-ups</h3>
              <p className="mt-2 text-gray-200/80">
                Keep reminders for interviews, deadlines, and next steps—no more missed follow-ups.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-lg font-bold">Store Your Profile</h3>
              <p className="mt-2 text-gray-200/80">
                Save your personal info, links, and documents to speed up the application process.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-lg font-bold">Simple Dashboard</h3>
              <p className="mt-2 text-gray-200/80">
                View your job pipeline at a glance and quickly filter by status or company.
              </p>
            </div>
          </div>

          {/* Mission + Privacy */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-bold">Our Mission</h3>
              <p className="mt-3 text-gray-200/80 leading-relaxed">
                Make job searching less stressful by giving you clarity and structure. A clean,
                straightforward tracker can help you focus on what matters: improving your
                applications and landing interviews.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-bold">Privacy & Security</h3>
              <p className="mt-3 text-gray-200/80 leading-relaxed">
                Your information should stay yours. Use strong passwords and only upload documents
                you’re comfortable storing. (If you want, I can help you add a real privacy policy
                section based on your backend/auth setup.)
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 flex flex-col sm:flex-row gap-3">

            <Link
              to="/entrygate"
              className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 text-white font-semibold px-6 py-3 hover:bg-white/10 transition"
            >
              Sign In / Create Account
            </Link>
          </div>

          <p className="mt-4 text-xs text-white/60">
            Want this page to match your exact features? Tell me your real modules (Applications,
            Resumes, Cover Letters, Notes, Interview Calendar, etc.) and I’ll tailor the copy.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
