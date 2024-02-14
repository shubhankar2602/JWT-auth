const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    user: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
    subTotal:{
        type:String
    },
    email:{
        type:String
    }

  });

  // Create Post model
module.exports = mongoose.model('Orders', orderSchema);