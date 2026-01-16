import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Trophy } from "lucide-react";
import Header from "@/components/Header";
import TierListCard from "@/components/TierListCard";
import { Button } from "@/components/ui/button";
import {
  getTierLists,
  deleteTierList,
  type SavedTierList,
} from "@/lib/tierListStorage";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const TierList = () => {
  const navigate = useNavigate();
  const [tierLists, setTierLists] = useState<SavedTierList[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    setTierLists(getTierLists());
  }, []);

  const handleDelete = (id: string) => {
    deleteTierList(id);
    setTierLists(getTierLists());
    setDeleteId(null);
    toast.success("Tier List deletada!");
  };

  const handleCreateNew = () => {
    navigate("/tierlist/editor");
  };

  const handleEdit = (id: string) => {
    navigate(`/tierlist/editor?id=${id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 via-transparent to-transparent" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-sm font-medium mb-6">
              <Trophy className="w-4 h-4" />
              Crie rankings épicos
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Suas{" "}
              <span className="text-secondary neon-text-magenta">Tier Lists</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8">
              Crie, salve e compartilhe seus rankings dos nerdolas!
            </p>

            <Button
              onClick={handleCreateNew}
              size="lg"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              <Plus className="w-5 h-5 mr-2" />
              Criar Nova Tier List
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Tier Lists Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {tierLists.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tierLists.map((tierList, index) => (
                <TierListCard
                  key={tierList.id}
                  tierList={tierList}
                  index={index}
                  onClick={() => handleEdit(tierList.id)}
                  onDelete={(e) => {
                    e.stopPropagation();
                    setDeleteId(tierList.id);
                  }}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">📊</div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Nenhuma Tier List ainda
              </h2>
              <p className="text-muted-foreground mb-6">
                Crie sua primeira tier list e comece a rankear os nerdolas!
              </p>
              <Button onClick={handleCreateNew} variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Criar Tier List
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deletar Tier List?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. A tier list será permanentemente removida.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Deletar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TierList;
