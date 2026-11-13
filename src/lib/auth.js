import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.AUTH_DB_URI);
const db = client.db("auth-db2");

export const auth = betterAuth({
   emailAndPassword: {
      enabled: true,
   },
   socialProviders: {
      google: {
         clientId: process.env.GOOGLE_CLIENT_ID,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      },
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
