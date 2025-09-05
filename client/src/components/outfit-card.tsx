import { Share, Edit, MoreVertical } from "lucide-react";
import type { Outfit } from "@shared/schema";

interface OutfitCardProps {
  outfit: Outfit;
  onSelect: () => void;
  onDelete: () => void;
}

export default function OutfitCard({ outfit, onSelect, onDelete }: OutfitCardProps) {
  const itemCount = Object.keys(outfit.items).length;

  return (
    <div
      onClick={onSelect}
      className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-md transition-all cursor-pointer"
      data-testid={`outfit-card-${outfit.id}`}
    >
      <div className="flex">
        <div className="w-32 h-32 bg-muted/50 relative">
          {outfit.imageUrl ? (
            <img
              src={outfit.imageUrl}
              alt={outfit.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-muted to-accent flex items-center justify-center">
              <span className="text-2xl">👔</span>
            </div>
          )}
          <div className="absolute bottom-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
            {itemCount} {itemCount === 1 ? "вещь" : itemCount < 5 ? "вещи" : "вещей"}
          </div>
        </div>
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-foreground" data-testid={`text-outfit-name-${outfit.id}`}>
                {outfit.name}
              </h3>
              <p className="text-sm text-muted-foreground" data-testid={`text-outfit-info-${outfit.id}`}>
                {outfit.category} • {new Date(outfit.createdAt!).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              data-testid={`button-outfit-menu-${outfit.id}`}
            >
              <MoreVertical size={16} className="text-muted-foreground" />
            </button>
          </div>
          
          {outfit.tags && outfit.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {outfit.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                  data-testid={`outfit-tag-${tag}-${outfit.id}`}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle share
                }}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
                data-testid={`button-share-${outfit.id}`}
              >
                <Share size={14} className="text-muted-foreground" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle edit
                }}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
                data-testid={`button-edit-${outfit.id}`}
              >
                <Edit size={14} className="text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
