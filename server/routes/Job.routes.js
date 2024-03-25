const jobController = require("../controllers/JobController");


module.exports = (app) => {
    app.get("/api/job", jobController.findAllJobs);
    app.get("/api/job/:id", jobController.findOneJob);
    app.post("/api/job", jobController.createJob);
    app.patch("/api/job/:id", jobController.updateJob);
    app.delete("/api/job/:id", jobController.deleteJob);

};
