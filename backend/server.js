import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

import './passport/github.auth.js'
import passport from 'passport';
import session from 'express-session';

import userRoutes from './routes/userRoutes.js'
import exploreRoutes from './routes/exploreRoutes.js'
import authRoutes from './routes/authRoutes.js'

import { Connect_MONGODB } from './DB_Connection/mongoDb.js';
dotenv.config();

const app = express();
const port = 5000 || process.env.PORT;
const __dirname = path.resolve();
console.log( "dirname", __dirname);


app.use(session({secret:"keyboard cat", resave:false, saveUninitialized:false}))
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());



app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/explore", exploreRoutes)


app.use(express.static(path.join(__dirname, "/frontend/build")))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"))
})
app.listen(port, () => {
    console.log(`server started on http://localhost:${port}`);
    Connect_MONGODB()
})