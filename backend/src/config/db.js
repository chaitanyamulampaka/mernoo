import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { MongoMemoryServer } from 'mongodb-memory-server';

dotenv.config();

let mongoServer;

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/';

  try {
    if (mongoUri.includes('localhost') || mongoUri.includes('127.0.0.1')) {
      if (!mongoServer) {
        mongoServer = await MongoMemoryServer.create({
          instance: {
            dbName: 'novaadmin',
            port: 27017
          }
        });
        process.env.MONGODB_URL = mongoServer.getUri();
      }
    }

    await mongoose.connect(process.env.MONGODB_URL || mongoUri);
    console.log('MongoDB connected');
    return mongoose.connection;
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    return null;
  }
};

export default connectDB;
