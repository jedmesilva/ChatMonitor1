import { 
  type User, 
  type InsertUser,
  type Vehicle,
  type InsertVehicle,
  type FuelRecord,
  type InsertFuelRecord,
  type ChatMessage,
  type InsertChatMessage
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Vehicle methods
  getVehiclesByUserId(userId: string): Promise<Vehicle[]>;
  getVehicle(id: string): Promise<Vehicle | undefined>;
  createVehicle(vehicle: InsertVehicle): Promise<Vehicle>;
  updateVehicle(id: string, data: Partial<InsertVehicle>): Promise<Vehicle>;
  deleteVehicle(id: string): Promise<void>;
  
  // Fuel record methods
  getFuelRecordsByVehicleId(vehicleId: string): Promise<FuelRecord[]>;
  getFuelRecord(id: string): Promise<FuelRecord | undefined>;
  createFuelRecord(record: InsertFuelRecord): Promise<FuelRecord>;
  updateFuelRecord(id: string, data: Partial<Omit<InsertFuelRecord, 'vehicleId'>>): Promise<FuelRecord>;
  deleteFuelRecord(id: string): Promise<void>;
  
  // Chat message methods
  getChatMessagesByUserId(userId: string, limit?: number): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private vehicles: Map<string, Vehicle>;
  private fuelRecords: Map<string, FuelRecord>;
  private chatMessages: Map<string, ChatMessage>;

  constructor() {
    this.users = new Map();
    this.vehicles = new Map();
    this.fuelRecords = new Map();
    this.chatMessages = new Map();
  }

  // User methods
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

  // Vehicle methods
  async getVehiclesByUserId(userId: string): Promise<Vehicle[]> {
    return Array.from(this.vehicles.values()).filter(
      (vehicle) => vehicle.userId === userId,
    );
  }

  async getVehicle(id: string): Promise<Vehicle | undefined> {
    return this.vehicles.get(id);
  }

  async createVehicle(insertVehicle: InsertVehicle): Promise<Vehicle> {
    const id = randomUUID();
    const vehicle: Vehicle = { 
      ...insertVehicle, 
      id,
      brand: insertVehicle.brand || null,
      model: insertVehicle.model || null,
      year: insertVehicle.year || null,
      createdAt: new Date()
    };
    this.vehicles.set(id, vehicle);
    return vehicle;
  }

  async updateVehicle(id: string, data: Partial<InsertVehicle>): Promise<Vehicle> {
    const existing = this.vehicles.get(id);
    if (!existing) {
      throw new Error('Vehicle not found');
    }

    const updated: Vehicle = {
      ...existing,
      ...data,
      brand: data.brand !== undefined ? (data.brand || null) : existing.brand,
      model: data.model !== undefined ? (data.model || null) : existing.model,
      year: data.year !== undefined ? (data.year || null) : existing.year,
      id, // preserve ID
      createdAt: existing.createdAt // preserve creation date
    };
    
    this.vehicles.set(id, updated);
    return updated;
  }

  async deleteVehicle(id: string): Promise<void> {
    // Also delete all fuel records for this vehicle
    const fuelRecords = await this.getFuelRecordsByVehicleId(id);
    for (const record of fuelRecords) {
      this.fuelRecords.delete(record.id);
    }
    
    this.vehicles.delete(id);
  }

  // Fuel record methods
  async getFuelRecordsByVehicleId(vehicleId: string): Promise<FuelRecord[]> {
    return Array.from(this.fuelRecords.values())
      .filter((record) => record.vehicleId === vehicleId)
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  async getFuelRecord(id: string): Promise<FuelRecord | undefined> {
    return this.fuelRecords.get(id);
  }

  async createFuelRecord(insertRecord: InsertFuelRecord): Promise<FuelRecord> {
    const id = randomUUID();
    const record: FuelRecord = { 
      ...insertRecord, 
      id,
      stationName: insertRecord.stationName || null,
      odometer: insertRecord.odometer || null,
      createdAt: new Date()
    };
    this.fuelRecords.set(id, record);
    return record;
  }

  async updateFuelRecord(id: string, data: Partial<Omit<InsertFuelRecord, 'vehicleId'>>): Promise<FuelRecord> {
    const existing = this.fuelRecords.get(id);
    if (!existing) {
      throw new Error('Fuel record not found');
    }

    const updated: FuelRecord = {
      ...existing,
      ...data,
      stationName: data.stationName !== undefined ? (data.stationName || null) : existing.stationName,
      odometer: data.odometer !== undefined ? (data.odometer || null) : existing.odometer,
      id, // preserve ID
      vehicleId: existing.vehicleId, // preserve vehicle ID
      createdAt: existing.createdAt // preserve creation date
    };
    
    this.fuelRecords.set(id, updated);
    return updated;
  }

  async deleteFuelRecord(id: string): Promise<void> {
    this.fuelRecords.delete(id);
  }

  // Chat message methods
  async getChatMessagesByUserId(userId: string, limit: number = 50): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter((message) => message.userId === userId)
      .sort((a, b) => (a.createdAt?.getTime() || 0) - (b.createdAt?.getTime() || 0))
      .slice(-limit);
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = randomUUID();
    const message: ChatMessage = { 
      ...insertMessage, 
      id,
      metadata: insertMessage.metadata || null,
      createdAt: new Date()
    };
    this.chatMessages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
