import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { userRouter } from '../routes/users.js';
import { JobRouter } from '../routes/jobs.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express()
const PORT = 3001;
const url = process.env.DATABASE_URL

app.use(cors())
app.use(express.json());
app.use("/", [userRouter, JobRouter])

mongoose.connect(url)
app.listen(PORT, () => console.log(`Server is runnning on port ${PORT}`))
