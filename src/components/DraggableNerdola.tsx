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
        isDragging ? "opacity-50 z-50" : ""
      }`}
    >
      <div
        className={`w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 border-border bg-card ${
          isInPool ? "hover:border-primary" : ""
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
          className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <X className="w-3 h-3" />
        </button>
      )}
      <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
        {nerdola.name}
      </span>
    </div>
  );
};

export default DraggableNerdola;
