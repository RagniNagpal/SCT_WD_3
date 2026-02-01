import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import bcrypt from "bcryptjs";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import nodemailer from "nodemailer";

import User from "./models/User.js";
import quizResultsRoute from "./routes/quizResults.js";

dotenv.config({ path: path.resolve("./.env") });

const app = express();
const PORT = process.env.PORT || 5000;

// DB CONNECT
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// MIDDLEWARES
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

// SESSION
app.use(
  session({
    secret: process.env.SESSION_SECRET || "fallbackSecret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
      sameSite: "lax",
    },
  })
);

// ROOT TEST ROUTE
app.get("/", (req, res) => {
  res.json({ message: "API Running" });
});

// SIGNUP
app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashed });

    req.session.user = { _id: user._id, username, email };

    res.json({ message: "Signup success", user: req.session.user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    req.session.user = { _id: user._id, username: user.username, email };

    res.json({ message: "Login success", user: req.session.user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// AUTH MIDDLEWARE
const isAuth = (req, res, next) => {
  if (req.session?.user?._id) return next();
  return res.status(401).json({ message: "Unauthorized" });
};

// QUIZ ROUTES (PROTECTED)
app.use("/api/quiz-results", isAuth, quizResultsRoute);

// CONTACT MESSAGE
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL,
      subject: "Quiz App Contact Form",
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `,
    });

    res.json({ message: "Email sent!" });
  } catch (err) {
    res.status(500).json({ message: "Failed to send email" });
  }
});

// START SERVER
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
