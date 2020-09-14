const mongoose = require('mongoose');
const config = require('config');



let db = process.env.mongoURI;

if(process.env.NODE_ENV === 'production'){

  db= process.env.mongoURI;
}



const connectDB = async () => {
  try {
    const con = await mongoose.connect(encodeURI(db), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
      
    });

    console.log(con.models);

    
  } catch (err) {
    
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;