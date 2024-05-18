import mongoose from "mongoose";

export const Connect_MONGODB = async() => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_DB_URI)
        if (connection) {
            console.log("MONGODB_Connected");
            
        }
    } catch (error) {
        console.log("Error in dataBase connection", error.message);
        return;
    }
}