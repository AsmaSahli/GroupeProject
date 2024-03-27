const mongoose = require("mongoose");


const JobSchema = new mongoose.Schema({
    
    userId: {
        type: String,
        required: true,
    },

    title: {
        type: String,
        required : [true, "Field is required"],
        unique: true,
        minLength : [3, " must be at least 3 characters"]
    },
    
    location: {
        type: String,
        required : [true, "Field is required"],

    },

    description: {
        type: String,
        required : [true, "Field is required"],
        minLength : [10, " must be at least 10 characters"]
    },




}, { timestamps: true });






const Job = mongoose.model("Job", JobSchema);

module.exports = Job;
