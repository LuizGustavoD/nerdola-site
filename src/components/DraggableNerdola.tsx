import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { X } from "lucide-react";
import type { Nerdola } from "@/data/nerdolas";

interface DraggableNerdolaProps {
  nerdola: Nerdola;
  onRemove?: () => void;
  isInPool?: boolean;
}

const DraggableNerdola = ({ nerdola, onRemove, isInPool }: DraggableNerdolaProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: nerdola.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`relative group draggable-item ${
        isDragging ? "opacity-50 z-50 scale-110" : ""
      }`}
    >
      <div
        className={`w-16 h-16 md:w-[72px] md:h-[72px] rounded-xl overflow-hidden border-2 bg-card shadow-lg transition-all ${
          isInPool 
            ? "border-border/50 hover:border-primary hover:shadow-primary/25" 
            : "border-border/30 hover:border-white/50"
        }`}
      >
        <img
          src={nerdola.avatar}
          alt={nerdola.name}
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>
      {onRemove && !isInPool && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-lg"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 px-1.5 py-0.5 rounded backdrop-blur-sm">
        {nerdola.name}
      </span>
    </div>
  );
};

export default DraggableNerdola;
