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
    <div className="tier-row">
      <div className="relative group/tier">
        <button
          onClick={() => onEditLabel(tier.id)}
          className="tier-label hover:opacity-80 transition-opacity"
          style={{ backgroundColor: tier.color }}
        >
          {tier.label}
        </button>
        {onChangeColor && (
          <Popover>
            <PopoverTrigger asChild>
              <button
                className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center opacity-0 group-hover/tier:opacity-100 transition-opacity hover:bg-muted"
                onClick={(e) => e.stopPropagation()}
              >
                <Palette className="w-3 h-3" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-3" align="start">
              <div className="grid grid-cols-4 gap-2">
                {presetColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => onChangeColor(tier.id, color)}
                    className="w-8 h-8 rounded-lg border-2 border-border hover:border-primary transition-colors"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-border">
                <label className="text-xs text-muted-foreground block mb-1">
                  Cor personalizada
                </label>
                <input
                  type="color"
                  defaultValue="#ff0000"
                  onChange={(e) => {
                    const hex = e.target.value;
                    // Convert hex to HSL-like format
                    onChangeColor(tier.id, hex);
                  }}
                  className="w-full h-8 rounded cursor-pointer"
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
