import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Camera, Upload, Search, Settings } from "lucide-react";
import { queryClient } from "@/lib/queryClient";
import { apiRequest } from "@/lib/queryClient";
import ClothingItem from "@/components/clothing-item";
import type { ClothingItem as ClothingItemType } from "@shared/schema";

const categories = [
  { id: "all", label: "Всё" },
  { id: "top", label: "Верх" },
  { id: "bottom", label: "Низ" },
  { id: "shoes", label: "Обувь" },
  { id: "headwear", label: "Головные уборы" },
  { id: "jacket", label: "Куртки" },
  { id: "accessory", label: "Аксессуары" },
];

export default function WardrobePage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: clothingItems = [], isLoading } = useQuery<ClothingItemType[]>({
    queryKey: ["/api/clothing-items", selectedCategory === "all" ? "" : `?type=${selectedCategory}`],
  });

  const addItemMutation = useMutation({
    mutationFn: async (itemData: { name: string; type: string; imageUrl: string; tags: string[] }) => {
      const response = await apiRequest("POST", "/api/clothing-items", itemData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/clothing-items"] });
    },
  });

  const handleAddItem = () => {
    // Use selected category or default to "top" if "all" is selected
    const itemType = selectedCategory === "all" ? "top" : selectedCategory;
    
    const newItem = {
      name: `Новая вещь ${Date.now()}`,
      type: itemType,
      imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
      tags: ["новая"],
    };
    addItemMutation.mutate(newItem);
  };

  const filteredItems = selectedCategory === "all" 
    ? clothingItems 
    : clothingItems.filter(item => item.type === selectedCategory);

  return (
    <div className="flex-1 bg-background pb-20">
      {/* Header */}
      <header className="border-b border-border px-6 py-4 sticky top-14 z-50">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-foreground">Мой Гардероб</h1>
          <div className="flex items-center space-x-3">
            <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors" data-testid="button-search">
              <Search size={20} />
            </button>
            <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors" data-testid="button-settings">
              <Settings size={20} />
            </button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Upload Section */}
        <div className="mb-6 p-6 rounded-2xl" style={{backgroundColor: '#112250'}}>
          <h2 className="text-lg font-medium text-white mb-4">Загрузить одежду</h2>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={handleAddItem}
              className="flex flex-col items-center justify-center p-4 bg-white/20 border border-white/60 rounded-xl text-white hover:bg-white/30 transition-all duration-300"
              data-testid="button-camera"
              style={{borderColor: 'white'}}
            >
              <Camera size={24} className="mb-2" />
              <span className="text-sm font-medium">Сфотографировать</span>
            </button>
            <button 
              onClick={handleAddItem}
              className="flex flex-col items-center justify-center p-4 bg-white/20 border border-white/60 rounded-xl text-white hover:bg-white/30 transition-all duration-300"
              data-testid="button-upload"
              style={{borderColor: 'white'}}
            >
              <Upload size={24} className="mb-2" />
              <span className="text-sm font-medium">Загрузить фото</span>
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex overflow-x-auto space-x-3 mb-6 pb-2 p-3 rounded-2xl" style={{background: 'transparent'}}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                selectedCategory === category.id
                  ? "text-white" 
                  : "text-muted-foreground hover:opacity-80"
              }`}
              style={{
                backgroundColor: selectedCategory === category.id ? '#112250' : '#E0C58F'
              }}
              data-testid={`filter-${category.id}`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Clothing Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-card rounded-2xl border border-border overflow-hidden animate-pulse">
                <div className="aspect-square bg-muted"></div>
                <div className="p-3">
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filteredItems.map((item) => (
              <ClothingItem key={item.id} item={item} />
            ))}
          </div>
        )}

        {filteredItems.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload size={24} className="text-muted-foreground" />
            </div>
            <p className="text-muted-foreground mb-4">
              {selectedCategory === "all" 
                ? "У вас пока нет одежды в гардеробе" 
                : `Нет одежды в категории "${categories.find(c => c.id === selectedCategory)?.label}"`
              }
            </p>
            <button 
              onClick={handleAddItem}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              data-testid="button-add-first-item"
            >
              Добавить первую вещь
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
