const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Health_Connect_Model = require("./models/Health_Connecet");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/Health_Connect")
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((err) => {
    console.error("Database connection error: ", err);
  });

// Login route
app.post("/login", (req, res) => {
  const { Email, Password } = req.body;

  // Find the user by email
  Health_Connect_Model.findOne({ Email })
    .then(user => {
      if (user) {
        if (user.Password === Password) {
          res.json("success");  // Login successful
        } else {
          res.json("the password is incorrect");
        }
      } else {
        res.json("no record existed");  // User not found
      }
    })
    .catch(err => {
      res.json(err);  // Handle error
    });
});

// Signup route
app.post('/SignupPage', (req, res) => {
    const { Email, Password } = req.body;
    
    // Create new user in the database
    Health_Connect_Model.create({ Email, Password })
      .then((newUser) => {
        res.json({ success: true, user: newUser }); // Send back the created user info
      })
      .catch((err) => {
        res.status(400).json({ success: false, message: "Error creating user", error: err });
      });
  });

// Start the server
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
