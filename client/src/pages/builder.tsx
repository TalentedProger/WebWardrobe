import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Check, X, User, ArrowLeft, Plus, Settings, Sparkles } from "lucide-react";
import { queryClient } from "@/lib/queryClient";
import { apiRequest } from "@/lib/queryClient";
import ClothingItem from "@/components/clothing-item";
import type { ClothingItem as ClothingItemType } from "@shared/schema";

const mainClothingSlots = [
  { key: "headwear", name: "Головные уборы", icon: "🧢" },
  { key: "jacket", name: "Куртки/Пиджаки", icon: "🧥" },
  { key: "top", name: "Верх", icon: "👕" },
  { key: "bottom", name: "Низ", icon: "👖" },
  { key: "shoes", name: "Обувь", icon: "👟" },
  { key: "accessory", name: "Аксессуары", icon: "⌚" },
];

const clothingSlots = mainClothingSlots; // Keep for compatibility

const backgroundOptions = [
  { id: 'studio', name: 'Студия', url: 'https://images.unsplash.com/photo-1604719312566-878b2f5c3819?w=400&h=533&fit=crop' },
  { id: 'street', name: 'Улица', url: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=400&h=533&fit=crop' },
  { id: 'cafe', name: 'Кафе', url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=533&fit=crop' },
  { id: 'nature', name: 'Природа', url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=533&fit=crop' },
  { id: 'office', name: 'Офис', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=533&fit=crop' },
  { id: 'party', name: 'Вечеринка', url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=533&fit=crop' },
];

export default function BuilderPage() {
  const [currentStep, setCurrentStep] = useState<"build" | "arrange" | "complete">("build");
  const [activeSlot, setActiveSlot] = useState<string | null>(null);
  const [currentOutfit, setCurrentOutfit] = useState<Record<string, ClothingItemType | null>>({
    headwear: null,
    jacket: null,
    top: null,
    bottom: null,
    shoes: null,
    accessory: null,
  });
  const [selectedBackground, setSelectedBackground] = useState(backgroundOptions[0]);
  const [itemScales, setItemScales] = useState<Record<string, number>>({});
  const [itemPositions, setItemPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [customCategory, setCustomCategory] = useState("");
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");


  const { data: clothingItems = [] } = useQuery<ClothingItemType[]>({
    queryKey: ["/api/clothing-items"],
  });


  const saveOutfitMutation = useMutation({
    mutationFn: async (outfit: { name: string; items: Record<string, string>; category: string; tags: string[] }) => {
      const response = await apiRequest("POST", "/api/outfits", outfit);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/outfits"] });
      setCurrentStep("complete");
    },
  });


  const handleSaveOutfit = () => {
    const outfitItems: Record<string, string> = {};
    Object.entries(currentOutfit).forEach(([key, item]) => {
      if (item) {
        outfitItems[key] = item.id;
      }
    });

    saveOutfitMutation.mutate({
      name: `Образ ${Date.now()}`,
      items: outfitItems,
      category: "Casual",
      tags: ["новый"],
    });
  };

  const selectClothingItem = (item: ClothingItemType) => {
    if (activeSlot) {
      setCurrentOutfit(prev => ({
        ...prev,
        [activeSlot]: item,
      }));
      setActiveSlot(null);
    }
  };

  const filteredItemsForSlot = (slotKey: string) =>
    clothingItems.filter(item => item.type === slotKey);


  if (currentStep === "build") {
    return (
      <div className="flex-1 bg-background pb-20">
        <header className="border-b border-border px-6 py-4 sticky top-14 z-50">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-foreground">Создать образ</h1>
            <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors" data-testid="button-settings">
              <Settings size={20} />
            </button>
          </div>
        </header>

        <div className="p-6">
          {/* Main Clothing Slots - 6 tiles in column */}
          <div className="flex flex-col items-center gap-4 mb-6">
            {mainClothingSlots.slice(0, 5).map((slot) => {
              const selectedItem = currentOutfit[slot.key];
              return (
                <button
                  key={slot.key}
                  onClick={() => setActiveSlot(slot.key)}
                  className="w-20 h-20 rounded-2xl bg-muted/50 border-2 border-solid border-border hover:border-primary/50 flex flex-col items-center justify-center transition-all duration-200 relative"
                  data-testid={`slot-${slot.key}`}
                >
                  {selectedItem ? (
                    <img
                      src={selectedItem.imageUrl}
                      alt={selectedItem.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <>
                      <div className="text-2xl mb-1">{slot.icon}</div>
                      <Plus size={16} className="text-muted-foreground" />
                    </>
                  )}
                </button>
              );
            })}
          </div>

          {/* Accessories Section */}
          <div className="mb-8">
            <div className="flex justify-center mb-4">
              <button
                onClick={() => setActiveSlot('accessory')}
                className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full border border-border hover:border-primary/50 transition-all duration-200"
                data-testid="slot-accessory"
              >
                <Plus size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Добавить аксессуар</span>
              </button>
            </div>
            
            {/* Accessories Display Row */}
            <div className="flex justify-start gap-3 overflow-x-auto pb-2">
              {currentOutfit.accessory && (
                <div className="w-20 h-20 rounded-2xl bg-muted/50 border-2 border-solid border-border flex items-center justify-center relative">
                  <img
                    src={currentOutfit.accessory.imageUrl}
                    alt={currentOutfit.accessory.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              )}
              
              {/* Additional empty slots */}
              <div className="w-20 h-20 rounded-2xl bg-muted/50 border-2 border-solid border-border flex items-center justify-center">
                <Plus size={16} className="text-muted-foreground" />
              </div>
              
              <div className="w-20 h-20 rounded-2xl bg-muted/50 border-2 border-solid border-border flex items-center justify-center">
                <Plus size={16} className="text-muted-foreground" />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setCurrentOutfit({
                headwear: null,
                jacket: null,
                top: null,
                bottom: null,
                shoes: null,
                accessory: null,
              })}
              className="py-3 px-4 text-white rounded-xl font-medium hover:opacity-90 transition-colors"
              style={{backgroundColor: '#E0C58F'}}
              data-testid="button-clear"
            >
              Очистить
            </button>
            <button
              onClick={() => setCurrentStep("arrange")}
              disabled={Object.values(currentOutfit).every(item => !item)}
              className="py-3 px-4 text-white rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
              style={{backgroundColor: '#112250'}}
              data-testid="button-next"
            >
              Далее
            </button>
          </div>
        </div>

        {/* Clothing Selection Modal */}
        {activeSlot && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-card rounded-2xl m-4 max-w-sm w-full max-h-[80vh] flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="font-semibold text-foreground">
                  {clothingSlots.find(s => s.key === activeSlot)?.name}
                </h3>
                <button
                  onClick={() => setActiveSlot(null)}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                  data-testid="button-close-modal"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-4 flex-1 overflow-y-auto">
                <div className="grid grid-cols-2 gap-3">
                  {filteredItemsForSlot(activeSlot).map((item) => (
                    <button
                      key={item.id}
                      onClick={() => selectClothingItem(item)}
                      className="aspect-square rounded-xl overflow-hidden border border-border hover:border-primary transition-colors"
                      data-testid={`clothing-item-${item.id}`}
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
                {filteredItemsForSlot(activeSlot).length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      Нет доступных вещей для этой категории
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (currentStep === "arrange") {
    const selectedItems = Object.entries(currentOutfit).filter(([_, item]) => item !== null);
    
    return (
      <div className="flex-1 bg-background pb-20">
        <header className="border-b border-border px-6 py-4 sticky top-14 z-50">
          <div className="flex items-center">
            <button
              onClick={() => setCurrentStep("build")}
              className="p-2 mr-4 hover:bg-muted rounded-full transition-colors"
              data-testid="button-back-to-build"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-semibold text-foreground">Компановка образа</h1>
          </div>
        </header>

        <div className="p-6">
          {/* 3:4 Canvas Container */}
          <div className="w-full max-w-sm mx-auto mb-6">
            <div 
              className="w-full bg-cover bg-center rounded-2xl relative overflow-hidden border-2 border-border"
              style={{ 
                aspectRatio: '3/4',
                backgroundImage: `url(${selectedBackground.url})`,
              }}
            >
              {/* Overlay for better contrast */}
              <div className="absolute inset-0 bg-black/20"></div>
              
              {/* Selected Items */}
              {selectedItems.map(([slotKey, item], index) => {
                const scale = itemScales[slotKey] || 1;
                const position = itemPositions[slotKey] || { x: 50 + index * 20, y: 100 + index * 50 };
                
                return (
                  <div
                    key={slotKey}
                    className="absolute cursor-move select-none"
                    style={{
                      left: `${position.x}px`,
                      top: `${position.y}px`,
                      transform: `scale(${scale})`,
                      transformOrigin: 'center',
                      zIndex: 10,
                    }}
                    data-testid={`draggable-${slotKey}`}
                  >
                    <img
                      src={item!.imageUrl}
                      alt={item!.name}
                      className="w-16 h-16 object-cover rounded-lg shadow-lg"
                      style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}
                    />
                    {/* Scale Controls */}
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-1">
                      <button
                        onClick={() => setItemScales(prev => ({ ...prev, [slotKey]: Math.max(0.5, (prev[slotKey] || 1) - 0.1) }))}
                        className="w-6 h-6 bg-background/80 hover:bg-background rounded-full flex items-center justify-center text-xs font-bold shadow"
                        data-testid={`scale-down-${slotKey}`}
                      >
                        -
                      </button>
                      <button
                        onClick={() => setItemScales(prev => ({ ...prev, [slotKey]: Math.min(2, (prev[slotKey] || 1) + 0.1) }))}
                        className="w-6 h-6 bg-background/80 hover:bg-background rounded-full flex items-center justify-center text-xs font-bold shadow"
                        data-testid={`scale-up-${slotKey}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Background Carousel */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-foreground mb-4">Фон сцены</h3>
            <div className="flex gap-3 overflow-x-auto pb-2 glass-scrollbar">
              {backgroundOptions.map((bg) => (
                <button
                  key={bg.id}
                  onClick={() => setSelectedBackground(bg)}
                  className={`flex-shrink-0 w-16 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedBackground.id === bg.id ? 'border-primary shadow-lg' : 'border-border'
                  }`}
                  data-testid={`background-${bg.id}`}
                >
                  <img
                    src={bg.url}
                    alt={bg.name}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Outfit Parameters */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-foreground mb-4">Параметры образа</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Введите название образа"
                className="w-full p-3 border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                data-testid="input-outfit-name"
              />
              
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" 
                data-testid="select-outfit-category"
              >
                <option value="">Выберите категорию</option>
                <option value="повседневный">Повседневный</option>
                <option value="работа">Работа</option>
                <option value="свидание">Свидание</option>
                <option value="вечеринка">Вечеринка</option>
                <option value="отпуск">Отпуск</option>
              </select>
              
              <select 
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="w-full p-3 border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" 
                data-testid="select-outfit-style"
              >
                <option value="">Выберите стиль</option>
                <option value="классический">Классический</option>
                <option value="спортивный">Спортивный</option>
                <option value="кажуал">Кажуал</option>
                <option value="элегантный">Элегантный</option>
              </select>
              
              <select 
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
                className="w-full p-3 border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" 
                data-testid="select-outfit-season"
              >
                <option value="">Выберите сезон</option>
                <option value="зима">Зима</option>
                <option value="весна">Весна</option>
                <option value="лето">Лето</option>
                <option value="осень">Осень</option>
              </select>
              
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setCurrentStep("build")}
              className="py-3 px-4 text-white rounded-xl font-medium hover:opacity-90 transition-colors"
              style={{backgroundColor: '#E0C58F'}}
              data-testid="button-back"
            >
              Назад
            </button>
            <button
              onClick={handleSaveOutfit}
              disabled={saveOutfitMutation.isPending}
              className="py-3 px-4 text-white rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
              style={{backgroundColor: '#112250'}}
              data-testid="button-save-outfit"
            >
              {saveOutfitMutation.isPending ? "Сохранение..." : "Сохранить образ"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === "complete") {
    return (
      <div className="flex-1 bg-background pb-20">
        <header className="border-b border-border px-6 py-4 sticky top-14 z-50">
          <div className="flex items-center">
            <button
              onClick={() => setCurrentStep("build")}
              className="p-2 mr-4 hover:bg-muted rounded-full transition-colors"
              data-testid="button-back"
            >
              <ArrowLeft size={20} />
            </button>
          </div>
        </header>

        <div className="p-6 text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4" style={{boxShadow: '0 8px 24px rgba(34, 197, 94, 0.3)'}}>
              <Check size={32} className="text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Ваш образ готов!</h2>
            
            {/* Generated Outfit Image */}
            <div className="w-full max-w-sm mx-auto mb-8">
              <div 
                className="w-full bg-cover bg-center rounded-2xl relative overflow-hidden border-2 border-border"
                style={{ 
                  aspectRatio: '3/4',
                  backgroundImage: `url(${selectedBackground.url})`,
                  boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)'
                }}
              >
                <div className="absolute inset-0 bg-black/20"></div>
                {Object.entries(currentOutfit).map(([slotKey, item], index) => {
                  if (!item) return null;
                  const scale = itemScales[slotKey] || 1;
                  const position = itemPositions[slotKey] || { x: 50 + index * 20, y: 100 + index * 50 };
                  
                  return (
                    <div
                      key={slotKey}
                      className="absolute select-none"
                      style={{
                        left: `${position.x}px`,
                        top: `${position.y}px`,
                        transform: `scale(${scale})`,
                        transformOrigin: 'center',
                        zIndex: 10,
                      }}
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg"
                        style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {/* All Buttons in Column */}
            <button
              onClick={() => {
                setCurrentStep("build");
                setCurrentOutfit({
                  headwear: null,
                  jacket: null,
                  top: null,
                  bottom: null,
                  shoes: null,
                  accessory: null,
                });
              }}
              className="w-full py-3 px-4 text-white rounded-xl font-medium hover:opacity-90 transition-colors"
              style={{backgroundColor: '#E0C58F'}}
              data-testid="button-create-new"
            >
              Создать новый
            </button>
            <button
              onClick={() => window.location.href = '/outfits'}
              className="w-full py-3 px-4 text-white rounded-xl font-medium hover:opacity-90 transition-colors"
              style={{backgroundColor: '#112250'}}
              data-testid="button-to-outfits"
            >
              К образам
            </button>
            <button
              onClick={() => {/* Handle AI generation */}}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all"
              data-testid="button-ai-generate-final"
            >
              <Sparkles size={16} className="inline mr-2" />
              AI generation образа
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
