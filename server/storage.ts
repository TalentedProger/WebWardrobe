import { type User, type InsertUser, type ClothingItem, type InsertClothingItem, type Outfit, type InsertOutfit, type BodyParams, type InsertBodyParams } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getClothingItems(userId: string): Promise<ClothingItem[]>;
  getClothingItemsByType(userId: string, type: string): Promise<ClothingItem[]>;
  createClothingItem(item: InsertClothingItem): Promise<ClothingItem>;
  deleteClothingItem(id: string, userId: string): Promise<boolean>;
  
  getOutfits(userId: string): Promise<Outfit[]>;
  getOutfitsByCategory(userId: string, category: string): Promise<Outfit[]>;
  createOutfit(outfit: InsertOutfit): Promise<Outfit>;
  updateOutfit(id: string, outfit: Partial<InsertOutfit>, userId: string): Promise<Outfit | undefined>;
  deleteOutfit(id: string, userId: string): Promise<boolean>;
  
  getBodyParams(userId: string): Promise<BodyParams | undefined>;
  upsertBodyParams(params: InsertBodyParams): Promise<BodyParams>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private clothingItems: Map<string, ClothingItem>;
  private outfits: Map<string, Outfit>;
  private bodyParams: Map<string, BodyParams>;

  constructor() {
    this.users = new Map();
    this.clothingItems = new Map();
    this.outfits = new Map();
    this.bodyParams = new Map();
    
    // Add sample data
    this.initializeSampleData();
  }

  private async initializeSampleData() {
    // Create sample user
    const sampleUser = await this.createUser({ username: "demo", password: "demo" });
    
    // Add sample clothing items
    const sampleItems: InsertClothingItem[] = [
      {
        userId: sampleUser.id,
        name: "Белая рубашка",
        type: "top",
        imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
        tags: ["casual", "work"]
      },
      {
        userId: sampleUser.id,
        name: "Синие джинсы",
        type: "bottom",
        imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
        tags: ["casual", "denim"]
      },
      {
        userId: sampleUser.id,
        name: "Белые кроссовки",
        type: "shoes",
        imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
        tags: ["casual", "sport"]
      },
      {
        userId: sampleUser.id,
        name: "Черная футболка",
        type: "top",
        imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
        tags: ["casual"]
      },
      {
        userId: sampleUser.id,
        name: "Серебряные часы",
        type: "accessory",
        imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
        tags: ["formal", "accessory"]
      },
      {
        userId: sampleUser.id,
        name: "Джинсовые шорты",
        type: "bottom",
        imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
        tags: ["summer", "casual"]
      },
      {
        userId: sampleUser.id,
        name: "Бейсболка",
        type: "headwear",
        imageUrl: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
        tags: ["casual", "sport"]
      },
      {
        userId: sampleUser.id,
        name: "Джинсовая куртка",
        type: "jacket",
        imageUrl: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
        tags: ["casual", "denim"]
      }
    ];

    for (const item of sampleItems) {
      await this.createClothingItem(item);
    }

    // Add sample outfits
    const items = Array.from(this.clothingItems.values()).filter(item => item.userId === sampleUser.id);
    const whiteShirt = items.find(item => item.name === "Белая рубашка");
    const blueJeans = items.find(item => item.name === "Синие джинсы");
    const whiteSneakers = items.find(item => item.name === "Белые кроссовки");
    const blackTee = items.find(item => item.name === "Черная футболка");
    const shorts = items.find(item => item.name === "Джинсовые шорты");
    const watch = items.find(item => item.name === "Серебряные часы");
    const jacket = items.find(item => item.name === "Джинсовая куртка");

    const sampleOutfits: InsertOutfit[] = [
      {
        userId: sampleUser.id,
        name: "Casual Friday",
        items: {
          top: whiteShirt?.id,
          bottom: blueJeans?.id,
          shoes: whiteSneakers?.id
        },
        category: "Work",
        tags: ["casual", "work", "comfortable"],
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
      },
      {
        userId: sampleUser.id,
        name: "Weekend Chill",
        items: {
          top: blackTee?.id,
          bottom: shorts?.id,
          shoes: whiteSneakers?.id
        },
        category: "Casual",
        tags: ["weekend", "relaxed", "summer"],
        imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
      },
      {
        userId: sampleUser.id,
        name: "Date Night",
        items: {
          jacket: jacket?.id,
          top: whiteShirt?.id,
          bottom: blueJeans?.id,
          accessory: watch?.id
        },
        category: "Special",
        tags: ["date", "evening", "stylish"],
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
      }
    ];

    for (const outfit of sampleOutfits) {
      await this.createOutfit(outfit);
    }
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getClothingItems(userId: string): Promise<ClothingItem[]> {
    return Array.from(this.clothingItems.values()).filter(item => item.userId === userId);
  }

  async getClothingItemsByType(userId: string, type: string): Promise<ClothingItem[]> {
    return Array.from(this.clothingItems.values()).filter(
      item => item.userId === userId && item.type === type
    );
  }

  async createClothingItem(item: InsertClothingItem): Promise<ClothingItem> {
    const id = randomUUID();
    const clothingItem: ClothingItem = { 
      ...item, 
      id, 
      createdAt: new Date() 
    };
    this.clothingItems.set(id, clothingItem);
    return clothingItem;
  }

  async deleteClothingItem(id: string, userId: string): Promise<boolean> {
    const item = this.clothingItems.get(id);
    if (item && item.userId === userId) {
      this.clothingItems.delete(id);
      return true;
    }
    return false;
  }

  async getOutfits(userId: string): Promise<Outfit[]> {
    return Array.from(this.outfits.values()).filter(outfit => outfit.userId === userId);
  }

  async getOutfitsByCategory(userId: string, category: string): Promise<Outfit[]> {
    return Array.from(this.outfits.values()).filter(
      outfit => outfit.userId === userId && outfit.category === category
    );
  }

  async createOutfit(outfit: InsertOutfit): Promise<Outfit> {
    const id = randomUUID();
    const newOutfit: Outfit = { 
      ...outfit, 
      id, 
      createdAt: new Date() 
    };
    this.outfits.set(id, newOutfit);
    return newOutfit;
  }

  async updateOutfit(id: string, outfit: Partial<InsertOutfit>, userId: string): Promise<Outfit | undefined> {
    const existing = this.outfits.get(id);
    if (existing && existing.userId === userId) {
      const updated = { ...existing, ...outfit };
      this.outfits.set(id, updated);
      return updated;
    }
    return undefined;
  }

  async deleteOutfit(id: string, userId: string): Promise<boolean> {
    const outfit = this.outfits.get(id);
    if (outfit && outfit.userId === userId) {
      this.outfits.delete(id);
      return true;
    }
    return false;
  }

  async getBodyParams(userId: string): Promise<BodyParams | undefined> {
    return this.bodyParams.get(userId);
  }

  async upsertBodyParams(params: InsertBodyParams): Promise<BodyParams> {
    const id = randomUUID();
    const bodyParam: BodyParams = { 
      ...params, 
      id, 
      updatedAt: new Date() 
    };
    this.bodyParams.set(params.userId, bodyParam);
    return bodyParam;
  }
}

export const storage = new MemStorage();
