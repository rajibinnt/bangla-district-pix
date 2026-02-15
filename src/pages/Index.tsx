import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, MapPin } from "lucide-react";
import BangladeshMap from "@/components/BangladeshMap";
import { districts } from "@/data/districts";

const Index = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = districts.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.bangla.includes(search) ||
      d.division.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="text-center pt-10 pb-6 px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl md:text-5xl font-bold text-foreground tracking-tight"
        >
          বাংলাদেশ
          <span className="text-primary"> Gallery Map</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground mt-3 text-sm md:text-base max-w-md mx-auto"
        >
          Explore 64 districts through photos. Hover to preview, click to explore.
        </motion.p>
      </header>

      {/* Map */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="max-w-4xl mx-auto px-4"
      >
        <BangladeshMap />
      </motion.section>

      {/* District search & grid */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="relative max-w-md mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search districts..."
            className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 font-body text-sm"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filtered.map((district, i) => (
            <motion.button
              key={district.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.01 }}
              onClick={() => navigate(`/district/${district.id}`)}
              className="group bg-card border border-border rounded-lg p-3 text-left hover:border-primary/50 hover:bg-secondary transition-all duration-200"
            >
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-display text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-tight">
                    {district.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{district.bangla}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground text-sm mt-8">No districts found.</p>
        )}
      </section>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Bangladesh District Gallery Map • 64 Districts
        </p>
      </footer>
    </div>
  );
};

export default Index;
