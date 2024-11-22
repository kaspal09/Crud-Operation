const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
username:{
    type:String,
    required:[true,"add the user name "],
},

email:{
    type:String,
    required:[true,"enter your email adress"],
    unique:[true,"email already used"],
},

password:{
type:String,
requied:[true,"please add the password"]
},
},
{
    timestamps: true,
},

);

module.exports= mongoose.model("User", userSchema);