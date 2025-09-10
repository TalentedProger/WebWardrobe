import { useState } from "react";
import { Camera, Trash2, Pencil, ChevronDown } from "lucide-react";
import imageUrl from "@assets/ChatGPT Image 5 сент. 2025 г., 23_21_09_1757103687517.png";

export default function AddItemPage() {
  const [itemName, setItemName] = useState("Футболка белая");
  const [price, setPrice] = useState("");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [colorsExpanded, setColorsExpanded] = useState(false);
  const [productLink, setProductLink] = useState("");
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
            {/* Edit Icon */}
            <button 
              className="absolute top-2 right-2 w-7 h-7 bg-black/40 hover:bg-black/50 text-white rounded-full flex items-center justify-center transition-colors"
              data-testid="button-edit-photo"
            >
              <Pencil size={14} />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button className="flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 rounded-xl text-white hover:bg-blue-700 transition-colors" data-testid="button-retake">
            <Camera size={20} />
            Переснять
          </button>
          <button className="flex items-center justify-center gap-2 py-3 px-4 bg-red-600 rounded-xl text-white hover:bg-red-700 transition-colors" data-testid="button-delete">
            <Trash2 size={20} />
            Удалить
          </button>
        </div>

        {/* Item Details */}
        {/* First Group: Name, Color, Price */}
        <div className="space-y-4 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
          {/* Name */}
          <div>
            <label className="block text-base font-bold text-foreground mb-2">Название</label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full text-lg font-semibold bg-transparent border-none outline-none text-foreground"
              data-testid="input-name"
            />
          </div>

          {/* Color */}
          <div>
            <label className="block text-base font-bold text-foreground mb-2">Цвет</label>
            <div className="bg-muted/50 rounded-xl p-3">
              <div className="grid grid-cols-6 gap-2">
                {/* Basic Colors */}
                <button
                  onClick={() => setSelectedColor('white')}
                  className={`w-11 h-11 rounded-full border-2 bg-white shadow-lg ${selectedColor === 'white' ? 'border-foreground ring-2 ring-offset-2 ring-foreground' : 'border-border'}`}
                  style={{ boxShadow: '0 4px 8px rgba(255, 255, 255, 0.4)' }}
                  data-testid="color-swatch-white"
                />
                <button
                  onClick={() => setSelectedColor('black')}
                  className={`w-11 h-11 rounded-full border-2 bg-black shadow-lg ${selectedColor === 'black' ? 'border-foreground ring-2 ring-offset-2 ring-foreground' : 'border-border'}`}
                  style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)' }}
                  data-testid="color-swatch-black"
                />
                <button
                  onClick={() => setSelectedColor('brown')}
                  className={`w-11 h-11 rounded-full border-2 bg-amber-800 shadow-lg ${selectedColor === 'brown' ? 'border-foreground ring-2 ring-offset-2 ring-foreground' : 'border-border'}`}
                  style={{ boxShadow: '0 4px 8px rgba(146, 64, 14, 0.4)' }}
                  data-testid="color-swatch-brown"
                />
                <button
                  onClick={() => setSelectedColor('blue')}
                  className={`w-11 h-11 rounded-full border-2 bg-blue-600 shadow-lg ${selectedColor === 'blue' ? 'border-foreground ring-2 ring-offset-2 ring-foreground' : 'border-border'}`}
                  style={{ boxShadow: '0 4px 8px rgba(37, 99, 235, 0.4)' }}
                  data-testid="color-swatch-blue"
                />
                <button
                  onClick={() => setSelectedColor('red')}
                  className={`w-11 h-11 rounded-full border-2 bg-red-600 shadow-lg ${selectedColor === 'red' ? 'border-foreground ring-2 ring-offset-2 ring-foreground' : 'border-border'}`}
                  style={{ boxShadow: '0 4px 8px rgba(220, 38, 127, 0.4)' }}
                  data-testid="color-swatch-red"
                />
                <button
                  onClick={() => setColorsExpanded(!colorsExpanded)}
                  className="w-11 h-11 rounded-full border-2 border-border bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
                  data-testid="button-expand-colors"
                  aria-expanded={colorsExpanded}
                >
                  <ChevronDown size={16} className={`transition-transform ${colorsExpanded ? 'rotate-180' : ''}`} />
                </button>
              </div>
              
              {/* Extended Colors */}
              {colorsExpanded && (
                <div className="grid grid-cols-6 gap-2 mt-3 pt-3 border-t border-border/20">
                  <button
                    onClick={() => setSelectedColor('gray')}
                    className={`w-11 h-11 rounded-full border-2 bg-gray-500 shadow-lg ${selectedColor === 'gray' ? 'border-foreground ring-2 ring-offset-2 ring-foreground' : 'border-border'}`}
                    style={{ boxShadow: '0 4px 8px rgba(107, 114, 128, 0.4)' }}
                    data-testid="color-swatch-gray-more"
                  />
                  <button
                    onClick={() => setSelectedColor('green')}
                    className={`w-11 h-11 rounded-full border-2 bg-green-600 shadow-lg ${selectedColor === 'green' ? 'border-foreground ring-2 ring-offset-2 ring-foreground' : 'border-border'}`}
                    style={{ boxShadow: '0 4px 8px rgba(22, 163, 74, 0.4)' }}
                    data-testid="color-swatch-green-more"
                  />
                  <button
                    onClick={() => setSelectedColor('yellow')}
                    className={`w-11 h-11 rounded-full border-2 bg-yellow-500 shadow-lg ${selectedColor === 'yellow' ? 'border-foreground ring-2 ring-offset-2 ring-foreground' : 'border-border'}`}
                    style={{ boxShadow: '0 4px 8px rgba(234, 179, 8, 0.4)' }}
                    data-testid="color-swatch-yellow-more"
                  />
                  <button
                    onClick={() => setSelectedColor('purple')}
                    className={`w-11 h-11 rounded-full border-2 bg-purple-600 shadow-lg ${selectedColor === 'purple' ? 'border-foreground ring-2 ring-offset-2 ring-foreground' : 'border-border'}`}
                    style={{ boxShadow: '0 4px 8px rgba(147, 51, 234, 0.4)' }}
                    data-testid="color-swatch-purple-more"
                  />
                  <button
                    onClick={() => setSelectedColor('pink')}
                    className={`w-11 h-11 rounded-full border-2 bg-pink-500 shadow-lg ${selectedColor === 'pink' ? 'border-foreground ring-2 ring-offset-2 ring-foreground' : 'border-border'}`}
                    style={{ boxShadow: '0 4px 8px rgba(236, 72, 153, 0.4)' }}
                    data-testid="color-swatch-pink-more"
                  />
                  <button
                    onClick={() => setSelectedColor('orange')}
                    className={`w-11 h-11 rounded-full border-2 bg-orange-500 shadow-lg ${selectedColor === 'orange' ? 'border-foreground ring-2 ring-offset-2 ring-foreground' : 'border-border'}`}
                    style={{ boxShadow: '0 4px 8px rgba(249, 115, 22, 0.4)' }}
                    data-testid="color-swatch-orange-more"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="block text-base font-bold text-foreground mb-2">Цена</label>
            <div className="relative">
              <input
                type="number"
                step="0.01"
                inputMode="decimal"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Введите цену в рублях"
                className="w-full text-lg font-semibold bg-transparent border-none outline-none text-foreground pr-8"
                data-testid="input-price"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lg font-semibold text-muted-foreground">₽</span>
            </div>
          </div>
        </div>

        {/* Second Group: Category, Style, Season */}
        <div className="mt-6 space-y-4 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
          {/* Category */}
          <div>
            <label className="block text-base font-bold text-foreground mb-2">Категория</label>
            <div className="flex items-center gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full text-lg font-semibold bg-transparent border-none outline-none text-foreground"
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
            <label className="block text-base font-bold text-foreground mb-2">Стиль</label>
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
            <label className="block text-base font-bold text-foreground mb-2">Сезон</label>
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

        {/* Product Link */}
        <div className="mt-12">
          <input
            type="url"
            value={productLink}
            onChange={(e) => setProductLink(e.target.value)}
            placeholder="Добавьте ссылку на товар"
            className="w-full text-lg font-semibold bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
            data-testid="input-product-link"
          />
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