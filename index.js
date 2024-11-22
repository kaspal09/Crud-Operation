const express = require ("express")
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT|| 8000;
const mongoose = require("mongoose");
const CONNECTION_STRING ="mongodb://localhost:27017/Backend"
app.use(express.json());

const errorHandler = require("./Middleware/errorHandler")
 

//middleware
app.use('/api/contacts',require("./Routes/contactRoutes"));
app.use('/api/users',require("./Routes/userRoutes"));


app.use(errorHandler);


mongoose
.connect(CONNECTION_STRING)

.then(()=>{
console.log("connect to mongooseDB")
})
.catch(()=>{
    console.error("connection error",);
});







app.listen(port,()=>{
    console.log(`The server is running on port ${port}`);

});