const jobController = require("../controllers/JobController");
const verifyToken =require("../utils/verifyUser")

module.exports = (app) => {

    app.post('/addJob',verifyToken.verifyToken,jobController.addJob)

};
