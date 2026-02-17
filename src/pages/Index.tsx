import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Mail,
  Phone,
  Download,
  Globe,
  Laptop,
  Headphones,
  Briefcase,
  GraduationCap,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import BangladeshMap from "@/components/BangladeshMap";
import { districts } from "@/data/districts";
import { portfolioData } from "@/data/portfolio";
import profileImg from "@/assets/rajib.jpg";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5 },
};

const serviceIcons: Record<string, React.ReactNode> = {
  globe: <Globe className="w-6 h-6" />,
  laptop: <Laptop className="w-6 h-6" />,
  headphones: <Headphones className="w-6 h-6" />,
};

const Index = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const p = portfolioData;

  const visitedDistrictIds = districts
    .filter((d) => p.visitedDistricts.includes(d.name))
    .map((d) => d.id);

  const filtered = districts.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.bangla.includes(search) ||
      d.division.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <span className="font-display font-bold text-foreground text-lg">
            R<span className="text-primary">.</span>
          </span>
          <div className="hidden md:flex items-center gap-6 text-sm font-body">
            {["About", "Skills", "Services", "Experience", "Works", "Map", "Contact"].map(
              (s) => (
                <a
                  key={s}
                  href={`#${s.toLowerCase()}`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {s}
                </a>
              )
            )}
          </div>
          <a
            href={p.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-body bg-primary text-primary-foreground px-3 py-1.5 rounded-md hover:opacity-90 transition-opacity"
          >
            <Download className="w-3.5 h-3.5" /> Resume
          </a>
        </div>
      </nav>

      {/* Hero */}
      <header className="pt-28 pb-16 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative shrink-0"
          >
            <div className="w-44 h-44 md:w-56 md:h-56 rounded-2xl overflow-hidden border-2 border-primary/30 shadow-lg shadow-primary/10">
              <img src={profileImg} alt={p.name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-primary rounded-full border-4 border-background" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <p className="text-primary font-body text-sm mb-2">Hello, I'm</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-tight">
              {p.name}
            </h1>
            <p className="text-muted-foreground mt-3 text-base md:text-lg font-body max-w-lg">
              {p.tagline}
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href={`mailto:${p.email}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" /> {p.email}
              </a>
            </div>
          </motion.div>
        </div>
      </header>

      {/* About */}
      <section id="about" className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">
              About <span className="text-primary">Me</span>
            </h2>
            <p className="text-muted-foreground font-body leading-relaxed">{p.about}</p>

            <div className="grid grid-cols-3 gap-4 mt-10">
              {p.stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-card border border-border rounded-lg p-5 text-center"
                >
                  <p className="font-display text-2xl font-bold text-primary">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-16 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="font-display text-2xl font-bold text-foreground mb-8">
              My <span className="text-primary">Skills</span>
            </h2>
            <div className="space-y-5">
              {p.skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-sm font-body text-foreground">{skill.name}</span>
                    <span className="text-xs text-muted-foreground">{skill.percent}%</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="font-display text-2xl font-bold text-foreground mb-8">
              My <span className="text-primary">Services</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {p.services.map((svc) => (
                <div
                  key={svc.title}
                  className="bg-card border border-border rounded-lg p-6 hover:border-primary/40 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    {serviceIcons[svc.icon]}
                  </div>
                  <h3 className="font-display text-base font-semibold text-foreground mb-2">
                    {svc.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {svc.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience & Education */}
      <section id="experience" className="py-16 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="font-display text-2xl font-bold text-foreground mb-8">
              Experience & <span className="text-primary">Education</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground mb-4">
                  <Briefcase className="w-5 h-5 text-primary" /> Work
                </h3>
                <div className="space-y-4">
                  {p.experience.map((exp) => (
                    <div
                      key={exp.title}
                      className="border-l-2 border-primary/30 pl-4"
                    >
                      <span className="text-xs text-primary font-body">{exp.period}</span>
                      <h4 className="font-display text-sm font-semibold text-foreground mt-0.5">
                        {exp.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground mb-4">
                  <GraduationCap className="w-5 h-5 text-primary" /> Education
                </h3>
                <div className="space-y-4">
                  {p.education.map((edu) => (
                    <div
                      key={edu.title}
                      className="border-l-2 border-primary/30 pl-4"
                    >
                      <span className="text-xs text-primary font-body">{edu.period}</span>
                      <h4 className="font-display text-sm font-semibold text-foreground mt-0.5">
                        {edu.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">{edu.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Recent Works */}
      <section id="works" className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="font-display text-2xl font-bold text-foreground mb-8">
              Recent <span className="text-primary">Works</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {p.works.map((work) => (
                <div
                  key={work.title}
                  className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary/40 transition-colors"
                >
                  <div className="aspect-[4/3] bg-secondary overflow-hidden">
                    <img
                      src={work.image}
                      alt={work.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3">
                    <span className="text-[10px] text-primary font-body">{work.tech}</span>
                    <h3 className="font-display text-sm font-medium text-foreground mt-0.5 leading-tight">
                      {work.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bangladesh Map - Visited Places */}
      <section id="map" className="py-16 px-4 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              Places I've <span className="text-primary">Visited</span>
            </h2>
            <p className="text-muted-foreground text-sm mb-8 max-w-md">
              Explore Bangladesh through my lens. Click on highlighted districts to see my photos.
            </p>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <BangladeshMap highlightDistricts={visitedDistrictIds} />
          </motion.div>

          {/* District grid */}
          <div className="mt-10">
            <div className="relative max-w-md mx-auto mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search districts..."
                className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 font-body text-sm"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {filtered.map((district, i) => {
                const isVisited = p.visitedDistricts.includes(district.name);
                return (
                  <motion.button
                    key={district.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.008 }}
                    onClick={() => navigate(`/district/${district.id}`)}
                    className={`group bg-card border rounded-lg p-2.5 text-left transition-all duration-200 ${
                      isVisited
                        ? "border-primary/40 hover:border-primary"
                        : "border-border hover:border-border"
                    }`}
                  >
                    <div className="flex items-start gap-1.5">
                      <MapPin
                        className={`w-3 h-3 mt-0.5 shrink-0 ${
                          isVisited ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                      <div>
                        <p
                          className={`font-display text-xs font-medium leading-tight ${
                            isVisited
                              ? "text-foreground group-hover:text-primary"
                              : "text-muted-foreground"
                          } transition-colors`}
                        >
                          {district.name}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          {district.bangla}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="font-display text-2xl font-bold text-foreground mb-8">
              Get In <span className="text-primary">Touch</span>
            </h2>
            <div className="bg-card border border-border rounded-lg p-8">
              <p className="text-muted-foreground font-body mb-6">
                Let's talk about everything! Don't hesitate to reach out.
              </p>
              <div className="space-y-4">
                <a
                  href={`mailto:${p.email}`}
                  className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-body">{p.email}</p>
                  </div>
                </a>
                <a
                  href={`tel:${p.phone}`}
                  className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-sm font-body">{p.phone}</p>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-border">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {p.name} • Built with ❤️
        </p>
      </footer>
    </div>
  );
};

export default Index;
