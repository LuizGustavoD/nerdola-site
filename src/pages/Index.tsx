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
          <div className="flex flex-wrap justify-center gap-6">
            {nerdolas.map((nerdola, index) => (
              <div key={nerdola.id} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(20%-19.2px)] max-w-[280px]">
                <NerdolaCard
                  nerdola={nerdola}
                  index={index}
                  onClick={() => setSelectedNerdola(nerdola)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Discord Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#5865F2]/20 border border-[#5865F2]/30 mb-6"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-10 h-10 text-[#5865F2]"
                fill="currentColor"
              >
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z"/>
              </svg>
            </motion.div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Entre no Servidor dos Nerdolas!
            </h2>
            <p className="text-muted-foreground mb-6">
              Junte-se à comunidade mais nerd da internet. Discussões, memes e muito mais!
            </p>
            
            <motion.a
              href="https://discord.gg/y9XptUTU"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold text-lg transition-colors shadow-lg shadow-[#5865F2]/25"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6"
                fill="currentColor"
              >
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z"/>
              </svg>
              Entrar no Discord
            </motion.a>
          </motion.div>
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
