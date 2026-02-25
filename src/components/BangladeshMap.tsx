import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { districts, District, divisionColors } from "@/data/districts";

interface BangladeshMapProps {
  highlightDistricts?: string[];
}

const SVG_VB_W = 1655.4;
const SVG_VB_H = 2224.5;

const BangladeshMap = ({ highlightDistricts }: BangladeshMapProps) => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const [hoveredDistrict, setHoveredDistrict] = useState<District | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [svgLoaded, setSvgLoaded] = useState(false);
  const [svgRect, setSvgRect] = useState<{ left: number; top: number; width: number; height: number } | null>(null);

  const updateSvgRect = useCallback(() => {
    if (!svgContainerRef.current) return;
    const svgEl = svgContainerRef.current.querySelector("svg");
    if (!svgEl) return;
    const containerRect = svgContainerRef.current.getBoundingClientRect();
    const svgBBox = svgEl.getBoundingClientRect();
    setSvgRect({
      left: svgBBox.left - containerRect.left,
      top: svgBBox.top - containerRect.top,
      width: svgBBox.width,
      height: svgBBox.height,
    });
  }, []);

  useEffect(() => {
    fetch("/bangladesh-map.svg")
      .then((r) => r.text())
      .then((svgText) => {
        if (!svgContainerRef.current) return;
        svgContainerRef.current.innerHTML = svgText;
        const svgEl = svgContainerRef.current.querySelector("svg");
        if (svgEl) {
          svgEl.setAttribute("width", "100%");
          svgEl.setAttribute("height", "100%");
          svgEl.style.maxHeight = "70vh";

          const paths = svgEl.querySelectorAll("path");
          paths.forEach((p) => {
            const cls = p.getAttribute("class") || "";
            if (cls.includes("cls-14") || cls.includes("cls-12") || cls.includes("cls-13")) {
              p.style.fill = "none";
              p.style.stroke = "hsl(160, 40%, 25%)";
              p.style.strokeWidth = cls.includes("cls-14") ? "3" : "1";
              p.style.opacity = "0.6";
            } else if (cls.includes("cls-10")) {
              p.style.fill = "none";
              p.style.stroke = "none";
            } else if (cls.includes("cls-18")) {
              p.style.fill = "hsl(160, 80%, 50%)";
              p.style.stroke = "none";
            } else {
              p.style.fill = "hsl(160, 30%, 12%)";
              p.style.stroke = "hsl(160, 40%, 22%)";
              p.style.strokeWidth = "1";
              p.style.transition = "fill 0.3s, stroke 0.3s";
              p.style.cursor = "pointer";

              p.addEventListener("mouseenter", () => {
                p.style.fill = "hsl(160, 50%, 20%)";
                p.style.stroke = "hsl(160, 60%, 40%)";
              });
              p.addEventListener("mouseleave", () => {
                p.style.fill = "hsl(160, 30%, 12%)";
                p.style.stroke = "hsl(160, 40%, 22%)";
              });
            }
          });

          const texts = svgEl.querySelectorAll("text");
          texts.forEach((t) => (t.style.display = "none"));

          svgEl.querySelectorAll("rect, polygon").forEach((el) => {
            (el as SVGElement).style.display = "none";
          });

          svgEl.querySelectorAll("sodipodi\\:namedview, [id^='namedview']").forEach((el) => {
            (el as SVGElement).style.display = "none";
          });
        }
        setSvgLoaded(true);
        // Wait for render then measure
        requestAnimationFrame(() => updateSvgRect());
      });
  }, [updateSvgRect]);

  useEffect(() => {
    if (!svgLoaded) return;
    window.addEventListener("resize", updateSvgRect);
    return () => window.removeEventListener("resize", updateSvgRect);
  }, [svgLoaded, updateSvgRect]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const visibleDistricts = districts;

  return (
    <div className="relative w-full flex justify-center" ref={containerRef} onMouseMove={handleMouseMove}>
      <div
        ref={svgContainerRef}
        className="relative w-full max-w-2xl map-glow"
        style={{ minHeight: "350px" }}
      />

      {svgLoaded && svgRect && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="relative w-full max-w-2xl mx-auto h-full">
            {visibleDistricts.map((district) => {
              // Convert viewBox coords to pixel position within the SVG rendered area
              const pxX = svgRect.left + (district.x / 100) * SVG_VB_W / SVG_VB_W * svgRect.width;
              const pxY = svgRect.top + (district.y / 100) * SVG_VB_H / SVG_VB_H * svgRect.height;

              return (
                <motion.button
                  key={district.id}
                  className="absolute pointer-events-auto z-10"
                  style={{
                    left: `${pxX}px`,
                    top: `${pxY}px`,
                    transform: "translate(-50%, -50%)",
                  }}
                  onMouseEnter={() => setHoveredDistrict(district)}
                  onMouseLeave={() => setHoveredDistrict(null)}
                  onClick={() => navigate(`/district/${district.id}`)}
                  whileHover={{ scale: 1.5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className="relative">
                    <div
                      className="w-3 h-3 rounded-full border border-primary/50"
                      style={{ backgroundColor: divisionColors[district.division] }}
                    />
                    <div
                      className="absolute inset-0 rounded-full dot-pulse"
                      style={{
                        backgroundColor: divisionColors[district.division],
                        opacity: 0.4,
                      }}
                    />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      )}

      <AnimatePresence>
        {hoveredDistrict && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="fixed z-50 pointer-events-none"
            style={{
              left: tooltipPos.x + (containerRef.current?.getBoundingClientRect().left ?? 0) + 16,
              top: tooltipPos.y + (containerRef.current?.getBoundingClientRect().top ?? 0) - 8,
            }}
          >
            <div className="bg-card border border-border rounded-lg shadow-2xl p-3 min-w-[180px]">
              <p className="font-display font-semibold text-foreground text-sm">
                {hoveredDistrict.name}
              </p>
              <p className="text-muted-foreground text-xs mt-0.5">
                {hoveredDistrict.bangla} • {hoveredDistrict.division}
              </p>
              {hoveredDistrict.images.length > 0 ? (
                <div className="mt-2 rounded-md overflow-hidden aspect-video bg-secondary">
                  <img
                    src={hoveredDistrict.images[0]}
                    alt={hoveredDistrict.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="mt-2 rounded-md overflow-hidden aspect-video bg-secondary flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">No photos yet</span>
                </div>
              )}
              <p className="text-xs text-primary mt-2">Click to explore →</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BangladeshMap;