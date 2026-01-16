import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Header from "@/components/Header";
import NerdolaCard from "@/components/NerdolaCard";
import NerdolaModal from "@/components/NerdolaModal";
import { nerdolas, type Nerdola } from "@/data/nerdolas";

const Index = () => {
  const [selectedNerdola, setSelectedNerdola] = useState<Nerdola | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4" />
              A enciclopédia definitiva dos nerdolas
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              Bem-vindo à{" "}
              <span className="text-primary neon-text font-pixel text-3xl md:text-5xl">
                Wiki Nerdola
              </span>
            </h1>

            <p className="text-lg text-muted-foreground">
              Conheça os personagens mais lendários do universo nerd. 
              Clique em um card para saber mais!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Nerdolas Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {nerdolas.map((nerdola, index) => (
              <NerdolaCard
                key={nerdola.id}
                nerdola={nerdola}
                index={index}
                onClick={() => setSelectedNerdola(nerdola)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <NerdolaModal
        nerdola={selectedNerdola}
        isOpen={!!selectedNerdola}
        onClose={() => setSelectedNerdola(null)}
      />
    </div>
  );
};

export default Index;
