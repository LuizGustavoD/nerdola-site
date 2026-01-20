import { useDroppable } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { Palette } from "lucide-react";
import DraggableNerdola from "./DraggableNerdola";
import type { Nerdola } from "@/data/nerdolas";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface TierData {
  id: string;
  label: string;
  color: string;
  nerdolas: string[];
}

interface TierRowProps {
  tier: TierData;
  nerdolas: Nerdola[];
  onRemove: (tierId: string, nerdolaId: string) => void;
  onEditLabel: (tierId: string) => void;
  onChangeColor?: (tierId: string, color: string) => void;
}

const presetColors = [
  "hsl(0, 100%, 65%)",    // Red
  "hsl(30, 100%, 55%)",   // Orange
  "hsl(50, 100%, 55%)",   // Yellow
  "hsl(120, 60%, 45%)",   // Green
  "hsl(150, 100%, 45%)",  // Teal
  "hsl(180, 100%, 45%)",  // Cyan
  "hsl(220, 60%, 50%)",   // Blue
  "hsl(260, 60%, 55%)",   // Purple
  "hsl(280, 60%, 50%)",   // Violet
  "hsl(320, 70%, 55%)",   // Pink
  "hsl(0, 0%, 40%)",      // Gray
  "hsl(0, 0%, 20%)",      // Dark Gray
];

const TierRow = ({ tier, nerdolas, onRemove, onEditLabel, onChangeColor }: TierRowProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: tier.id,
  });

  const tierNerdolas = tier.nerdolas
    .map((id) => nerdolas.find((n) => n.id === id))
    .filter(Boolean) as Nerdola[];

  return (
    <div className="tier-row group/row">
      <div className="relative tier-label" style={{ backgroundColor: tier.color }}>
        <button
          onClick={() => onEditLabel(tier.id)}
          className="w-full h-full flex items-center justify-center hover:opacity-80 transition-opacity"
        >
          {tier.label}
        </button>
        {onChangeColor && (
          <Popover>
            <PopoverTrigger asChild>
              <button
                className="absolute top-1 right-1 w-7 h-7 rounded-lg bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all hover:bg-black/60 hover:scale-110"
                onClick={(e) => e.stopPropagation()}
              >
                <Palette className="w-4 h-4 text-white" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-4 bg-card border-border" align="start" side="right" sideOffset={8}>
              <p className="text-sm font-medium text-foreground mb-3">Escolha uma cor</p>
              <div className="grid grid-cols-4 gap-2">
                {presetColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => onChangeColor(tier.id, color)}
                    className="w-9 h-9 rounded-lg border-2 border-transparent hover:border-white hover:scale-110 transition-all shadow-md"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <label className="text-xs text-muted-foreground block mb-2">
                  Cor personalizada
                </label>
                <input
                  type="color"
                  defaultValue="#ff0000"
                  onChange={(e) => {
                    const hex = e.target.value;
                    onChangeColor(tier.id, hex);
                  }}
                  className="w-full h-10 rounded-lg cursor-pointer border-0"
                />
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
      <div
        ref={setNodeRef}
        className={`tier-content transition-colors ${
          isOver ? "bg-primary/20 ring-2 ring-primary ring-inset" : ""
        }`}
      >
        <SortableContext
          items={tierNerdolas.map((n) => n.id)}
          strategy={horizontalListSortingStrategy}
        >
          {tierNerdolas.map((nerdola) => (
            <DraggableNerdola
              key={nerdola.id}
              nerdola={nerdola}
              onRemove={() => onRemove(tier.id, nerdola.id)}
            />
          ))}
        </SortableContext>
        {tierNerdolas.length === 0 && (
          <span className="text-muted-foreground text-sm italic px-2">
            Arraste nerdolas aqui...
          </span>
        )}
      </div>
    </div>
  );
};

export default TierRow;
