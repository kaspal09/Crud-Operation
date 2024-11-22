const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({

    user_id:{

        type: mongoose.Schema.Types.ObjectId,
        require : true,
        ref:"user",
    },
    
 name:{
    type:String,
    requier:[true,"add name "]
 },

email:{
    type:String,
    requier:[true,"add email "]

},

phone:{
    type:String,
    requier:[true,"add phone number"]
},
},
{
    timestamps:true

},

);
 module.exports= mongoose.model("Contact",contactSchema)