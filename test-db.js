import dns from "node:dns";
import { MongoClient } from "mongodb";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const client = new MongoClient(process.env.AUTH_DB_URI);

try {
   await client.connect();
   console.log("MongoDB connected successfully!");

   const db = client.db("auth-db2");
   console.log(await db.command({ ping: 1 }));
} catch (error) {
   console.error("MongoDB connection failed:", error);
} finally {
   await client.close();
}
