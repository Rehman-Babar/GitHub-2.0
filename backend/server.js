import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js'
import exploreRoutes from './routes/exploreRoutes.js'
import cors from 'cors';

const app = express();
const port = 5000 || process.env.PORT;

dotenv.config();
app.use(cors());


// app.get("/", (req,res) => {
//     res.send("Hello World")
// })
app.use("/api/users", userRoutes)
app.use("/api/explore", exploreRoutes)
app.listen(port, () => {
    console.log(`server started on http://localhost:${port}/`);
})