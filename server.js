const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Health_Connect_Model = require("./models/Health_Connecet");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Use MongoDB Atlas (Replace with your connection string)
const MONGO_URI = "mongodb+srv://abhis92137:cZvvzZHD9f2ENUn0@cluster0.qcje0ri.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected successfully!"))
  .catch(err => console.error("Database connection error:", err));

// ✅ Login Route
app.post("/login", async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const user = await Health_Connect_Model.findOne({ Email });

    if (!user) return res.status(404).json({ message: "No record found" });
    if (user.Password !== Password) return res.status(401).json({ message: "Incorrect password" });

    res.json({ message: "Success", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Signup Route
app.post("/SignupPage", async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const newUser = await Health_Connect_Model.create({ Email, Password });
    res.json({ success: true, user: newUser });
  } catch (err) {
    res.status(400).json({ success: false, message: "Error creating user", error: err });
  }
});

// ✅ Export app for Vercel
module.exports = app;
