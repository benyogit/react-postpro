const mongoose = require('mongoose');
const config = require('config');



let db = process.env.mongoURI;
console.log( process.env.NODE_ENV);
if(process.env.NODE_ENV === 'production'){

  console.log( process.env.mongoURI);
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