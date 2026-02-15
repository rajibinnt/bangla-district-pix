import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, ImageIcon, Camera } from "lucide-react";
import { getDistrict, divisionColors } from "@/data/districts";
import ImageViewer from "@/components/ImageViewer";

const DistrictDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const district = getDistrict(id || "");
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  if (!district) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl text-foreground mb-2">District not found</h1>
          <button
            onClick={() => navigate("/")}
            className="text-primary hover:underline text-sm"
          >
            ← Back to map
          </button>
        </div>
      </div>
    );
  }

  const openViewer = (index: number) => {
    setViewerIndex(index);
    setViewerOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar with district info */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40"
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Mini map indicator */}
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: divisionColors[district.division] + "22" }}
          >
            <MapPin
              className="w-5 h-5"
              style={{ color: divisionColors[district.division] }}
            />
          </div>

          <div>
            <h1 className="font-display text-xl font-bold text-foreground">
              {district.name}
            </h1>
            <p className="text-xs text-muted-foreground">
              {district.bangla} • {district.division} Division
            </p>
          </div>
        </div>
      </motion.header>

      {/* Gallery */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {district.images.length > 0 ? (
          <>
            <div className="flex items-center gap-2 mb-6">
              <Camera className="w-4 h-4 text-primary" />
              <h2 className="font-display text-lg font-semibold text-foreground">
                Photo Gallery
              </h2>
              <span className="text-xs text-muted-foreground">
                ({district.images.length} photos)
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {district.images.map((img, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => openViewer(index)}
                  className="group relative aspect-square rounded-lg overflow-hidden bg-secondary border border-border hover:border-primary/50 transition-all duration-200"
                >
                  <img
                    src={img}
                    alt={`${district.name} photo ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors" />
                </motion.button>
              ))}
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24"
          >
            <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center mb-4">
              <ImageIcon className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="font-display text-lg font-semibold text-foreground mb-1">
              No photos yet
            </h2>
            <p className="text-muted-foreground text-sm text-center max-w-sm">
              Add photos of {district.name} to the district's <code className="text-primary text-xs bg-secondary px-1.5 py-0.5 rounded">images</code> array in{" "}
              <code className="text-primary text-xs bg-secondary px-1.5 py-0.5 rounded">src/data/districts.ts</code>
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-6 text-sm text-primary hover:underline"
            >
              ← Back to map
            </button>
          </motion.div>
        )}
      </main>

      {/* Image Viewer Modal */}
      {viewerOpen && district.images.length > 0 && (
        <ImageViewer
          images={district.images}
          initialIndex={viewerIndex}
          onClose={() => setViewerOpen(false)}
        />
      )}
    </div>
  );
};

export default DistrictDetail;
