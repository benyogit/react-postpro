const express = require('express') ;


const dbConnect = require('./config/db');
const app = express();

const a= 3;

dbConnect();


app.get('/', (req , res) => {

    res.status(200).json({"message": "hello ff world"});

});

const PORT = process.env.PORT || 5000 ;

app.listen(PORT, ()=>{

    console.log("Server started on port: "+ PORT);
});
