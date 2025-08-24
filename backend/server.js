// backend/server.js
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");
const User = require("./models/User");
const quizResultsRoute = require("./routes/quizResults");
const path = require("path");

// Load .env
dotenv.config({ path: path.resolve(__dirname, ".env") });


const app = express();
const PORT = process.env.PORT || 5000;

// DB
connectDB();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "fallbackSecret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/quizApp",
      collectionName: "sessions",
    }),
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    },
  })
);

// AUTH routes
app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashed });

    req.session.user = { _id: user._id, email: user.email, username: user.username };
    res.status(201).json({ message: "User registered successfully", user: req.session.user });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    req.session.user = { _id: user._id, email: user.email, username: user.username };
    res.json({ message: "Login successful", user: req.session.user });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Quiz result routes
app.use("/api/quiz-results", quizResultsRoute);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
