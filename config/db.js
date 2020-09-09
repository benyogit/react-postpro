const mongoose = require('mongoose');
const config = require('config');



let db = process.env.mongoURI;
console.log(encodeURI(db));
if(process.env.NODE_ENV === 'production'){

  db= process.env.mongoURI;
  console.log(encodeURI(db));

  
}



const connectDB = async () => {
  try {
    await mongoose.connect(encodeURI(db), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
      
    });
    console.log("MongoDb connected");

    
  } catch (err) {
    
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;