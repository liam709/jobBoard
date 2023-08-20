import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    employer_name: { type: String, required: true },
    job_title: { type: String, required: true },
    job_posted_at_datetime_utc: { default: Date },
    job_country: { type: String, required: true },
    job_city: { type: String, required: true },
    job_state: { type: String, required: true },
    job_apply_link: { type: String },
    job_id: { type: String }
})

export const JobModel = mongoose.model('jobs', JobSchema);