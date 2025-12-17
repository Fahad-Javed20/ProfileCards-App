import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL || "")
  .then(() => {
    console.log("Conected to db");
  })
  .catch(() => {
    console.error("Error connecting to MongoDB:");
  });

  const UserSchema = new mongoose.Schema({
    id: Number,
    name: String,
    image: String,
    description: String,
    profession: String,
    rating: Number,
  });

  const User = mongoose.model("User", UserSchema);

app.use(express.json());
app.use(cors());

// API - to get All the User form Database
app.get("/api/users", (req, res) => {
  User.find().then((users) => {
    res.json(users);
  }).catch((error) => {
    res.status(500).json({ error: "Internal Server Error" });
  });
});

// API - to get the User By ID
app.get("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  User.findById(userId).then((user) => {
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    } }).catch((error) => {
    res.status(500).json({ error: "Internal Server Error" });
  });
  
});

// API - to Create a New User
app.post("/api/users", (req, res) => {
  const newUser = new User(req.body);
  newUser.save().then((user) => {
    res.status(201).json(user);
  }).catch((error) => {
    res.status(500).json({ error: "Internal Server Error" });
  });
});

// API - to Update New User
app.patch("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  User.findByIdAndUpdate(userId, req.body, { new: true }).then((user) => {
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  }).catch((error) => {
    res.status(500).json({ error: "Internal Server Error" });
  });
});

// API - to Delete a User By ID
app.delete("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  User.findByIdAndDelete(userId).then((user) => {
    if (user) {
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  }).catch((error) => {
    res.status(500).json({ error: "Internal Server Error" });
  });
  
});

app.listen(PORT, () => {
  console.log(`server is listining at port ${PORT}`);
});
