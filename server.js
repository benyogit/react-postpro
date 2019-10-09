const express = require('express') ;
const dbConnect = require('./config/db');
const app = express();

const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');
const profileRoutes = require('./routes/profile');

dbConnect();


app.use(express.json());


app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/profile', profileRoutes);



const PORT = process.env.PORT || 5000 ;

app.listen(PORT, ()=>{

    console.log("Server started on port: "+ PORT);
});
