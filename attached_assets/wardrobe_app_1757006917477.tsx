import React, { useState } from 'react';
import { Camera, Upload, Plus, Settings, Palette, Share, Edit3, Trash2, Folder, ChevronLeft, ChevronRight, Home, Shirt, Image, ArrowLeft, Check, X } from 'lucide-react';

const WardrobeApp = () => {
  const [currentScreen, setCurrentScreen] = useState('wardrobe');
  const [selectedOutfitId, setSelectedOutfitId] = useState(null);
  const [wardrobeFilter, setWardrobeFilter] = useState('all');
  const [bodyParamsSet, setBodyParamsSet] = useState(false);
  const [currentBuildStep, setCurrentBuildStep] = useState('body');
  const [activeClothingSlot, setActiveClothingSlot] = useState(null);
  
  const [wardrobeItems, setWardrobeItems] = useState([
    { id: 1, type: 'top', image: 'https://via.placeholder.com/200x250/E5E7EB/9CA3AF?text=White+Shirt', name: 'White Shirt' },
    { id: 2, type: 'bottom', image: 'https://via.placeholder.com/200x250/E5E7EB/9CA3AF?text=Blue+Jeans', name: 'Blue Jeans' },
    { id: 3, type: 'shoes', image: 'https://via.placeholder.com/200x250/E5E7EB/9CA3AF?text=Sneakers', name: 'White Sneakers' },
    { id: 4, type: 'top', image: 'https://via.placeholder.com/200x250/E5E7EB/9CA3AF?text=Black+Tee', name: 'Black T-shirt' },
    { id: 5, type: 'accessory', image: 'https://via.placeholder.com/200x250/E5E7EB/9CA3AF?text=Watch', name: 'Silver Watch' },
    { id: 6, type: 'bottom', image: 'https://via.placeholder.com/200x250/E5E7EB/9CA3AF?text=Shorts', name: 'Denim Shorts' },
    { id: 7, type: 'headwear', image: 'https://via.placeholder.com/200x250/E5E7EB/9CA3AF?text=Cap', name: 'Baseball Cap' },
    { id: 8, type: 'jacket', image: 'https://via.placeholder.com/200x250/E5E7EB/9CA3AF?text=Jacket', name: 'Denim Jacket' },
  ]);
  
  const [currentOutfit, setCurrentOutfit] = useState({
    headwear: null,
    jacket: null,
    top: null,
    bottom: null,
    shoes: null,
    accessory: null
  });

  const [bodyParams, setBodyParams] = useState({
    height: '',
    weight: '',
    size: ''
  });

  const [savedOutfits, setSavedOutfits] = useState([
    { 
      id: 1, 
      name: 'Casual Friday', 
      image: 'https://via.placeholder.com/300x400/E5E7EB/9CA3AF?text=Outfit+1',
      items: {
        top: { name: 'White Shirt', image: 'https://via.placeholder.com/200x250/E5E7EB/9CA3AF?text=White+Shirt' },
        bottom: { name: 'Blue Jeans', image: 'https://via.placeholder.com/200x250/E5E7EB/9CA3AF?text=Blue+Jeans' },
        shoes: { name: 'Sneakers', image: 'https://via.placeholder.com/200x250/E5E7EB/9CA3AF?text=Sneakers' }
      },
      category: 'Work',
      createdDate: '2024-03-15',
      tags: ['casual', 'work', 'comfortable']
    },
    { 
      id: 2, 
      name: 'Weekend Chill', 
      image: 'https://via.placeholder.com/300x400/E5E7EB/9CA3AF?text=Outfit+2',
      items: {
        top: { name: 'Black Tee', image: 'https://via.placeholder.com/200x250/E5E7EB/9CA3AF?text=Black+Tee' },
        bottom: { name: 'Shorts', image: 'https://via.placeholder.com/200x250/E5E7EB/9CA3AF?text=Shorts' },
        shoes: { name: 'Sneakers', image: 'https://via.placeholder.com/200x250/E5E7EB/9CA3AF?text=Sneakers' }
      },
      category: 'Casual',
      createdDate: '2024-03-14',
      tags: ['weekend', 'relaxed', 'summer']
    },
    { 
      id: 3, 
      name: 'Date Night', 
      image: 'https://via.placeholder.com/300x400/E5E7EB/9CA3AF?text=Outfit+3',
      items: {
        jacket: { name: 'Denim Jacket', image: 'https://via.placeholder.com/200x250/E5E7EB/9CA3AF?text=Jacket' },
        top: { name: 'White Shirt', image: 'https://via.placeholder.com/200x250/E5E7EB/9CA3AF?text=White+Shirt' },
        bottom: { name: 'Blue Jeans', image: 'https://via.placeholder.com/200x250/E5E7EB/9CA3AF?text=Blue+Jeans' },
        accessory: { name: 'Watch', image: 'https://via.placeholder.com/200x250/E5E7EB/9CA3AF?text=Watch' }
      },
      category: 'Special',
      createdDate: '2024-03-13',
      tags: ['date', 'evening', 'stylish']
    }
  ]);

  const clothingSlots = [
    { key: 'headwear', name: 'Головные уборы', icon: '🧢' },
    { key: 'jacket', name: 'Куртки/Пиджаки', icon: '🧥' },
    { key: 'top', name: 'Верх', icon: '👕' },
    { key: 'bottom', name: 'Низ', icon: '👖' },
    { key: 'shoes', name: 'Обувь', icon: '👟' },
    { key: 'accessory', name: 'Аксессуары', icon: '⌚' },
  ];

  const navigationItems = [
    { id: 'wardrobe', icon: Home, label: 'Гардероб' },
    { id: 'builder', icon: Shirt, label: 'Конструктор' },
    { id: 'outfits', icon: Folder, label: 'Образы' },
  ];

  const categories = ['all', 'top', 'bottom', 'shoes', 'headwear', 'jacket', 'accessory'];

  const handleAddItem = () => {
    const newItem = {
      id: Date.now(),
      type: 'top',
      image: `https://via.placeholder.com/200x250/E5E7EB/9CA3AF?text=New+Item+${wardrobeItems.length + 1}`,
      name: `New Item ${wardrobeItems.length + 1}`
    };
    setWardrobeItems([...wardrobeItems, newItem]);
  };

  const filteredItems = (category) => 
    category === 'all' 
      ? wardrobeItems 
      : wardrobeItems.filter(item => item.type === category);

  const selectClothingItem = (item) => {
    setCurrentOutfit({
      ...currentOutfit,
      [activeClothingSlot]: item
    });
    setActiveClothingSlot(null);
  };

  const saveCurrentOutfit = () => {
    const newOutfit = {
      id: Date.now(),
      name: `Образ ${savedOutfits.length + 1}`,
      image: `https://via.placeholder.com/300x400/E5E7EB/9CA3AF?text=Outfit+${savedOutfits.length + 1}`,
      items: { ...currentOutfit },
      category: 'New',
      createdDate: new Date().toISOString().split('T')[0],
      tags: ['новый']
    };
    setSavedOutfits([...savedOutfits, newOutfit]);
    setCurrentBuildStep('complete');
  };

  const WardrobeScreen = () => (
    <div className="flex-1 bg-white">
      <div className="px-6 py-8">
        <h1 className="text-2xl font-light text-gray-900 mb-6">Мой Гардероб</h1>
        
        <div className="mb-8 p-6 bg-gray-50 rounded-2xl">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Загрузить фото</h2>
          <button className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors duration-200">
            <Camera size={24} className="mx-auto mb-2" />
            <span className="block font-medium">Добавить своё фото</span>
          </button>
        </div>
        
        <div className="flex space-x-4 mb-8">
          <button 
            onClick={handleAddItem}
            className="flex-1 flex items-center justify-center space-x-2 bg-gray-50 hover:bg-gray-100 text-gray-700 py-4 rounded-2xl border-2 border-dashed border-gray-300 transition-colors duration-200"
          >
            <Camera size={20} />
            <span className="font-medium">Сфотографировать</span>
          </button>
          <button 
            onClick={handleAddItem}
            className="flex-1 flex items-center justify-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-600 py-4 rounded-2xl border border-blue-200 transition-colors duration-200"
          >
            <Upload size={20} />
            <span className="font-medium">Загрузить</span>
          </button>
        </div>

        <div className="flex overflow-x-auto space-x-3 mb-6 pb-2">
          {categories.map((category) => (
            <button 
              key={category}
              onClick={() => setWardrobeFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                wardrobeFilter === category
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category === 'all' ? 'Всё' : category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {filteredItems(wardrobeFilter).map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
              <div className="aspect-square bg-gray-50">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <p className="text-sm text-gray-600 font-medium">{item.name}</p>
                <p className="text-xs text-gray-400 capitalize">{item.type}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const BuilderScreen = () => {
    if (currentBuildStep === 'body' && !bodyParamsSet) {
      return (
        <div className="flex-1 bg-white">
          <div className="px-6 py-8">
            <h1 className="text-2xl font-light text-gray-900 mb-8">Параметры тела</h1>
            
            <div className="mb-8 p-6 bg-gray-50 rounded-2xl">
              <p className="text-gray-600 mb-6">Введите свои параметры для лучшего подбора одежды</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Рост (см)</label>
                  <input
                    type="number"
                    value={bodyParams.height}
                    onChange={(e) => setBodyParams({...bodyParams, height: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200"
                    placeholder="170"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Вес (кг)</label>
                  <input
                    type="number"
                    value={bodyParams.weight}
                    onChange={(e) => setBodyParams({...bodyParams, weight: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200"
                    placeholder="65"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Размер</label>
                  <select
                    value={bodyParams.size}
                    onChange={(e) => setBodyParams({...bodyParams, size: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200"
                  >
                    <option value="">Выберите размер</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                  </select>
                </div>
              </div>
            </div>

            <button 
              onClick={() => {
                setBodyParamsSet(true);
                setCurrentBuildStep('build');
              }}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl transition-colors duration-200"
            >
              Продолжить
            </button>
          </div>
        </div>
      );
    }

    if (currentBuildStep === 'build') {
      return (
        <div className="flex-1 bg-white">
          <div className="px-6 py-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-light text-gray-900">Создать образ</h1>
              <button 
                onClick={() => setCurrentBuildStep('body')}
                className="p-2 bg-gray-100 rounded-full"
              >
                <Settings size={20} />
              </button>
            </div>

            <div className="space-y-4 mb-8">
              {clothingSlots.map((slot) => (
                <div key={slot.key} className="relative">
                  <button
                    onClick={() => setActiveClothingSlot(slot.key)}
                    className={`w-full p-6 rounded-2xl border-2 text-left transition-all duration-200 ${
                      currentOutfit[slot.key]
                        ? 'bg-blue-50 border-blue-200'
                        : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl">{slot.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{slot.name}</h3>
                        <p className="text-sm text-gray-500">
                          {currentOutfit[slot.key] ? currentOutfit[slot.key].name : 'Не выбрано'}
                        </p>
                      </div>
                      {currentOutfit[slot.key] && (
                        <div className="w-12 h-12 rounded-lg overflow-hidden">
                          <img 
                            src={currentOutfit[slot.key].image} 
                            alt={currentOutfit[slot.key].name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </button>

                  {activeClothingSlot === slot.key && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                      <div className="bg-white rounded-2xl m-4 max-w-sm w-full">
                        <div className="flex items-center justify-between p-4 border-b">
                          <h3 className="font-semibold">{slot.name}</h3>
                          <button 
                            onClick={() => setActiveClothingSlot(null)}
                            className="p-2 hover:bg-gray-100 rounded-full"
                          >
                            <X size={20} />
                          </button>
                        </div>
                        <div className="p-4">
                          <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                            {filteredItems(slot.key).map((item) => (
                              <button
                                key={item.id}
                                onClick={() => selectClothingItem(item)}
                                className="aspect-square rounded-xl overflow-hidden border border-gray-200 hover:border-blue-300 transition-colors duration-200"
                              >
                                <img 
                                  src={item.image} 
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button 
              onClick={saveCurrentOutfit}
              className="w-full py-4 bg-gray-900 hover:bg-black text-white font-semibold rounded-2xl transition-colors duration-200"
            >
              Готово
            </button>
          </div>
        </div>
      );
    }

    if (currentBuildStep === 'complete') {
      return (
        <div className="flex-1 bg-white">
          <div className="px-6 py-8 text-center">
            <div className="mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-green-600" />
              </div>
              <h1 className="text-2xl font-light text-gray-900 mb-4">Образ готов!</h1>
              <p className="text-gray-600">Ваш образ сохранён в профиле</p>
            </div>

            <div className="mb-8 p-4 bg-gray-50 rounded-2xl">
              <img 
                src="https://via.placeholder.com/200x250/E5E7EB/9CA3AF?text=Your+Outfit"
                alt="Your outfit"
                className="w-32 h-40 mx-auto rounded-xl mb-4"
              />
              <h3 className="font-semibold text-gray-900">Образ {savedOutfits.length}</h3>
            </div>

            <div className="space-y-3">
              <button className="w-full py-3 bg-blue-50 text-blue-600 font-medium rounded-xl border border-blue-200">
                <Share size={16} className="inline mr-2" />
                Поделиться
              </button>
              
              <button 
                onClick={() => setCurrentBuildStep('ai')}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl"
              >
                <Palette size={16} className="inline mr-2" />
                AI генерация
              </button>

              <button 
                onClick={() => {
                  setCurrentBuildStep('build');
                  setCurrentOutfit({
                    headwear: null,
                    jacket: null,
                    top: null,
                    bottom: null,
                    shoes: null,
                    accessory: null
                  });
                }}
                className="w-full py-3 bg-gray-100 text-gray-700 font-medium rounded-xl"
              >
                Создать новый образ
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (currentBuildStep === 'ai') {
      return (
        <div className="flex-1 bg-white">
          <div className="px-6 py-8">
            <div className="flex items-center mb-8">
              <button 
                onClick={() => setCurrentBuildStep('complete')}
                className="p-2 mr-4 hover:bg-gray-100 rounded-full"
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-2xl font-light text-gray-900">AI Генерация</h1>
            </div>
            
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Выберите фон</h2>
              <div className="grid grid-cols-2 gap-4">
                {['Город', 'Помещение', 'Ночь', 'Туман'].map((bg) => (
                  <button key={bg} className="p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl border border-gray-200 transition-colors duration-200">
                    <div className="aspect-video bg-gradient-to-br from-gray-300 to-gray-400 rounded-xl mb-2"></div>
                    <p className="text-sm font-medium text-gray-700">{bg}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8 p-6 bg-gray-50 rounded-2xl">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Загрузите фото лица</h2>
              <button className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors duration-200">
                <Camera size={24} className="mx-auto mb-2" />
                <span className="block font-medium">Добавить фото</span>
              </button>
            </div>

            <button className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-lg transition-all duration-200">
              Сгенерировать фото
            </button>

            <div className="mt-8 p-6 bg-gray-50 rounded-2xl">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Результат</h2>
              <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <Image size={48} className="mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500">Сгенерированное фото появится здесь</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  const OutfitsScreen = () => {
    if (selectedOutfitId) {
      const outfit = savedOutfits.find(o => o.id === selectedOutfitId);
      if (!outfit) return null;

      return (
        <div className="flex-1 bg-white">
          <div className="px-6 py-8">
            <div className="flex items-center justify-between mb-8">
              <button 
                onClick={() => setSelectedOutfitId(null)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <ArrowLeft size={20} />
              </button>
              <div className="flex space-x-2">
                <button className="p-2 bg-gray-100 rounded-full">
                  <Edit3 size={16} />
                </button>
                <button className="p-2 bg-gray-100 rounded-full">
                  <Share size={16} />
                </button>
                <button className="p-2 bg-red-100 rounded-full">
                  <Trash2 size={16} className="text-red-500" />
                </button>
              </div>
            </div>

            <div className="text-center mb-8">
              <img 
                src={outfit.image}
                alt={outfit.name}
                className="w-48 h-64 mx-auto rounded-2xl mb-4 object-cover"
              />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{outfit.name}</h1>
              <p className="text-gray-500 mb-2">{outfit.category}</p>
              <p className="text-sm text-gray-400">Создан: {outfit.createdDate}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Детали образа</h2>
              <div className="space-y-3">
                {Object.entries(outfit.items).map(([category, item]) => (
                  <div key={category} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-xl">
                    <img 
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500 capitalize">{category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Теги</h2>
              <div className="flex flex-wrap gap-2">
                {outfit.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <button className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl">
              <Palette size={16} className="inline mr-2" />
              AI генерация с этим образом
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="flex-1 bg-white">
        <div className="px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-light text-gray-900">Мои образы</h1>
            <button className="p-2 bg-blue-50 rounded-full">
              <Plus size={20} className="text-blue-600" />
            </button>
          </div>

          <div className="flex space-x-3 mb-6 overflow-x-auto pb-2">
            {['Все', 'Work', 'Casual', 'Special'].map((category) => (
              <button 
                key={category}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200"
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {savedOutfits.map((outfit) => (
              <button
                key={outfit.id}
                onClick={() => setSelectedOutfitId(outfit.id)}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                <div className="aspect-[3/4]">
                  <img 
                    src={outfit.image}
                    alt={outfit.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 text-left">
                  <h3 className="font-semibold text-gray-900 text-sm">{outfit.name}</h3>
                  <p className="text-xs text-gray-500">{outfit.category}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-sm mx-auto bg-white min-h-screen flex flex-col">
      <div className="bg-white px-6 pt-4 pb-2">
        <div className="flex justify-between items-center text-sm text-gray-900">
          <span className="font-medium">9:41</span>
          <div className="flex space-x-1">
            <div className="w-4 h-2 bg-gray-300 rounded-sm"></div>
            <div className="w-6 h-2 bg-gray-900 rounded-sm"></div>
          </div>
        </div>
      </div>

      {currentScreen === 'wardrobe' && <WardrobeScreen />}
      {currentScreen === 'builder' && <BuilderScreen />}
      {currentScreen === 'outfits' && <OutfitsScreen />}

      {!selectedOutfitId && currentBuildStep !== 'ai' && (
        <div className="bg-white border-t border-gray-100 px-6 py-4">
          <div className="flex justify-around">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentScreen(item.id);
                  if (item.id === 'builder') {
                    setCurrentBuildStep(bodyParamsSet ? 'build' : 'body');
                  }
                }}
                className={`flex flex-col items-center space-y-1 transition-colors duration-200 ${
                  currentScreen === item.id ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <item.icon size={20} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WardrobeApp;