const pool = new Pool({
  user: "postgres",        // your username
  host: "localhost",       // or 127.0.0.1
  database: "visionstyle", // your DB name
  password: "Samuel03$",// your password
  port: 5432,              // default port
});


const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ===== MongoDB Connection =====
mongoose.connect("mongodb://127.0.0.1:27017/visionstyle", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ===== User Model =====
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "user" },
});

const User = mongoose.model("User", userSchema);

// ===== Signup Route =====
app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      role: email === "admin@visionstyle.com" ? "admin" : "user",
    });

    await newUser.save();
    res.json({ message: "User created successfully!" });
  } catch (err) {
    res.status(400).json({ error: "User already exists or error occurred" });
  }
});

// ===== Login Route =====
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Invalid password" });

  // create token
  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    "secret123",
    { expiresIn: "1h" }
  );

  res.json({ message: "Login successful", token });
});

// ===== Server Start =====
app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
