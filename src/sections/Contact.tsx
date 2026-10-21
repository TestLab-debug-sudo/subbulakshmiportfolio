import { useState } from 'react';
import { Mail, Phone, Globe, Send, Copy, Check, AlertCircle, ArrowUpRight } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { profileData } from '../data/profile';

function GithubIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '', // Spam protection
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name.';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.subject.trim()) errs.subject = 'Please provide a message subject.';
    if (!formData.message.trim()) errs.message = 'Please enter your message.';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check honeypot spam bot filter
    if (formData.honeypot) {
      return;
    }

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitStatus('sending');

    // Compose mailto url for seamless direct recipient delivery
    const mailtoSubject = encodeURIComponent(`[Portfolio Inquiry] ${formData.subject}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
    );
    const mailtoLink = `mailto:${profileData.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

    setTimeout(() => {
      // Open native client or fallback
      window.location.href = mailtoLink;
      setSubmitStatus('success');
      setStatusMessage(
        'Your message was prepared in your email client! You can also email directly at subbulakshmi0k27@gmail.com.',
      );
      setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
    }, 600);
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="GET IN TOUCH"
          title="Let's Connect & Build Together"
          description="Interested in collaborating, hiring for full stack opportunities, or discussing software architecture? Reach out through any channel below."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-5xl mx-auto mt-12 items-start">
          {/* Left Column: Direct Contact Channels (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Email Card with 1-Click Copy */}
            <div className="p-5 rounded-2xl bg-slate-900/60 dark:bg-slate-900/60 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200/90 shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-950/60 text-cyan-400 border border-cyan-800/60">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase text-slate-400">Direct Email</div>
                    <a
                      href={`mailto:${profileData.email}`}
                      className="text-xs sm:text-sm font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 hover:text-cyan-400 transition-colors truncate block max-w-[180px] sm:max-w-none"
                    >
                      {profileData.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors cursor-pointer"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {copiedEmail && (
                <div className="mt-2 text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Email address copied to clipboard!
                </div>
              )}
            </div>

            {/* Phone Card */}
            <div className="p-5 rounded-2xl bg-slate-900/60 dark:bg-slate-900/60 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200/90 shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-teal-950/60 text-teal-400 border border-teal-800/60">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase text-slate-400">Call / WhatsApp</div>
                    <a
                      href={`tel:${profileData.phone}`}
                      className="text-sm font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 hover:text-teal-400 transition-colors"
                    >
                      {profileData.phoneDisplay}
                    </a>
                  </div>
                </div>
                <a
                  href={`tel:${profileData.phone}`}
                  className="p-2 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 text-slate-400 hover:text-teal-400 hover:border-teal-500/40 transition-colors"
                  title="Call phone number"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* GitHub Profile Card */}
            <div className="p-5 rounded-2xl bg-slate-900/60 dark:bg-slate-900/60 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200/90 shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-800 text-slate-200 border border-slate-700">
                    <GithubIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase text-slate-400">GitHub Profile</div>
                    <a
                      href={profileData.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 hover:text-cyan-400 transition-colors"
                    >
                      {profileData.githubDisplay}
                    </a>
                  </div>
                </div>
                <a
                  href={profileData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Live Portfolio Card */}
            <div className="p-5 rounded-2xl bg-slate-900/60 dark:bg-slate-900/60 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200/90 shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-indigo-950/60 text-indigo-400 border border-indigo-800/60">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase text-slate-400">Production Web</div>
                    <a
                      href={profileData.portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 hover:text-indigo-400 transition-colors"
                    >
                      protfoliomee.netlify.app
                    </a>
                  </div>
                </div>
                <a
                  href={profileData.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 text-slate-400 hover:text-indigo-400 transition-colors"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/70 dark:bg-slate-900/70 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 shadow-xl backdrop-blur-sm">
              <h3 className="text-lg font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 mb-2">
                Send a Message
              </h3>
              <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 mb-6">
                Fill in the details below to initiate an email directly to Subbulakshmi K.
              </p>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 text-xs flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block mb-0.5">Success!</span>
                    {statusMessage}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot hidden input for spam protection */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                      Your Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Johnson"
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-300 text-slate-100 dark:text-slate-100 light:text-slate-900 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/70 focus:ring-1 focus:ring-cyan-500/50 transition-colors"
                    />
                    {errors.name && (
                      <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email field */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                      Email Address <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. alex@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-300 text-slate-100 dark:text-slate-100 light:text-slate-900 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/70 focus:ring-1 focus:ring-cyan-500/50 transition-colors"
                    />
                    {errors.email && (
                      <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject field */}
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                    Subject <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Software Developer Opportunity / Project Inquiry"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-300 text-slate-100 dark:text-slate-100 light:text-slate-900 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/70 focus:ring-1 focus:ring-cyan-500/50 transition-colors"
                  />
                  {errors.subject && (
                    <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message field */}
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                    Message <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your role or project inquiry..."
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-300 text-slate-100 dark:text-slate-100 light:text-slate-900 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/70 focus:ring-1 focus:ring-cyan-500/50 transition-colors resize-none"
                  />
                  {errors.message && (
                    <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={submitStatus === 'sending'}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 text-slate-950 hover:brightness-110 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5 text-slate-950" />
                  <span>{submitStatus === 'sending' ? 'Preparing Email...' : 'Send Message'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
