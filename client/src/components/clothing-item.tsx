import { useState } from "react";
import { Heart, MoreVertical } from "lucide-react";
import type { ClothingItem as ClothingItemType } from "@shared/schema";

interface ClothingItemProps {
  item: ClothingItemType;
  onSelect?: (item: ClothingItemType) => void;
  onDelete?: (itemId: string) => void;
}

export default function ClothingItem({ item, onSelect, onDelete }: ClothingItemProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleItemClick = () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  const categoryLabels: Record<string, string> = {
    top: "Верх",
    bottom: "Низ",
    shoes: "Обувь",
    headwear: "Головные уборы",
    jacket: "Куртки",
    accessory: "Аксессуары",
  };

  return (
    <div 
      className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer relative"
      onClick={handleItemClick}
      data-testid={`clothing-item-${item.id}`}
    >
      <div className="aspect-square bg-muted/50 relative">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 flex space-x-1">
          <button
            onClick={handleHeartClick}
            className="bg-card/90 rounded-full p-1.5 hover:bg-card transition-colors"
            data-testid={`button-favorite-${item.id}`}
          >
            <Heart 
              size={14} 
              className={isFavorite ? "text-red-500 fill-current" : "text-muted-foreground"} 
            />
          </button>
          {onDelete && (
            <button
              onClick={handleMenuClick}
              className="bg-card/90 rounded-full p-1.5 hover:bg-card transition-colors"
              data-testid={`button-menu-${item.id}`}
            >
              <MoreVertical size={14} className="text-muted-foreground" />
            </button>
          )}
        </div>
        {showMenu && onDelete && (
          <div className="absolute top-12 right-2 bg-card border border-border rounded-lg shadow-lg z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(item.id);
                setShowMenu(false);
              }}
              className="block w-full px-4 py-2 text-left text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              data-testid={`button-delete-${item.id}`}
            >
              Удалить
            </button>
          </div>
        )}
      </div>
      <div className="p-3">
        <p className="text-sm font-medium text-foreground truncate" data-testid={`text-item-name-${item.id}`}>
          {item.name}
        </p>
        <p className="text-xs text-muted-foreground" data-testid={`text-item-category-${item.id}`}>
          {categoryLabels[item.type] || item.type}
        </p>
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {item.tags.slice(0, 2).map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full"
                data-testid={`tag-${tag}-${item.id}`}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
