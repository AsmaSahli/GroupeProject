const Job = require("../models/Job");
const e = require("../utils/error");

module.exports = {

    addJob: async (req, res, next) => {
        try {
        const { location, title, userId ,description } = req.body;
    
        if (userId !== req.user.id) {
            return next(
            e.errorHandler(403, 'You are not allowed to add a job')
            );
        }

        const newJob = new Job({
            title,
            userId,
            location,
            description

        });
        await newJob.save();
    
        res.status(200).json(newJob);
        } catch (error) {
        next(error);
        }
    },

    getAllJobs: async (req, res, next) => {
        try {
            const jobs = await Job.find();
            res.status(200).json(jobs);
        } catch (error) {
            next(error);
        }
    },
    getOneJob: async (req, res, next) => {
        try {
            const { jobId } = req.params;
            const job = await Job.findById(jobId);
            if (!job) {
                return next(
                    e.errorHandler(404, 'Job not found')
                );
            }
            res.status(200).json(job);
        } catch (error) {
            next(error);
        }
    },
    deleteJob: async (req, res, next) => {
        try {
            const { jobId } = req.params;
            const job = await Job.findById(jobId);

            if (!job) {
                return next(
                    e.errorHandler(404, 'Job not found')
                );
            }

            if (job.userId !== req.user.id) {
                return next(
                    e.errorHandler(403, 'You are not allowed to delete this job')
                );
            }

            await Job.findByIdAndDelete(jobId);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    },
    updateJob : async (req, res, next) => {
        const { jobId } = req.params;
        const job = await Job.findById(jobId);
        if (!job) {
            return next(
                e.errorHandler(404, 'Job not found')
            );
        }
        if (job.userId !== req.user.id) {
            return next(
                e.errorHandler(403, 'You are not allowed to update this job')
            );
        }
            try {
            const updatedJob = await Job.findByIdAndUpdate(
                req.params.jobId,
                {
                $set: {
                    title: req.body.title,
                    location: req.body.location,
                    description: req.body.description,
                },
                },
                { new: true }
            );
            res.status(200).json(updatedJob);
            } catch (error) {
            next(error);
            }

        },






}