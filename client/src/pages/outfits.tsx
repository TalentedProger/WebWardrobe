import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ArrowLeft, MoreHorizontal, Share, Trash2, Sparkles, Plus, Minus, Heart } from "lucide-react";
import { queryClient } from "@/lib/queryClient";
import { apiRequest } from "@/lib/queryClient";
import type { Outfit, ClothingItem } from "@shared/schema";

const categories = [
  { id: "all", label: "Все образы" },
  { id: "favorites", label: "❤️" },
  { id: "Work", label: "Работа" },
  { id: "Casual", label: "Повседневное" },
  { id: "Special", label: "Особое" },
  { id: "Sport", label: "Спорт" },
];

export default function OutfitsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedOutfit, setSelectedOutfit] = useState<Outfit | null>(null);
  const [showActionsModal, setShowActionsModal] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [editedOutfit, setEditedOutfit] = useState<Record<string, ClothingItem | null>>({});
  const [hasChanges, setHasChanges] = useState(false);

  const { data: outfits = [], isLoading } = useQuery<Outfit[]>({
    queryKey: ["/api/outfits", selectedCategory === "all" ? "" : `?category=${selectedCategory}`],
  });

  const { data: clothingItems = [] } = useQuery<ClothingItem[]>({
    queryKey: ["/api/clothing-items"],
  });

  const deleteOutfitMutation = useMutation({
    mutationFn: async (outfitId: string) => {
      const response = await apiRequest("DELETE", `/api/outfits/${outfitId}`, {});
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/outfits"] });
      setSelectedOutfit(null);
      setShowActionsModal(false);
    },
  });

  const updateOutfitMutation = useMutation({
    mutationFn: async (outfit: { id: string; name: string; items: Record<string, string>; category: string; tags: string[] | undefined }) => {
      const response = await apiRequest("PATCH", `/api/outfits/${outfit.id}`, outfit);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/outfits"] });
      setHasChanges(false);
    },
  });

  const filteredOutfits = selectedCategory === "all" 
    ? outfits 
    : outfits.filter(outfit => outfit.category === selectedCategory);

  const handleDeleteOutfit = (outfitId: string) => {
    if (confirm("Удалить этот образ?")) {
      deleteOutfitMutation.mutate(outfitId);
    }
  };

  const handleSaveChanges = () => {
    if (selectedOutfit && hasChanges) {
      const outfitItems: Record<string, string> = {};
      Object.entries(editedOutfit).forEach(([key, item]) => {
        if (item) {
          outfitItems[key] = item.id;
        }
      });

      updateOutfitMutation.mutate({
        id: selectedOutfit.id,
        name: selectedOutfit.name,
        items: outfitItems,
        category: selectedOutfit.category,
        tags: selectedOutfit.tags || [],
      });
    }
  };

  const selectClothingItemForSlot = (slotKey: string, item: ClothingItem) => {
    setEditedOutfit(prev => ({
      ...prev,
      [slotKey]: item,
    }));
    setHasChanges(true);
  };

  const getOutfitCover = (outfit: Outfit) => {
    // Create a simple cover from the outfit composition
    return 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=300&h=400&fit=crop';
  };

  const getItemsForOutfit = (outfit: Outfit) => {
    const items: Array<{ slot: string; item: ClothingItem | null }> = [];
    Object.entries(outfit.items).forEach(([slot, itemId]) => {
      const item = clothingItems.find(ci => ci.id === itemId) || null;
      items.push({ slot, item });
    });
    return items;
  };

  const filteredItemsForSlot = (slotKey: string) =>
    clothingItems.filter(item => item.type === slotKey);
  
  const getSeason = (season: string) => {
    const seasonEmojis: Record<string, string> = {
      'зима': 'Зима ❄️',
      'весна': 'Весна 🌸',
      'лето': 'Лето ☀️',
      'осень': 'Осень 🍂'
    };
    return seasonEmojis[season] || season || 'Не указан';
  };

  if (selectedOutfit) {
    const outfitItems = getItemsForOutfit(selectedOutfit);
    
    return (
      <div className="flex-1 bg-background pb-20">
        <header className="border-b border-border px-6 py-4 sticky top-14 z-50">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                setSelectedOutfit(null);
                setHasChanges(false);
                setEditedOutfit({});
              }}
              className="p-2 rounded-full hover:bg-accent transition-colors"
              data-testid="button-back-to-outfits"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle favorite toggle
                }}
                className="favorite-button rounded-full p-2"
                data-testid={`button-favorite-outfit-${selectedOutfit.id}`}
              >
                <Heart size={16} className="favorite-icon-inactive" />
              </button>
              <button 
                onClick={() => setShowActionsModal(true)}
                className="p-2 rounded-full hover:bg-accent transition-colors"
                style={{backgroundColor: '#E0C58F'}}
                data-testid="button-more-actions"
              >
                <MoreHorizontal size={20} />
              </button>
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* Outfit Title */}
          <h1 className="text-2xl font-extrabold text-center text-foreground mb-6">{selectedOutfit.name}</h1>
          
          {/* Outfit Parameters */}
          <div className="text-left mb-6">
            <div className="space-y-2">
              <div className="text-base text-foreground">
                <span className="font-black text-lg">Категория:</span> {selectedOutfit.category || 'Не указано'}
              </div>
              <div className="text-base text-foreground">
                <span className="font-black text-lg">Стиль:</span> {selectedOutfit.style || 'Не указан'}
              </div>
              <div className="text-base text-foreground">
                <span className="font-black text-lg">Сезон:</span> {getSeason(selectedOutfit.season)}
              </div>
            </div>
          </div>
          
          {/* Outfit Cover */}
          <div className="w-full max-w-sm mx-auto mb-6">
            <div 
              className="w-full bg-cover bg-center rounded-2xl relative overflow-hidden border-2 border-border shadow-2xl"
              style={{ 
                aspectRatio: '3/4',
                backgroundImage: `url(${getOutfitCover(selectedOutfit)})`,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15), 0 10px 20px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div className="absolute inset-0 bg-black/20"></div>
              
              {/* Display outfit items on cover */}
              {Object.entries(editedOutfit).map(([slot, item], index) => {
                if (!item) return null;
                return (
                  <div
                    key={slot}
                    className="absolute cursor-pointer select-none"
                    style={{
                      left: `${50 + index * 20}px`,
                      top: `${100 + index * 50}px`,
                      zIndex: 10,
                    }}
                    onClick={() => {/* Handle item click for positioning */}}
                    data-testid={`outfit-item-${slot}`}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg shadow-lg"
                      style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Items Carousel */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-foreground mb-4 text-center">Элементы образа</h3>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {outfitItems.map(({ slot, item }) => (
                <div key={slot} className="flex-shrink-0">
                  <button
                    onClick={() => {/* Open item selection modal */}}
                    className="w-24 h-24 rounded-xl border-0 flex items-center justify-center transition-colors"
                    style={{boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'}}
                    data-testid={`carousel-item-${slot}`}
                  >
                    {item ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <Plus size={16} className="text-muted-foreground" />
                    )}
                  </button>
                  <div className="text-xs font-semibold text-foreground mt-2 text-center">{slot}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Save Changes Button */}
          {hasChanges && (
            <div className="mb-4">
              <button
                onClick={handleSaveChanges}
                disabled={updateOutfitMutation.isPending}
                className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                data-testid="button-save-changes"
              >
                {updateOutfitMutation.isPending ? "Сохранение..." : "Сохранить изменения"}
              </button>
            </div>
          )}

          {/* AI Generation Button */}
          <button 
            onClick={() => setShowAiModal(true)}
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all"
            data-testid="button-ai-generate-outfit"
          >
            <Sparkles size={16} className="inline mr-2" />
            AI генерация
          </button>
        </div>

        {/* Actions Modal */}
        {showActionsModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-card rounded-2xl m-4 w-full max-w-sm">
              <div className="p-6">
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setShowActionsModal(false);
                      // Handle share
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-colors"
                    data-testid="button-share"
                  >
                    <Share size={20} />
                    <span>Поделиться</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowActionsModal(false);
                      handleDeleteOutfit(selectedOutfit.id);
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 text-red-600 transition-colors"
                    data-testid="button-delete"
                  >
                    <Trash2 size={20} />
                    <span>Удалить</span>
                  </button>
                  <button
                    onClick={() => setShowActionsModal(false)}
                    className="w-full p-3 text-center text-muted-foreground hover:bg-accent rounded-xl transition-colors"
                    data-testid="button-cancel"
                  >
                    Отмена
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex-1 bg-background pb-20">
      <header className="border-b border-border px-6 py-4 sticky top-14 z-50">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-foreground">Образы</h1>
          <button 
            onClick={() => setShowAiModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-all flex items-center gap-2" 
            data-testid="button-ai-generate"
          >
            <Sparkles size={16} />
            AI generate
          </button>
        </div>
      </header>

      <div className="p-6">

        {/* Category Filters */}
        <div className="flex overflow-x-auto space-x-3 mb-6 pb-2 p-3 rounded-2xl glass-scrollbar" style={{background: 'transparent'}}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm ${category.id === 'favorites' ? 'font-bold' : 'font-medium'} whitespace-nowrap transition-colors ${
                selectedCategory === category.id
                  ? "text-white" 
                  : "category-button-inactive hover:opacity-80"
              }`}
              style={{
                backgroundColor: selectedCategory === category.id ? '#112250' : '#E0C58F'
              }}
              data-testid={`category-${category.id}`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Outfits Grid - 2 columns */}
        <div className={filteredOutfits.length === 0 && !isLoading ? "flex items-center justify-center min-h-[60vh]" : ""}>
          {isLoading ? (
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-muted rounded-2xl animate-pulse"></div>
              ))}
            </div>
          ) : filteredOutfits.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {filteredOutfits.map((outfit) => (
                <button
                  key={outfit.id}
                  onClick={() => {
                    setSelectedOutfit(outfit);
                    // Initialize edited outfit with current items
                    const outfitItems: Record<string, ClothingItem | null> = {};
                    Object.entries(outfit.items).forEach(([slot, itemId]) => {
                      const item = clothingItems.find(ci => ci.id === itemId) || null;
                      outfitItems[slot] = item;
                    });
                    setEditedOutfit(outfitItems);
                    setHasChanges(false);
                  }}
                  className="aspect-[3/4] rounded-2xl overflow-hidden bg-muted border-0 hover:scale-105 transition-transform duration-200 w-full"
                  data-testid={`outfit-tile-${outfit.id}`}
                >
                  <img
                    src={getOutfitCover(outfit)}
                    alt={outfit.name}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 glass-button">
                <Plus size={24} className="text-muted-foreground" />
              </div>
              <p className="text-muted-foreground mb-4">
                {selectedCategory === "all" 
                  ? "У вас пока нет сохранённых образов" 
                  : `Нет образов в категории "${categories.find(c => c.id === selectedCategory)?.label}"`
                }
              </p>
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors" data-testid="button-create-first-outfit">
                Создать первый образ
              </button>
            </div>
          )}
        </div>
      </div>

      {/* AI Generation Modal */}
      {showAiModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-card rounded-2xl m-4 w-full max-w-sm max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-semibold text-foreground">AI Генерация</h3>
              <button
                onClick={() => setShowAiModal(false)}
                className="p-2 hover:bg-muted rounded-full transition-colors"
                data-testid="button-close-ai-modal"
              >
                ×
              </button>
            </div>
            <div className="p-4 flex-1 overflow-y-auto">
              {selectedOutfit ? (
                <div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Генерация на основе образа: {selectedOutfit?.name || 'Неизвестный образ'}
                  </p>
                  {/* Carousel with outfit items - read-only */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium mb-3">Элементы образа</h4>
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {getItemsForOutfit(selectedOutfit).map(({ slot, item }) => (
                        <div key={slot} className="flex-shrink-0">
                          <div className="w-16 h-16 rounded-lg border border-border flex items-center justify-center bg-muted/30">
                            {item ? (
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <div className="text-xs text-muted-foreground text-center">
                                {slot}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Создать новый образ с помощью AI
                  </p>
                </div>
              )}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Стиль</label>
                  <select className="w-full p-3 border border-border rounded-xl bg-background">
                    <option>Классический</option>
                    <option>Спортивный</option>
                    <option>Кажуал</option>
                    <option>Официальный</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Масштаб</label>
                  <select className="w-full p-3 border border-border rounded-xl bg-background">
                    <option>Полный образ</option>
                    <option>Портрет</option>
                    <option>По пояс</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Фон</label>
                  <select className="w-full p-3 border border-border rounded-xl bg-background">
                    <option>Студия</option>
                    <option>Улица</option>
                    <option>Природа</option>
                    <option>Офис</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-border">
              <button
                onClick={() => {
                  setShowAiModal(false);
                  // Handle AI generation
                }}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all"
                data-testid="button-generate-ai"
              >
                <Sparkles size={16} className="inline mr-2" />
                Генерировать
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
