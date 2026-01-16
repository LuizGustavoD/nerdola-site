import { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toPng } from "html-to-image";
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
import { Plus, Trash2, Edit3, Save, RotateCcw, Download, ArrowLeft } from "lucide-react";
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
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  saveTierList,
  getTierListById,
  generateId,
  type SavedTierList,
} from "@/lib/tierListStorage";

const defaultTiers: TierData[] = [
  { id: "s", label: "S", color: "hsl(0, 100%, 65%)", nerdolas: [] },
  { id: "a", label: "A", color: "hsl(30, 100%, 55%)", nerdolas: [] },
  { id: "b", label: "B", color: "hsl(50, 100%, 55%)", nerdolas: [] },
  { id: "c", label: "C", color: "hsl(150, 100%, 45%)", nerdolas: [] },
  { id: "d", label: "D", color: "hsl(220, 60%, 50%)", nerdolas: [] },
];

const TierListEditor = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("id");

  const [tierListId, setTierListId] = useState<string>(editId || generateId());
  const [tierName, setTierName] = useState("Minha Tier List");
  const [tierDescription, setTierDescription] = useState("Ranking dos nerdolas mais lendários");
  const [tiers, setTiers] = useState<TierData[]>(defaultTiers);
  const [activeNerdola, setActiveNerdola] = useState<Nerdola | null>(null);
  const [editingTierId, setEditingTierId] = useState<string | null>(null);
  const [newTierLabel, setNewTierLabel] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const tierListRef = useRef<HTMLDivElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  // Load existing tier list if editing
  useEffect(() => {
    if (editId) {
      const existing = getTierListById(editId);
      if (existing) {
        setTierListId(existing.id);
        setTierName(existing.name);
        setTierDescription(existing.description);
        setTiers(existing.tiers);
      }
    }
  }, [editId]);

  // Get nerdolas that are not in any tier
  const availableNerdolas = nerdolas.filter(
    (n) => !tiers.some((t) => t.nerdolas.includes(n.id))
  );

  const generateThumbnail = async (): Promise<string | null> => {
    if (!tierListRef.current) return null;
    try {
      const dataUrl = await toPng(tierListRef.current, {
        quality: 0.8,
        pixelRatio: 1,
        backgroundColor: "#121620",
      });
      return dataUrl;
    } catch {
      return null;
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const thumbnail = await generateThumbnail();
      const tierList: SavedTierList = {
        id: tierListId,
        name: tierName,
        description: tierDescription,
        tiers,
        thumbnail,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      saveTierList(tierList);
      toast.success("Tier List salva com sucesso!");
    } catch {
      toast.error("Erro ao salvar Tier List");
    } finally {
      setIsSaving(false);
    }
  };

  const handleExport = async () => {
    if (!tierListRef.current) return;
    setIsExporting(true);
    try {
      const dataUrl = await toPng(tierListRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: "#121620",
      });
      
      const link = document.createElement("a");
      link.download = `${tierName.replace(/\s+/g, "-").toLowerCase()}.png`;
      link.href = dataUrl;
      link.click();
      toast.success("Imagem exportada com sucesso!");
    } catch {
      toast.error("Erro ao exportar imagem");
    } finally {
      setIsExporting(false);
    }
  };

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

    const targetTier = tiers.find((t) => t.id === targetTierId);
    if (!targetTier) return;

    if (targetTier.nerdolas.includes(nerdolaId)) return;

    setTiers((prev) => {
      const updated = prev.map((tier) => ({
        ...tier,
        nerdolas: tier.nerdolas.filter((id) => id !== nerdolaId),
      }));

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
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Back button and actions */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/tierlist")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>

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

            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit3 className="w-4 h-4 mr-2" />}
                {isEditing ? "Fechar" : "Editar Info"}
              </Button>
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Resetar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExport}
                disabled={isExporting}
              >
                <Download className="w-4 h-4 mr-2" />
                {isExporting ? "Exportando..." : "Exportar"}
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={isSaving}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? "Salvando..." : "Salvar"}
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
          {/* Tier Rows - This is what gets exported */}
          <div ref={tierListRef} className="p-4 rounded-xl bg-background">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-foreground">{tierName}</h2>
              <p className="text-sm text-muted-foreground">{tierDescription}</p>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
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
            </motion.div>
          </div>

          {/* Add Tier Button */}
          <Button
            variant="outline"
            className="w-full border-dashed mt-2 mb-8"
            onClick={handleAddTier}
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Tier
          </Button>

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

export default TierListEditor;
