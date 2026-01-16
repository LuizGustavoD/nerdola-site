import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import { Plus, Trash2, Edit3, Save, RotateCcw } from "lucide-react";
import Header from "@/components/Header";
import TierRow, { type TierData } from "@/components/TierRow";
import DraggableNerdola from "@/components/DraggableNerdola";
import { nerdolas, type Nerdola } from "@/data/nerdolas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const defaultTiers: TierData[] = [
  { id: "s", label: "S", color: "hsl(0, 100%, 65%)", nerdolas: [] },
  { id: "a", label: "A", color: "hsl(30, 100%, 55%)", nerdolas: [] },
  { id: "b", label: "B", color: "hsl(50, 100%, 55%)", nerdolas: [] },
  { id: "c", label: "C", color: "hsl(150, 100%, 45%)", nerdolas: [] },
  { id: "d", label: "D", color: "hsl(220, 60%, 50%)", nerdolas: [] },
];

const TierList = () => {
  const [tierName, setTierName] = useState("Minha Tier List");
  const [tierDescription, setTierDescription] = useState("Ranking dos nerdolas mais lendários");
  const [tiers, setTiers] = useState<TierData[]>(defaultTiers);
  const [activeNerdola, setActiveNerdola] = useState<Nerdola | null>(null);
  const [editingTierId, setEditingTierId] = useState<string | null>(null);
  const [newTierLabel, setNewTierLabel] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  // Get nerdolas that are not in any tier
  const availableNerdolas = nerdolas.filter(
    (n) => !tiers.some((t) => t.nerdolas.includes(n.id))
  );

  const handleDragStart = (event: DragStartEvent) => {
    const nerdola = nerdolas.find((n) => n.id === event.active.id);
    setActiveNerdola(nerdola || null);
  };

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    setActiveNerdola(null);

    if (!over) return;

    const nerdolaId = active.id as string;
    const targetTierId = over.id as string;

    // Check if dropping on a tier
    const targetTier = tiers.find((t) => t.id === targetTierId);
    if (!targetTier) return;

    // Check if already in this tier
    if (targetTier.nerdolas.includes(nerdolaId)) return;

    setTiers((prev) => {
      // Remove from any existing tier
      const updated = prev.map((tier) => ({
        ...tier,
        nerdolas: tier.nerdolas.filter((id) => id !== nerdolaId),
      }));

      // Add to target tier
      return updated.map((tier) =>
        tier.id === targetTierId
          ? { ...tier, nerdolas: [...tier.nerdolas, nerdolaId] }
          : tier
      );
    });
  }, [tiers]);

  const handleRemoveFromTier = (tierId: string, nerdolaId: string) => {
    setTiers((prev) =>
      prev.map((tier) =>
        tier.id === tierId
          ? { ...tier, nerdolas: tier.nerdolas.filter((id) => id !== nerdolaId) }
          : tier
      )
    );
  };

  const handleEditTierLabel = (tierId: string) => {
    const tier = tiers.find((t) => t.id === tierId);
    if (tier) {
      setNewTierLabel(tier.label);
      setEditingTierId(tierId);
    }
  };

  const handleSaveTierLabel = () => {
    if (editingTierId && newTierLabel.trim()) {
      setTiers((prev) =>
        prev.map((tier) =>
          tier.id === editingTierId
            ? { ...tier, label: newTierLabel.trim() }
            : tier
        )
      );
    }
    setEditingTierId(null);
    setNewTierLabel("");
  };

  const handleAddTier = () => {
    const newId = `tier-${Date.now()}`;
    setTiers((prev) => [
      ...prev,
      { id: newId, label: "NEW", color: "hsl(280, 60%, 50%)", nerdolas: [] },
    ]);
  };

  const handleDeleteTier = (tierId: string) => {
    setTiers((prev) => prev.filter((t) => t.id !== tierId));
  };

  const handleReset = () => {
    setTiers(defaultTiers);
    setTierName("Minha Tier List");
    setTierDescription("Ranking dos nerdolas mais lendários");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-2">
                  <Input
                    value={tierName}
                    onChange={(e) => setTierName(e.target.value)}
                    className="text-2xl font-bold bg-muted"
                    placeholder="Nome da Tier List"
                  />
                  <Input
                    value={tierDescription}
                    onChange={(e) => setTierDescription(e.target.value)}
                    className="text-sm bg-muted"
                    placeholder="Descrição"
                  />
                </div>
              ) : (
                <>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                    {tierName}
                  </h1>
                  <p className="text-muted-foreground mt-1">{tierDescription}</p>
                </>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit3 className="w-4 h-4 mr-2" />}
                {isEditing ? "Salvar" : "Editar"}
              </Button>
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Resetar
              </Button>
            </div>
          </div>
        </motion.div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {/* Tier Rows */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-2 mb-8"
          >
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <TierRow
                  tier={tier}
                  nerdolas={nerdolas}
                  onRemove={handleRemoveFromTier}
                  onEditLabel={handleEditTierLabel}
                />
                {tiers.length > 1 && (
                  <button
                    onClick={() => handleDeleteTier(tier.id)}
                    className="absolute -right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </motion.div>
            ))}

            {/* Add Tier Button */}
            <Button
              variant="outline"
              className="w-full border-dashed"
              onClick={handleAddTier}
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Tier
            </Button>
          </motion.div>

          {/* Available Nerdolas Pool */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card rounded-xl border border-border p-6"
          >
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Nerdolas Disponíveis
            </h2>
            <div className="flex flex-wrap gap-4 min-h-[80px]">
              {availableNerdolas.length > 0 ? (
                availableNerdolas.map((nerdola) => (
                  <DraggableNerdola
                    key={nerdola.id}
                    nerdola={nerdola}
                    isInPool
                  />
                ))
              ) : (
                <p className="text-muted-foreground text-sm italic">
                  Todos os nerdolas foram classificados! 🎉
                </p>
              )}
            </div>
          </motion.div>

          {/* Drag Overlay */}
          <DragOverlay>
            {activeNerdola && (
              <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-primary shadow-lg">
                <img
                  src={activeNerdola.avatar}
                  alt={activeNerdola.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </DragOverlay>
        </DndContext>
      </div>

      {/* Edit Tier Label Dialog */}
      <Dialog open={!!editingTierId} onOpenChange={() => setEditingTierId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Nome do Tier</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Nome do Tier</Label>
              <Input
                value={newTierLabel}
                onChange={(e) => setNewTierLabel(e.target.value)}
                placeholder="Ex: S, A, B..."
                maxLength={10}
              />
            </div>
            <Button onClick={handleSaveTierLabel} className="w-full">
              Salvar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TierList;
