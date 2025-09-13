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
      <div className="px-6 py-8 max-w-lg mx-auto">
        {/* Image Section */}
        <div className="w-full max-w-sm mx-auto mb-8">
          <div 
            className="w-full rounded-3xl relative overflow-hidden transition-all duration-300 hover:scale-[1.02]"
            style={{ 
              aspectRatio: '1/1',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(20px)',
              border: '2px solid rgba(255, 255, 255, 0.25)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15), 0 8px 16px rgba(0, 0, 0, 0.1)'
            }}
          >
            <img
              src={imageUrl}
              alt="Uploaded item"
              className="w-full h-full object-cover"
            />
            {/* Edit Icon */}
            <button 
              className="absolute top-4 right-4 w-10 h-10 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{
                background: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)'
              }}
              data-testid="button-edit-photo"
            >
              <Pencil size={16} />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button 
            className="flex items-center justify-center gap-2 py-4 px-4 rounded-2xl text-white font-medium transition-all duration-200 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
            style={{
              background: '#E0C58F',
              boxShadow: '0 8px 20px rgba(224, 197, 143, 0.4)'
            }}
            data-testid="button-retake"
          >
            <Camera size={18} />
            Переснять
          </button>
          <button 
            className="flex items-center justify-center gap-2 py-4 px-4 rounded-2xl text-white font-medium transition-all duration-200 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
            style={{
              background: 'rgba(220, 38, 38, 0.9)',
              boxShadow: '0 8px 20px rgba(220, 38, 38, 0.3)'
            }}
            data-testid="button-delete"
          >
            <Trash2 size={18} />
            Удалить
          </button>
        </div>

        {/* Item Details */}
        {/* First Group: Name, Color, Price */}
        <div 
          className="space-y-6 rounded-3xl p-6 mb-6 transition-all duration-300 hover:shadow-2xl"
          style={{
            background: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(20px)',
            border: '1.5px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 16px 32px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(0, 0, 0, 0.1)'
          }}
        >
          {/* Name */}
          <div>
            <label className="block text-xl font-black mb-3 tracking-tight" style={{ color: '#112250' }}>Название</label>
            <div 
              className="w-full rounded-xl p-4 transition-all duration-200 focus-within:scale-[1.01] focus-within:shadow-lg"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)'
              }}
            >
              <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="w-full text-lg font-semibold bg-transparent border-none outline-none text-black placeholder:text-gray-500"
                placeholder="Введите название элемента"
                data-testid="input-name"
              />
            </div>
          </div>

          {/* Color */}
          <div>
            <label className="block text-xl font-black mb-3 tracking-tight" style={{ color: '#112250' }}>Цвет</label>
            <div 
              className="rounded-xl p-4 transition-all duration-200"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)'
              }}
            >
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
            <label className="block text-xl font-black mb-3 tracking-tight" style={{ color: '#112250' }}>Цена</label>
            <div 
              className="relative rounded-xl p-4 transition-all duration-200 focus-within:scale-[1.01] focus-within:shadow-lg"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)'
              }}
            >
              <input
                type="number"
                step="0.01"
                inputMode="decimal"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Введите цену в рублях"
                className="w-full text-lg font-semibold bg-transparent border-none outline-none text-black pr-12 placeholder:text-gray-500"
                data-testid="input-price"
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lg font-bold" style={{ color: '#112250' }}>₽</span>
            </div>
          </div>
        </div>

        {/* Second Group: Category, Style, Season */}
        <div 
          className="space-y-6 rounded-3xl p-6 mb-8 transition-all duration-300 hover:shadow-2xl"
          style={{
            background: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(20px)',
            border: '1.5px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 16px 32px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(0, 0, 0, 0.1)'
          }}
        >
          {/* Category */}
          <div>
            <label className="block text-xl font-black mb-3 tracking-tight" style={{ color: '#112250' }}>Категория</label>
            <div 
              className="rounded-xl p-4 transition-all duration-200 focus-within:scale-[1.01] focus-within:shadow-lg"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)'
              }}
            >
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full text-lg font-semibold bg-transparent border-none outline-none text-black cursor-pointer"
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
            <label className="block text-xl font-black mb-3 tracking-tight" style={{ color: '#112250' }}>Стиль</label>
            <div 
              className="rounded-xl p-4 transition-all duration-200 focus-within:scale-[1.01] focus-within:shadow-lg"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)'
              }}
            >
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="w-full text-lg font-semibold bg-transparent border-none outline-none text-black cursor-pointer"
                data-testid="select-style"
              >
              <option value="Спорт">Спорт</option>
              <option value="Классический">Классический</option>
              <option value="Кажуал">Кажуал</option>
              <option value="Элегантный">Элегантный</option>
              </select>
            </div>
          </div>

          {/* Season */}
          <div>
            <label className="block text-xl font-black mb-3 tracking-tight" style={{ color: '#112250' }}>Сезон</label>
            <div 
              className="rounded-xl p-4 transition-all duration-200 focus-within:scale-[1.01] focus-within:shadow-lg"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)'
              }}
            >
              <select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
                className="w-full text-lg font-semibold bg-transparent border-none outline-none text-black cursor-pointer"
                data-testid="select-season"
              >
              <option value="Лето">Лето</option>
              <option value="Зима">Зима</option>
              <option value="Весна">Весна</option>
              <option value="Осень">Осень</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Link */}
        <div 
          className="rounded-3xl p-6 mb-8 transition-all duration-300 hover:shadow-2xl"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            border: '1.5px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)'
          }}
        >
          <label className="block text-xl font-black mb-3 tracking-tight" style={{ color: '#112250' }}>Ссылка на товар</label>
          <div 
            className="rounded-xl p-4 transition-all duration-200 focus-within:scale-[1.01] focus-within:shadow-lg"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)'
            }}
          >
            <input
              type="url"
              value={productLink}
              onChange={(e) => setProductLink(e.target.value)}
              placeholder="https://example.com/product"
              className="w-full text-lg font-semibold bg-transparent border-none outline-none text-black placeholder:text-gray-500"
              data-testid="input-product-link"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-4">
          <button
            className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-200 ${
              hasAnyValue 
                ? 'hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] text-white' 
                : 'cursor-not-allowed text-gray-500'
            }`}
            style={{
              backgroundColor: hasAnyValue ? '#112250' : 'rgba(229, 231, 235, 0.8)',
              boxShadow: hasAnyValue 
                ? '0 12px 28px rgba(17, 34, 80, 0.4), 0 4px 12px rgba(17, 34, 80, 0.2)' 
                : '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}
            disabled={!hasAnyValue}
            data-testid="button-save"
          >
            Сохранить элемент
          </button>
        </div>
      </div>
    </div>
  );
}