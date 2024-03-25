const Job = require("../models/Job");

module.exports = {

    findAllJobs :  (req, res) => {
        Job.find()
        .then((allJobs) => {
            res.json(allJobs)
        })

        .catch((error) => {
            res.json({ message : "Something went wrong", error :error})
        });

    },

    findOneJob : (req, res) => {
        Job.findOne({_id : req.params.id})
        .then((oneJob) => {
            res.json(oneJob)
        })
        .catch((error) => {
            res.json({message : "Something went wrong", error : error})
        });
    },

    createJob : (req, res) => {
        const {body} = req;
        Job.create(body)
        .then ((job) => {
            res.json(job)
        })
        .catch((error) =>  {
            res.json({message : "Something went wrong", error : error} )
        });
    },

    updateJob : (req, res) => {
        Job.findOneAndUpdate({_id : req.params.id}, req.body, {new: true})
        .then((updatedJob) => {
            res.json(updatedJob)
        })
        .catch((error) => {
            res.json({message : "Something went wrong", error : error} )
        }); 
    },

    deleteJob : (req, res) => {
        Job.deleteOne({_id : req.params.id})
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch((error) => {
            res.json({message : "Something went wrong", error : error} )
        });
    },

    findJobsByUser : (req, res) => {
        Job.find({creator : req.params.userId})
        .then((jobs) => {
            res.json(jobs)
        })
        .catch((error) => {
            res.json({message : "Something went wrong", error : error})
        });
    },
    
}