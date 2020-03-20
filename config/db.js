const mongoose = require('mongoose');
const config = require('config');


console.log(process.env.mongoURI);
let db = process.env.mongoURI;
if(process.env.NODE_ENV === 'production'){

  db= process.env.mongoURI;
}



const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
      
    });
    console.log("MongoDb connected");

    
  } catch (err) {
    
    console.error(err.message);
    console.error(err);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;