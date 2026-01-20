import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, MessageCircle, Sparkles } from "lucide-react";
import type { Nerdola } from "@/data/nerdolas";
interface NerdolaModalProps {
  nerdola: Nerdola | null;
  isOpen: boolean;
  onClose: () => void;
}
const NerdolaModal = ({
  nerdola,
  isOpen,
  onClose
}: NerdolaModalProps) => {
  if (!nerdola) return null;
  return <AnimatePresence>
      {isOpen && <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop - click to close */}
          <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Modal Container - Centered */}
          <motion.div initial={{
        opacity: 0,
        scale: 0.9,
        y: 20
      }} animate={{
        opacity: 1,
        scale: 1,
        y: 0
      }} exit={{
        opacity: 0,
        scale: 0.9,
        y: 20
      }} transition={{
        type: "spring",
        damping: 25,
        stiffness: 300
      }} className="relative w-full max-w-2xl max-h-[90vh] overflow-auto rounded-2xl bg-card border border-border shadow-2xl z-10">
            {/* Close button */}
            <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 rounded-full bg-background/80 hover:bg-background transition-colors border border-border mx-[2px] text-center">
              <X className="w-5 h-5" />
            </button>

            {/* Hero section */}
            <div className="relative h-48 md:h-64 overflow-hidden">
              <img src={nerdola.avatar} alt={nerdola.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
              
              {/* Nerd level */}
              <div className="absolute bottom-4 right-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground font-bold">
                  <Zap className="w-4 h-4" />
                  <span>Nível de Nerdice: {nerdola.nerdLevel}/10</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2 text-justify">
                  {nerdola.name}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {nerdola.description}
                </p>
              </div>

              {/* Curiosities */}
              <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground mb-3">
                  <Sparkles className="w-5 h-5 text-neon-yellow" />
                  Curiosidades
                </h3>
                <ul className="space-y-2">
                  {nerdola.curiosities.map((curiosity, index) => <motion.li key={index} initial={{
                opacity: 0,
                x: -10
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                delay: index * 0.1
              }} className="flex items-start gap-2 text-muted-foreground">
                      <span className="text-primary mt-1">•</span>
                      {curiosity}
                    </motion.li>)}
                </ul>
              </div>

              {/* Phrases */}
              <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground mb-3">
                  <MessageCircle className="w-5 h-5 text-neon-magenta" />
                  Frases Icônicas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {nerdola.phrases.map((phrase, index) => <motion.span key={index} initial={{
                opacity: 0,
                scale: 0.8
              }} animate={{
                opacity: 1,
                scale: 1
              }} transition={{
                delay: index * 0.1
              }} className="px-3 py-1.5 rounded-full bg-secondary/20 text-secondary border border-secondary/30 text-sm font-medium">
                      "{phrase}"
                    </motion.span>)}
                </div>
              </div>
            </div>
          </motion.div>
        </div>}
    </AnimatePresence>;
};
export default NerdolaModal;