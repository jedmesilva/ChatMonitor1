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
  
  // Fuel record methods
  getFuelRecordsByVehicleId(vehicleId: string): Promise<FuelRecord[]>;
  getFuelRecord(id: string): Promise<FuelRecord | undefined>;
  createFuelRecord(record: InsertFuelRecord): Promise<FuelRecord>;
  
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
      createdAt: new Date()
    };
    this.vehicles.set(id, vehicle);
    return vehicle;
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
      createdAt: new Date()
    };
    this.fuelRecords.set(id, record);
    return record;
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
      createdAt: new Date()
    };
    this.chatMessages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
