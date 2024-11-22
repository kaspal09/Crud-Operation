
const {constants}= require ("../constants")
const errorHandler = (err,req,res,next)=>{
const statusCode = res.statusCode?res.statusCode:500;
switch (statusCode) {
    case  constants. VALIDATION_ERROR:
        res.json({title:"validation error",message:err.message});
        break;

  case constants. NOT_FOUND :
    res.json({title:" Not Found",message:err.message});

    case constants. UNAUTHORIZED:
    res.json({title:" u cant enter",message:err.message});


    case constants. FORBIDEN:
    res.json({title:" Fobiden sorry...",message:err.message});

    case constants.SERVER_ERROR:
    res.json({title:" Server error buddy",message:err.message});

    default:
        console.log("No error found. Continue");
        break;
};
};






module.exports = errorHandler;