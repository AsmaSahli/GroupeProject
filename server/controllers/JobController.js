const Job = require("../models/Job");

module.exports = {

    addJob: async (req, res, next) => {
        try {
        const { location, title, userId ,description } = req.body;
    
        if (userId !== req.user.id) {
            return next(
            e.errorHandler(403, 'You are not allowed to add a job')
            );
        }
        const potentialJob=await Job.findOne({title:req.body.title})
        if(potentialJob){
            next(e.errorHandler(400, 'Job already exists'))
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

}