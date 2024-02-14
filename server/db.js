const mongoose = require('mongoose')

module.exports= ()=>{
    const connectionParams = {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    };
    try {
        mongoose.connect(process.env.MONGO);
        console.log("connected to database");
    } catch (error) {
        console.log(error);
    }
}