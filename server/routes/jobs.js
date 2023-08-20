import express from 'express';
import { JobModel } from '../models/JobListing.js';

const router = express.Router();

router.post('/create', async (req, res) => {
    const job = new JobModel(req.body)
    try {
        res.json({ job });
        await job.save();
    } catch (err) {
        res.send(err)
    }
})

router.get('/listings', async (req, res) => {
    //Finds all job postings in DB.
    const job = await JobModel.find({})
    try {
        res.json({ job })
    } catch (err) {
        res.send(err)
    }
})

export { router as JobRouter };