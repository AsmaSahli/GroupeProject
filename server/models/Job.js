const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({

    title : {
        type :String, 
        required : [true, "Field is required"],
        minLength : [3, "Title must be at least 3 characters"]
    }, 

    description : {
        type : String, 
        required : [true, "Field is required"],
        minLength : [10, "Description must be at least 10 characters"]
    },

    location : {
        type : String, 
        required : [true, "Field is required"],
    },

     // user field 
    creator : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    } 
}, { timestamps: true }); 

const Job = mongoose.model("Job", JobSchema );

module.exports = Job;
