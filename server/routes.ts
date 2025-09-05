import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertClothingItemSchema, insertOutfitSchema, insertBodyParamsSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Clothing Items Routes
  app.get("/api/clothing-items", async (req, res) => {
    try {
      const userId = "demo-user-id"; // In real app, get from session
      const type = req.query.type as string;
      
      const items = type 
        ? await storage.getClothingItemsByType(userId, type)
        : await storage.getClothingItems(userId);
      
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch clothing items" });
    }
  });

  app.post("/api/clothing-items", async (req, res) => {
    try {
      const userId = "demo-user-id"; // In real app, get from session
      const validatedData = insertClothingItemSchema.parse({ ...req.body, userId });
      
      const item = await storage.createClothingItem(validatedData);
      res.json(item);
    } catch (error) {
      res.status(400).json({ message: "Failed to create clothing item" });
    }
  });

  app.delete("/api/clothing-items/:id", async (req, res) => {
    try {
      const userId = "demo-user-id"; // In real app, get from session
      const { id } = req.params;
      
      const deleted = await storage.deleteClothingItem(id, userId);
      if (deleted) {
        res.json({ success: true });
      } else {
        res.status(404).json({ message: "Item not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete clothing item" });
    }
  });

  // Outfits Routes
  app.get("/api/outfits", async (req, res) => {
    try {
      const userId = "demo-user-id"; // In real app, get from session
      const category = req.query.category as string;
      
      const outfits = category 
        ? await storage.getOutfitsByCategory(userId, category)
        : await storage.getOutfits(userId);
      
      res.json(outfits);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch outfits" });
    }
  });

  app.post("/api/outfits", async (req, res) => {
    try {
      const userId = "demo-user-id"; // In real app, get from session
      const validatedData = insertOutfitSchema.parse({ ...req.body, userId });
      
      const outfit = await storage.createOutfit(validatedData);
      res.json(outfit);
    } catch (error) {
      res.status(400).json({ message: "Failed to create outfit" });
    }
  });

  app.put("/api/outfits/:id", async (req, res) => {
    try {
      const userId = "demo-user-id"; // In real app, get from session
      const { id } = req.params;
      const validatedData = insertOutfitSchema.partial().parse(req.body);
      
      const outfit = await storage.updateOutfit(id, validatedData, userId);
      if (outfit) {
        res.json(outfit);
      } else {
        res.status(404).json({ message: "Outfit not found" });
      }
    } catch (error) {
      res.status(400).json({ message: "Failed to update outfit" });
    }
  });

  app.delete("/api/outfits/:id", async (req, res) => {
    try {
      const userId = "demo-user-id"; // In real app, get from session
      const { id } = req.params;
      
      const deleted = await storage.deleteOutfit(id, userId);
      if (deleted) {
        res.json({ success: true });
      } else {
        res.status(404).json({ message: "Outfit not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete outfit" });
    }
  });

  // Body Parameters Routes
  app.get("/api/body-params", async (req, res) => {
    try {
      const userId = "demo-user-id"; // In real app, get from session
      const params = await storage.getBodyParams(userId);
      res.json(params || null);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch body parameters" });
    }
  });

  app.post("/api/body-params", async (req, res) => {
    try {
      const userId = "demo-user-id"; // In real app, get from session
      const validatedData = insertBodyParamsSchema.parse({ ...req.body, userId });
      
      const params = await storage.upsertBodyParams(validatedData);
      res.json(params);
    } catch (error) {
      res.status(400).json({ message: "Failed to save body parameters" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
