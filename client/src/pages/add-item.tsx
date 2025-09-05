import { useState } from "react";
import { Camera, Trash2 } from "lucide-react";
import imageUrl from "@assets/ChatGPT Image 5 сент. 2025 г., 23_21_09_1757103687517.png";

export default function AddItemPage() {
  const [itemName, setItemName] = useState("Футболка белая");
  const [selectedCategory, setSelectedCategory] = useState("Верх");
  const [selectedStyle, setSelectedStyle] = useState("Спорт");
  const [selectedSeason, setSelectedSeason] = useState("Лето");
  
  const hasAnyValue = itemName.trim() || selectedCategory !== "Верх" || selectedStyle !== "Спорт" || selectedSeason !== "Лето";

  return (
    <div className="flex-1 bg-background pb-20">
      <div className="p-6">
        {/* Image Section */}
        <div className="w-full max-w-sm mx-auto mb-6">
          <div 
            className="w-full rounded-2xl relative overflow-hidden border-2 border-border bg-muted"
            style={{ aspectRatio: '1/1' }}
          >
            <img
              src={imageUrl}
              alt="Uploaded item"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button className="flex items-center justify-center gap-2 py-3 px-4 bg-muted rounded-xl text-foreground hover:bg-muted/80 transition-colors" data-testid="button-retake">
            <Camera size={20} />
            Переснять
          </button>
          <button className="flex items-center justify-center gap-2 py-3 px-4 bg-muted rounded-xl text-foreground hover:bg-muted/80 transition-colors" data-testid="button-delete">
            <Trash2 size={20} />
            Удалить
          </button>
        </div>

        {/* Item Details */}
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">Название</label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full text-lg font-semibold bg-transparent border-none outline-none text-foreground"
              data-testid="input-name"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">Категория</label>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 flex items-center justify-center">
                👕
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="flex-1 text-lg font-semibold bg-transparent border-none outline-none text-foreground"
                data-testid="select-category"
              >
                <option value="Верх">Верх</option>
                <option value="Низ">Низ</option>
                <option value="Обувь">Обувь</option>
                <option value="Аксессуары">Аксессуары</option>
                <option value="Куртки">Куртки</option>
                <option value="Головные уборы">Головные уборы</option>
              </select>
            </div>
          </div>

          {/* Style */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">Стиль</label>
            <select
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              className="w-full text-lg font-semibold bg-transparent border-none outline-none text-foreground"
              data-testid="select-style"
            >
              <option value="Спорт">Спорт</option>
              <option value="Классический">Классический</option>
              <option value="Кажуал">Кажуал</option>
              <option value="Элегантный">Элегантный</option>
            </select>
          </div>

          {/* Season */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">Сезон</label>
            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
              className="w-full text-lg font-semibold bg-transparent border-none outline-none text-foreground"
              data-testid="select-season"
            >
              <option value="Лето">Лето</option>
              <option value="Зима">Зима</option>
              <option value="Весна">Весна</option>
              <option value="Осень">Осень</option>
            </select>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8">
          <button
            className="w-full py-3 px-4 rounded-xl font-medium transition-colors"
            style={{
              backgroundColor: hasAnyValue ? '#112250' : '#e5e7eb',
              color: hasAnyValue ? 'white' : '#6b7280'
            }}
            disabled={!hasAnyValue}
            data-testid="button-save"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}