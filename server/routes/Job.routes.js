const jobController = require("../controllers/JobController");
const verifyToken =require("../utils/verifyUser")

module.exports = (app) => {
    app.get('/getAllJobs',jobController.getAllJobs)
    app.get('/getOneJob/:jobId',jobController.getOneJob)
    app.post('/addJob',verifyToken.verifyToken,jobController.addJob)
    app.patch('/updateJob/:jobId',verifyToken.verifyToken,jobController.updateJob)
    app.delete('/deleteJob/:jobId',verifyToken.verifyToken,jobController.deleteJob)



};
