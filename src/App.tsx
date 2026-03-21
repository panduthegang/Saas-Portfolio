import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ArrowUpRight,
  Globe,
  Cpu,
  Layers,
  Code2,
  Terminal,
  Award,
  ShieldCheck
} from "lucide-react";
import { DATA } from "./constants";
import { useRef, useState, useEffect } from "react";

const SectionHeader = ({ title, number }: { title: string; number: string }) => (
  <div className="flex items-baseline gap-4 border-b border-muted/20 pb-4 mb-12">
    <span className="font-mono text-xs text-muted">{number}</span>
    <h2 className="font-serif italic text-4xl md:text-5xl text-ink">{title}</h2>
  </div>
);

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const menuVars = {
    initial: { scaleY: 0 },
    animate: { scaleY: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
    exit: { scaleY: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 } }
  };

  const linkVars = {
    initial: { y: "100%", rotate: 5 },
    open: { y: 0, rotate: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
    exit: { y: "100%", rotate: -5, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  const containerVars = {
    initial: { transition: { staggerChildren: 0.09, staggerDirection: -1 } },
    open: { transition: { delayChildren: 0.3, staggerChildren: 0.09, staggerDirection: 1 } },
    exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-6 flex justify-between items-center bg-bg/70 backdrop-blur-lg border-b border-muted/10">
        <a href="#" className="flex items-center gap-3 group">
          <span className="font-serif italic text-2xl text-ink group-hover:text-accent transition-colors">Harsh Rathod</span>
          <span className="font-mono text-[10px] text-muted hidden sm:inline-block tracking-widest uppercase mt-1">/ 2026</span>
        </a>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="font-mono text-[10px] tracking-widest uppercase text-ink hover:text-bg hover:bg-ink transition-all px-6 py-2.5 rounded-full border border-ink/20"
        >
          {isOpen ? "Close" : "Menu"}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 bg-ink text-bg z-40 flex flex-col justify-center items-center origin-top"
          >
            <motion.div
              variants={containerVars}
              initial="initial"
              animate="open"
              exit="exit"
              className="flex flex-col items-center gap-4 md:gap-8"
            >
              {["Work", "About", "Contact"].map((item, i) => (
                <div key={i} className="overflow-hidden py-2">
                  <motion.a
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setIsOpen(false)}
                    variants={linkVars}
                    className="text-6xl md:text-8xl lg:text-9xl font-serif italic tracking-tighter hover:text-accent transition-colors inline-block origin-bottom-left"
                  >
                    {item}
                  </motion.a>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="absolute bottom-12 flex gap-8 font-mono text-xs uppercase tracking-widest opacity-50"
            >
              <a href={DATA.links.linkedin} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">LinkedIn</a>
              <a href={DATA.links.github} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">GitHub</a>
              <a href={`mailto:${DATA.email}`} className="hover:text-accent transition-colors">Email</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default function App() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div ref={containerRef} className="relative min-h-screen vintage-grid overflow-x-hidden">
      <div className="noise" />
      <Nav />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-between px-6 md:px-12 pt-32 pb-12 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 flex items-center justify-center -z-10 opacity-[0.02]">
          <h1 className="text-[50vw] font-serif italic tracking-tighter select-none">HR</h1>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="font-mono text-[10px] md:text-[12px] uppercase tracking-[0.6em] text-muted mb-8"
            >
              Portfolio v.2026 — Software Engineer
            </motion.div>

            <h1 className="text-[22vw] sm:text-[18vw] lg:text-[15vw] font-serif leading-[0.75] tracking-tighter italic text-ink mb-12">
              Harsh<br />Rathod
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="max-w-2xl mx-auto"
            >
              <p className="text-lg md:text-xl font-light leading-relaxed text-muted mb-12 px-4">
                Crafting <span className="font-serif italic text-accent underline decoration-accent/30 underline-offset-8">intelligent systems</span> and
                <span className="font-serif italic text-accent underline decoration-accent/30 underline-offset-8"> immersive interfaces</span>.
                Bridging the gap between complex AI logic and human-centric design.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4 px-6">
                <a href="#work" className="px-10 py-5 bg-ink text-bg rounded-full font-mono text-[10px] uppercase tracking-widest hover:bg-accent transition-all duration-500 hover:scale-105 active:scale-95 shadow-xl shadow-ink/10">
                  Explore Work
                </a>
                <a href="#contact" className="px-10 py-5 border border-muted/30 text-ink rounded-full font-mono text-[10px] uppercase tracking-widest hover:bg-ink hover:text-bg transition-all duration-500 hover:scale-105 active:scale-95">
                  Get in touch
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12 border-t border-muted/20 pt-12 items-center text-center">
          <div className="space-y-2">
            <p className="font-mono text-[9px] text-muted uppercase tracking-widest">Current Role</p>
            <p className="text-sm font-medium text-ink">Software Dev Intern @ Esamyak</p>
          </div>
          <div className="space-y-2">
            <p className="font-mono text-[9px] text-muted uppercase tracking-widest">Location</p>
            <p className="text-sm font-medium text-ink">Mumbai, Maharashtra, IN</p>
          </div>
          <div className="space-y-2 hidden md:block">
            <p className="font-mono text-[9px] text-muted uppercase tracking-widest">Availability</p>
            <div className="flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-sm font-medium text-ink">Open for Opportunities</p>
            </div>
          </div>
          <div className="space-y-2 hidden lg:block">
            <p className="font-mono text-[9px] text-muted uppercase tracking-widest">Local Time</p>
            <p className="text-sm font-medium text-ink tabular-nums">
              {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })} IST
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="work" className="px-6 md:px-12 py-32">
        <SectionHeader title="Selected Works" number="01" />

        <div className="grid grid-cols-1 gap-32">
          {DATA.projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-12"
            >
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-mono text-xs px-3 py-1 border border-muted/30 rounded-full text-muted">
                      {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </span>
                    <div className="flex gap-2">
                      {project.tech.slice(0, 3).map(t => (
                        <span key={t} className="font-mono text-[10px] text-muted uppercase tracking-widest">{t}</span>
                      ))}
                    </div>
                  </div>
                  <h3 className="text-5xl md:text-7xl font-serif italic mb-4 text-ink group-hover:translate-x-4 transition-transform duration-500">
                    {project.title}
                  </h3>
                  <p className="text-xl text-muted mb-8 font-light italic">{project.subtitle}</p>
                  <ul className="space-y-4 mb-12">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="flex gap-4 text-sm leading-relaxed text-ink/80">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest group/link"
                >
                  View Case Study
                  <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                </a>
              </div>

              <div className="lg:col-span-7 relative aspect-[16/10] bg-accent/5 overflow-hidden rounded-2xl border border-muted/10">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:scale-110 transition-transform duration-1000">
                    {idx === 0 && <Globe className="w-48 h-48 stroke-[0.5] text-accent" />}
                    {idx === 1 && <Cpu className="w-48 h-48 stroke-[0.5] text-accent" />}
                    {idx === 2 && <Layers className="w-48 h-48 stroke-[0.5] text-accent" />}
                  </div>
                )}
                <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 flex justify-between items-end">
                  <div className="font-mono text-[8px] md:text-[10px] text-muted uppercase vertical-rl rotate-180 hidden sm:block">
                    Project_ID: {project.title.toUpperCase()}_00{idx}
                  </div>
                  <div className="text-right w-full sm:w-auto">
                    <p className="font-mono text-[8px] md:text-[10px] text-muted uppercase mb-2 hidden sm:block">Technologies</p>
                    <div className="flex flex-wrap justify-end gap-1.5 md:gap-2 sm:max-w-xs">
                      {project.tech.map(t => (
                        <span key={t} className="px-1.5 py-0.5 md:px-2 md:py-1 bg-accent text-bg text-[7px] md:text-[9px] uppercase tracking-tighter">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Experience & Skills */}
      <section id="about" className="px-6 md:px-12 py-32 bg-bg text-ink relative border-t border-muted/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-7">
            <SectionHeader title="Experience" number="02" />
            <div className="space-y-16 md:space-y-24">
              {DATA.experience.map((exp) => (
                <div key={exp.company} className="relative pl-8 md:pl-12 border-l border-muted/20">
                  <div className="absolute top-0 left-0 -translate-x-1/2 w-3 h-3 rounded-full bg-accent" />
                  <p className="font-mono text-[10px] md:text-xs text-muted mb-4 uppercase tracking-widest">{exp.period}</p>
                  <h3 className="text-3xl md:text-4xl font-serif italic mb-2 text-ink">{exp.role}</h3>
                  <p className="text-lg md:text-xl text-muted mb-6 md:mb-8">{exp.company} — {exp.location}</p>
                  <ul className="space-y-4">
                    {exp.description.map((d, i) => (
                      <li key={i} className="text-sm leading-relaxed text-ink/80 font-light">
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeader title="Technical Stack" number="03" />
              <div className="space-y-12">
                <div>
                  <h4 className="font-mono text-[10px] md:text-xs text-muted uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Code2 className="w-4 h-4" /> Languages
                  </h4>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {DATA.skills.languages.map(s => (
                      <span key={s} className="px-3 md:px-4 py-1.5 md:py-2 border border-muted/20 rounded-full text-xs md:text-sm font-light text-ink hover:bg-accent hover:text-bg transition-all cursor-default">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-mono text-[10px] md:text-xs text-muted uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Terminal className="w-4 h-4" /> Frameworks
                  </h4>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {DATA.skills.frameworks.map(s => (
                      <span key={s} className="px-3 md:px-4 py-1.5 md:py-2 border border-muted/20 rounded-full text-xs md:text-sm font-light text-ink hover:bg-accent hover:text-bg transition-all cursor-default">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-mono text-[10px] md:text-xs text-muted uppercase tracking-widest mb-6 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" /> Certifications
                  </h4>
                  <div className="space-y-3">
                    {DATA.certifications.map(c => (
                      <div key={c} className="text-xs md:text-sm text-ink/70 font-light flex items-center gap-3">
                        <span className="w-1 h-1 bg-accent rounded-full" />
                        {c}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-32">
          <SectionHeader title="Achievements & Certificates" number="04" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {DATA.achievements.map((ach) => (
              <div key={ach.title} className="group flex flex-col">
                <div className="relative aspect-[4/3] mb-6 overflow-hidden rounded-xl border border-muted/20 bg-accent/5">
                  <img
                    src={ach.image}
                    alt={ach.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-all duration-700 scale-100 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ArrowUpRight className="w-12 h-12 text-bg" />
                  </div>
                </div>
                <h4 className="text-xl font-serif italic mb-2 text-ink">{ach.title}</h4>
                <p className="text-sm text-muted leading-relaxed">{ach.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="px-6 md:px-12 py-32 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted mb-8">Ready to collaborate?</p>
          <h2 className="text-6xl md:text-9xl font-serif italic mb-16 tracking-tighter text-ink">
            Let's build<br />something great.
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-24">
          <a href={`mailto:${DATA.email}`} className="group flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full border border-muted/20 flex items-center justify-center group-hover:bg-accent group-hover:text-bg transition-all duration-500">
              <Mail className="w-6 h-6" />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted">Email</span>
          </a>
          <a href={DATA.links.linkedin} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full border border-muted/20 flex items-center justify-center group-hover:bg-accent group-hover:text-bg transition-all duration-500">
              <Linkedin className="w-6 h-6" />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted">LinkedIn</span>
          </a>
          <a href={DATA.links.github} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full border border-muted/20 flex items-center justify-center group-hover:bg-accent group-hover:text-bg transition-all duration-500">
              <Github className="w-6 h-6" />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted">GitHub</span>
          </a>
        </div>

        <div className="w-full border-t border-muted/20 pt-12 flex flex-col md:flex-row justify-between items-center gap-8 font-mono text-[10px] text-muted uppercase tracking-widest">
          <p>© 2026 Harsh Rathod. All rights reserved.</p>
          <div className="flex gap-8">
            <p>Built with React</p>
            <p>Mumbai, India</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
