import dotenv from "dotenv";
dotenv.config();
import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
const db = process.env.DB_NAME;

if (!uri) {
  console.error("MONGODB_URI is not defined in environment variables");
  process.exit(1);
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const connectDB = async (): Promise<void> => {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

export const getDB = () => client.db(db);
