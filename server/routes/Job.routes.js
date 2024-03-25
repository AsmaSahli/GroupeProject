const JobController = require("../controllers/JobController");


module.exports = (app) => {

    app.get("/api/job", JobController.findAllJobs);
    app.get("/api/job/:id", JobController.findOneJob);
    app.get("/api/job/:userId", JobController.findJobByUser);
    app.post("/api/job", JobController.createJob);
    app.patch("/api/job/:id", JobController.updateJob);
    app.delete("/api/job/:id", JobController.deleteJob);

};
