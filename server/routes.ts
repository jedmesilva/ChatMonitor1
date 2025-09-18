import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertVehicleSchema, 
  insertFuelRecordSchema, 
  insertChatMessageSchema 
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Mock user ID for development (in real app, would come from authentication)
  const DEMO_USER_ID = "demo-user-1";

  // Vehicle routes
  app.get("/api/vehicles", async (req, res) => {
    try {
      const vehicles = await storage.getVehiclesByUserId(DEMO_USER_ID);
      res.json(vehicles);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      res.status(500).json({ error: "Failed to fetch vehicles" });
    }
  });

  app.post("/api/vehicles", async (req, res) => {
    try {
      const vehicleData = insertVehicleSchema.parse({
        ...req.body,
        userId: DEMO_USER_ID
      });
      const vehicle = await storage.createVehicle(vehicleData);
      res.status(201).json(vehicle);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid vehicle data", details: error.errors });
      } else {
        console.error("Error creating vehicle:", error);
        res.status(500).json({ error: "Failed to create vehicle" });
      }
    }
  });

  app.get("/api/vehicles/:id", async (req, res) => {
    try {
      const vehicle = await storage.getVehicle(req.params.id);
      if (!vehicle || vehicle.userId !== DEMO_USER_ID) {
        res.status(404).json({ error: "Vehicle not found" });
        return;
      }
      res.json(vehicle);
    } catch (error) {
      console.error("Error fetching vehicle:", error);
      res.status(500).json({ error: "Failed to fetch vehicle" });
    }
  });

  app.patch("/api/vehicles/:id", async (req, res) => {
    try {
      const existingVehicle = await storage.getVehicle(req.params.id);
      if (!existingVehicle || existingVehicle.userId !== DEMO_USER_ID) {
        res.status(404).json({ error: "Vehicle not found" });
        return;
      }
      
      const updateData = insertVehicleSchema.omit({ userId: true }).partial().parse(req.body);
      const updatedVehicle = await storage.updateVehicle(req.params.id, updateData);
      res.json(updatedVehicle);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid update data", details: error.errors });
      } else {
        console.error("Error updating vehicle:", error);
        res.status(500).json({ error: "Failed to update vehicle" });
      }
    }
  });

  app.delete("/api/vehicles/:id", async (req, res) => {
    try {
      const vehicle = await storage.getVehicle(req.params.id);
      if (!vehicle || vehicle.userId !== DEMO_USER_ID) {
        res.status(404).json({ error: "Vehicle not found" });
        return;
      }
      
      await storage.deleteVehicle(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting vehicle:", error);
      res.status(500).json({ error: "Failed to delete vehicle" });
    }
  });

  // Fuel record routes
  app.get("/api/vehicles/:vehicleId/fuel-records", async (req, res) => {
    try {
      // Validate vehicle exists and belongs to user
      const vehicle = await storage.getVehicle(req.params.vehicleId);
      if (!vehicle || vehicle.userId !== DEMO_USER_ID) {
        res.status(404).json({ error: "Vehicle not found" });
        return;
      }
      
      const fuelRecords = await storage.getFuelRecordsByVehicleId(req.params.vehicleId);
      res.json(fuelRecords);
    } catch (error) {
      console.error("Error fetching fuel records:", error);
      res.status(500).json({ error: "Failed to fetch fuel records" });
    }
  });

  app.post("/api/vehicles/:vehicleId/fuel-records", async (req, res) => {
    try {
      // Validate vehicle exists and belongs to user
      const vehicle = await storage.getVehicle(req.params.vehicleId);
      if (!vehicle || vehicle.userId !== DEMO_USER_ID) {
        res.status(404).json({ error: "Vehicle not found" });
        return;
      }
      
      const fuelRecordData = insertFuelRecordSchema.parse({
        ...req.body,
        vehicleId: req.params.vehicleId
      });
      const fuelRecord = await storage.createFuelRecord(fuelRecordData);
      res.status(201).json(fuelRecord);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid fuel record data", details: error.errors });
      } else {
        console.error("Error creating fuel record:", error);
        res.status(500).json({ error: "Failed to create fuel record" });
      }
    }
  });

  app.get("/api/fuel-records/:id", async (req, res) => {
    try {
      const fuelRecord = await storage.getFuelRecord(req.params.id);
      if (!fuelRecord) {
        res.status(404).json({ error: "Fuel record not found" });
        return;
      }
      
      // Validate ownership through vehicle
      const vehicle = await storage.getVehicle(fuelRecord.vehicleId);
      if (!vehicle || vehicle.userId !== DEMO_USER_ID) {
        res.status(404).json({ error: "Fuel record not found" });
        return;
      }
      
      res.json(fuelRecord);
    } catch (error) {
      console.error("Error fetching fuel record:", error);
      res.status(500).json({ error: "Failed to fetch fuel record" });
    }
  });

  app.patch("/api/fuel-records/:id", async (req, res) => {
    try {
      const fuelRecord = await storage.getFuelRecord(req.params.id);
      if (!fuelRecord) {
        res.status(404).json({ error: "Fuel record not found" });
        return;
      }
      
      // Validate ownership through vehicle
      const vehicle = await storage.getVehicle(fuelRecord.vehicleId);
      if (!vehicle || vehicle.userId !== DEMO_USER_ID) {
        res.status(404).json({ error: "Fuel record not found" });
        return;
      }
      
      const updateData = insertFuelRecordSchema.partial().omit({ vehicleId: true }).parse(req.body);
      const updatedRecord = await storage.updateFuelRecord(req.params.id, updateData);
      res.json(updatedRecord);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid update data", details: error.errors });
      } else {
        console.error("Error updating fuel record:", error);
        res.status(500).json({ error: "Failed to update fuel record" });
      }
    }
  });

  app.delete("/api/fuel-records/:id", async (req, res) => {
    try {
      const fuelRecord = await storage.getFuelRecord(req.params.id);
      if (!fuelRecord) {
        res.status(404).json({ error: "Fuel record not found" });
        return;
      }
      
      // Validate ownership through vehicle
      const vehicle = await storage.getVehicle(fuelRecord.vehicleId);
      if (!vehicle || vehicle.userId !== DEMO_USER_ID) {
        res.status(404).json({ error: "Fuel record not found" });
        return;
      }
      
      await storage.deleteFuelRecord(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting fuel record:", error);
      res.status(500).json({ error: "Failed to delete fuel record" });
    }
  });

  // Chat message routes
  app.get("/api/chat/messages", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
      const messages = await storage.getChatMessagesByUserId(DEMO_USER_ID, limit);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  app.post("/api/chat/messages", async (req, res) => {
    try {
      const messageData = insertChatMessageSchema.parse({
        ...req.body,
        userId: DEMO_USER_ID
      });
      const message = await storage.createChatMessage(messageData);
      res.status(201).json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid message data", details: error.errors });
      } else {
        console.error("Error creating message:", error);
        res.status(500).json({ error: "Failed to create message" });
      }
    }
  });

  // Chat processing validation schema
  const chatProcessSchema = z.object({
    content: z.string().min(1, "Message content is required"),
    type: z.enum(['user', 'kmonitor']).default('user')
  });

  // Chat processing endpoint - handles user messages and generates AI responses
  app.post("/api/chat/process", async (req, res) => {
    try {
      const { content, type } = chatProcessSchema.parse(req.body);

      // Save user message
      const userMessage = await storage.createChatMessage({
        userId: DEMO_USER_ID,
        type,
        content,
        metadata: null
      });

      // Generate AI response based on message content
      let aiResponse = "";
      let metadata = null;

      // Simple pattern matching for fuel-related messages
      if (content.toLowerCase().includes("abastec") || content.toLowerCase().includes("gasolina")) {
        // Parse fuel data from message (basic implementation)
        const fuelMatch = content.match(/(\d+,?\d*)\s*l/i);
        const priceMatch = content.match(/r\$?\s*(\d+,?\d*)/i);
        
        if (fuelMatch && priceMatch) {
          const liters = parseFloat(fuelMatch[1].replace(',', '.'));
          const totalPrice = parseFloat(priceMatch[1].replace(',', '.'));
          const pricePerLiter = totalPrice / liters;

          // Store fuel record if we have a vehicle
          const vehicles = await storage.getVehiclesByUserId(DEMO_USER_ID);
          if (vehicles.length > 0) {
            await storage.createFuelRecord({
              vehicleId: vehicles[0].id,
              liters,
              priceTotal: totalPrice,
              pricePerLiter,
              stationName: null,
              odometer: null
            });
          }

          aiResponse = `Perfeito! Analisei seu abastecimento de ${liters}L por R$ ${totalPrice.toFixed(2)}. Seu consumo está sendo calculado e você fez uma boa escolha!`;
          metadata = JSON.stringify({ showAnalysis: true, fuelData: { liters, totalPrice, pricePerLiter } });
        } else {
          aiResponse = "Entendi que você abasteceu! Pode me dar mais detalhes sobre a quantidade de litros e o valor pago?";
        }
      } else if (content.toLowerCase().includes("consumo") || content.toLowerCase().includes("média")) {
        aiResponse = "Seu consumo está muito bom! Vou mostrar os detalhes e tendências dos últimos meses.";
        metadata = JSON.stringify({ showTrends: true });
      } else if (content.toLowerCase().includes("foto") || content.toLowerCase().includes("painel")) {
        aiResponse = "Identifiquei os dados da sua foto! Vou analisar as informações do painel para você.";
        metadata = JSON.stringify({ 
          insights: [
            { icon: "MapPin", text: "Dados extraídos do painel com sucesso" },
            { icon: "Fuel", text: "Nível de combustível identificado" },
            { icon: "Clock", text: "Quilometragem atual registrada" }
          ]
        });
      } else {
        aiResponse = "Estou aqui para ajudar com seu monitoramento de combustível! Pode me contar sobre abastecimentos, consumo, ou enviar fotos do painel.";
      }

      // Save AI response
      const aiMessage = await storage.createChatMessage({
        userId: DEMO_USER_ID,
        type: 'kmonitor',
        content: aiResponse,
        metadata
      });

      res.status(201).json({ userMessage, aiMessage });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid message data", details: error.errors });
      } else {
        console.error("Error processing chat message:", error);
        res.status(500).json({ error: "Failed to process message" });
      }
    }
  });

  // Analytics endpoint for fuel consumption calculations
  app.get("/api/analytics/consumption/:vehicleId", async (req, res) => {
    try {
      const fuelRecords = await storage.getFuelRecordsByVehicleId(req.params.vehicleId);
      
      if (fuelRecords.length < 2) {
        res.json({ 
          message: "Need at least 2 fuel records to calculate consumption",
          records: fuelRecords.length 
        });
        return;
      }

      // Calculate basic consumption metrics
      const totalLiters = fuelRecords.reduce((sum, record) => sum + record.liters, 0);
      const totalCost = fuelRecords.reduce((sum, record) => sum + record.priceTotal, 0);
      
      // Guard against division by zero
      if (totalLiters === 0) {
        res.json({ 
          message: "No fuel consumption data available",
          records: fuelRecords.length,
          totalLiters: 0,
          totalCost: 0
        });
        return;
      }
      
      const avgPricePerLiter = totalCost / totalLiters;

      // Calculate distance and consumption if we have odometer readings
      const recordsWithOdometer = fuelRecords.filter(record => record.odometer);
      let avgConsumption = null;
      let totalDistance = null;

      if (recordsWithOdometer.length >= 2) {
        const sortedRecords = recordsWithOdometer.sort((a, b) => 
          (a.createdAt?.getTime() || 0) - (b.createdAt?.getTime() || 0)
        );
        const firstRecord = sortedRecords[0];
        const lastRecord = sortedRecords[sortedRecords.length - 1];
        
        totalDistance = (lastRecord.odometer || 0) - (firstRecord.odometer || 0);
        avgConsumption = totalDistance / totalLiters;
      }

      res.json({
        totalRecords: fuelRecords.length,
        totalLiters,
        totalCost,
        avgPricePerLiter,
        avgConsumption,
        totalDistance,
        efficiency: avgConsumption && avgConsumption > 12 ? 'excelente' : 
                   avgConsumption && avgConsumption > 10 ? 'boa' : 'regular'
      });
    } catch (error) {
      console.error("Error calculating consumption analytics:", error);
      res.status(500).json({ error: "Failed to calculate analytics" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
