const mongoose  = require("mongoose")

const Health_Connect_Schema = new mongoose.Schema({
    Name: String,
    Email: String,
    Password: String,
    bodyMetrics: {
        type: Object,
        default: {}
      }

})

const  Health_Connect_Model = mongoose.model("pateint", Health_Connect_Schema)
module.exports = Health_Connect_Model;  //exporting the model