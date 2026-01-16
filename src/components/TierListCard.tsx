import { motion } from "framer-motion";
import { Calendar, Trash2 } from "lucide-react";
import type { SavedTierList } from "@/lib/tierListStorage";

interface TierListCardProps {
  tierList: SavedTierList;
  onClick: () => void;
  onDelete: (e: React.MouseEvent) => void;
  index: number;
}

const TierListCard = ({ tierList, onClick, onDelete, index }: TierListCardProps) => {
  const formattedDate = new Date(tierList.updatedAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group cursor-pointer relative"
    >
      <div className="rounded-xl overflow-hidden bg-card border border-border/50 card-glow">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden bg-muted">
          {tierList.thumbnail ? (
            <img
              src={tierList.thumbnail}
              alt={tierList.name}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <span className="text-4xl">📊</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors truncate">
            {tierList.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
            {tierList.description}
          </p>
          
          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Delete button */}
      <button
        onClick={onDelete}
        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-destructive/90 text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive z-10"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

export default TierListCard;
