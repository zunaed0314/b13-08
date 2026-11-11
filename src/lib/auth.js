import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.AUTH_DB_URI);
const db = client.db("auth-db2");

export const auth = betterAuth({
   emailAndPassword: {
      enabled: true,
   },
   user: {
      changeEmail: {
         enabled: true,
         updateEmailWithoutVerification: true,
      },
   },
   database: mongodbAdapter(db, {
      client,
   }),
});
