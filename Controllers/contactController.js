//const asyncHandler = require("express-async-handler");//
const Contact = require("../models/contactModel");

const getContacts = async(req,res)=>{
    try{
const contacts = await Contact.find({});
return res.status(200).json(contacts);
}catch(error){
    res.status(500).json({message:"server error"})
}
};

// create new contact
const createContact =async(req,res)=>{
    const user=req.user
    console.log(req.body);
    const {name,email,phone}=req.body;
    if(!name || !email||!phone){
      return  res.status(400);
       //throw new Error("all are necessary");//
    }
    try{
const contact = await Contact.create({
    name,
    email,
    phone,
    user_id:user._id,
});

res.json({contact});
// console.log(contact)
}catch(error){
res.status(500).json({messag:"server error"})
}
};

//get contact by id 
//@route GET//api/contacts/:id
const getContact= async(req,res)=>{
    try{
const contact = await Contact.findbyId(req.params.id);
if(!contact){
    
   return res.status(404);
    throw new Error("contact not found");
};
res.status(200).json(contact);
}catch(error){
    res.status(500).json({message:"server error"})
}
};

const updateContact =async(req,res)=>{
    try{
    const contact = await Contact.findbyId(req.params.id);
    if(!contact){
   return res.status(404);
    throw new Error("contact not found please update");
    };

    if(contact.user_id.toString() !== req.user.id){
       return res.status(403);
        throw new Error("user dont have the permission to update other contacts")
    }
    const updatedContact = await Contact.findbyIdAndUpdate(
        req.params.id,
        req.body,
        {new:true},
    )
}catch(error){
    res.status(500).json({message: "server error"});
}
};


const deleteContact =async(req,res)=>{
    try{
    const contact = await Contact.findbyId(req.params.id);
if(!contact){
    
    res.status(404);
    throw new Error("contact not found");
};
if(contact.user_id.toString() !== req.user.id){
   return res.status(403);
    throw new Error(" not permitted")
};
await Contact.remove();
res.statu(200).json(contact);
}catch(error){
    res.status(error).json({message:"server error"})
}
};

module.exports={
    getContacts, 
    createContact,
    getContact,
    updateContact,
    deleteContact,
};