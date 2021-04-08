const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const CheckinSchema = new Schema({
  
 
    checkIn: Number,
    checkinTime: String,
    checkinDate: String,
   
   
     
  
});

const checkinSchema = mongoose.model("clCheckIn", CheckinSchema);

module.exports = checkinSchema;
