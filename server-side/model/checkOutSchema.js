const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;


const CheckoutSchema = new Schema({
  
   
        checkOut: Number,
        checkoutTime: String,
        checkoutDate:String,
        
        
  
});

const checkOutSchema = mongoose.model("clCheckOut", CheckoutSchema);

module.exports = checkOutSchema;
