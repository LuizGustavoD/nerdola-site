import { motion } from "framer-motion";
import type { Nerdola } from "@/data/nerdolas";

interface NerdolaCardProps {
  nerdola: Nerdola;
  onClick: () => void;
  index: number;
}

const NerdolaCard = ({ nerdola, onClick, index }: NerdolaCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="relative rounded-xl overflow-hidden bg-card border border-border/50 card-glow">
        {/* Gradient border effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Avatar */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={nerdola.avatar}
            alt={nerdola.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          
          {/* Nerd level badge */}
          <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm border border-primary/50">
            <span className="text-xs font-bold text-primary">
              Lvl {nerdola.nerdLevel}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
            {nerdola.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {nerdola.description}
          </p>
          
          {/* View more indicator */}
          <div className="mt-3 flex items-center gap-2 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            <span>Ver perfil completo</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              →
            </motion.span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NerdolaCard;
