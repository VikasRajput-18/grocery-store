import "dotenv/config"
import fastifySession from "@fastify/session";
import ConnectMongoDBSession from "connect-mongodb-session"

import { Admin } from "../models/index.js"

export const PORT = process.env.PORT || 3000;
export const COOKIE_PASSWORD = process.env.COOKIE_PASSWORD;


const MongoDBStore = ConnectMongoDBSession(fastifySession);
export const sessionStore = new MongoDBStore({
    uri: process.env.MONGO_URL,
    collection: "session",
});

sessionStore.on("error", (error) => {
    console.log(`Session store error`, error)
})

export const authenticate = async (email, password) => {
    // Uncomment this creating admin first time 
    // if (email && password) {
    //     if (email === "admin@gmail.com" && password === "12345678") {
    //         return Promise.resolve({ email: email, password: password })
    //     } else {
    //         return null
    //     }
    // }
    // Uncomment this when created admin manually 
    if (email && password) {
        const user = await Admin.findOne({ email });
        if (!user) {
            return null
        }
        if (user.password === password) {
            return Promise.resolve({ email, password })
        } else {
            return null
        }
    }

    return null
}





