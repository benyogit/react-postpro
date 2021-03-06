const express = require("express");
const app = express();
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const dbConnect = require("./config/db");
const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const postsRoutes = require("./routes/posts");
const profileRoutes = require("./routes/profile");
const uploadRoutes = require("./routes/upload");

dbConnect();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth-token"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});



app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/upload", uploadRoutes);

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  
  console.log(`Server started on port : ${PORT} and ${process.env.PORT}`);
});
