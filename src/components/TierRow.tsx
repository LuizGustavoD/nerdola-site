import { useDroppable } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import DraggableNerdola from "./DraggableNerdola";
import type { Nerdola } from "@/data/nerdolas";

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
}

const TierRow = ({ tier, nerdolas, onRemove, onEditLabel }: TierRowProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: tier.id,
  });

  const tierNerdolas = tier.nerdolas
    .map((id) => nerdolas.find((n) => n.id === id))
    .filter(Boolean) as Nerdola[];

  return (
    <div className="tier-row">
      <button
        onClick={() => onEditLabel(tier.id)}
        className="tier-label hover:opacity-80 transition-opacity"
        style={{ backgroundColor: tier.color }}
      >
        {tier.label}
      </button>
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
