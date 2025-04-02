const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Health_Connect_Model = require("./models/Health_Connecet"); // ✅ Fixed model name

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Use MongoDB Atlas (Replace with your connection string)
const MONGO_URI = "mongodb+srv://abhis92137:cZvvzZHD9f2ENUn0@cluster0.qcje0ri.mongodb.net/Health_Connect?retryWrites=true&w=majority&appName=Cluster0";

// ✅ Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Database connected successfully!"))
  .catch(err => {
    console.error("❌ Database connection error:", err);
    process.exit(1); // Exit if DB connection fails
  });

// ✅ Login Route
app.post("/login", async (req, res) => {
  try {
    const { Email, Password } = req.body;
    if (!Email || !Password) return res.status(400).json({ message: "Email and Password are required!" });

    const user = await Health_Connect_Model.findOne({ Email });

    if (!user) return res.status(404).json({ message: "No record found" });
    if (user.Password !== Password) return res.status(401).json({ message: "Incorrect password" });

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Signup Route
app.post("/SignupPage", async (req, res) => {
  try {
    const { Email, Password } = req.body;
    if (!Email || !Password) return res.status(400).json({ message: "Email and Password are required!" });

    const existingUser = await Health_Connect_Model.findOne({ Email });
    if (existingUser) return res.status(409).json({ message: "User already exists!" });

    const newUser = await Health_Connect_Model.create({ Email, Password });
    res.status(201).json({ success: true, message: "User created successfully!", user: newUser });
  } catch (err) {
    res.status(400).json({ success: false, message: "Error creating user", error: err.message });
  }
});
app.get("/", (req, res) => {
  res.send("Welcome to the Health Connect API!");
});

// ✅ Export app for Vercel deployment
module.exports = app;
