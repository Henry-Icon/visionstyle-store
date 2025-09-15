// // import express from "express";
// // import cors from "cors";
// // import bcrypt from "bcryptjs";
// // import jwt from "jsonwebtoken";
// // import pkg from "pg";

// // const { Pool } = pkg;

// // const pool = new Pool({
// //   user: "postgres",        // from pgAdmin
// //   host: "localhost",       // from pgAdmin
// //   database: "visionstyle", // your actual DB name (not "postgres" unless that’s the one you’re using)
// //   password: "Samuel03$",   // your password
// //   port: 5432,              // confirmed from pgAdmin
// // });


// // import express from "express";
// // import cors from "cors";
// // import bcrypt from "bcryptjs";
// // import jwt from "jsonwebtoken";
// // import { Sequelize, DataTypes } from "sequelize";

// // const app = express();
// // app.use(express.json());
// // app.use(cors());

// // // ====== Sequelize Setup ======
// // const sequelize = new Sequelize("visionstyle", "postgres", "Samuel03$", {
// //   host: "localhost",
// //   dialect: "postgres",
// //   port: 5432,
// //   logging: false, // shows SQL queries if set to true
// // });

// // // ====== User Model ======
// // const User = sequelize.define("User", {
// //   email: {
// //     type: DataTypes.STRING,
// //     allowNull: false,
// //     unique: true,
// //   },
// //   password: {
// //     type: DataTypes.STRING,
// //     allowNull: false,
// //   },
// //   role: {
// //     type: DataTypes.STRING,
// //     allowNull: false,
// //     defaultValue: "user",
// //   },
// // });

// // // ====== Sync Database ======
// // sequelize
// //   .sync({ alter: true }) // auto-create/alter tables based on model
// //   .then(() => console.log("✅ Database synced"))
// //   .catch((err) => console.error("❌ Error syncing DB:", err));

// // // ===== Signup Route =====
// // app.post("/signup", async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     // hash password
// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     // check if user exists
// //     const existingUser = await User.findOne({ where: { email } });
// //     if (existingUser) {
// //       return res.status(400).json({ error: "User already exists" });
// //     }

// //     // assign role
// //     const role = email === "admin@visionstyle.com" ? "admin" : "user";

// //     // create user
// //     await User.create({ email, password: hashedPassword, role });

// //     res.json({ message: "User created successfully!" });
// //   } catch (err) {
// //     console.error(err.message);
// //     res.status(500).json({ error: "Error creating user" });
// //   }
// // });

// // // ===== Login Route =====
// // app.post("/login", async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     const user = await User.findOne({ where: { email } });
// //     if (!user) return res.status(400).json({ error: "User not found" });

// //     // compare password
// //     const isMatch = await bcrypt.compare(password, user.password);
// //     if (!isMatch) return res.status(400).json({ error: "Invalid password" });

// //     // create token
// //     const token = jwt.sign(
// //       { id: user.id, email: user.email, role: user.role },
// //       "secret123",
// //       { expiresIn: "1h" }
// //     );

// //     res.json({ message: "Login successful", token });
// //   } catch (err) {
// //     console.error(err.message);
// //     res.status(500).json({ error: "Error logging in" });
// //   }
// // });

// // // ===== Start Server =====
// // app.listen(5000, () => {
// //   console.log("✅ Server running on http://localhost:5000");
// // });



// import express from "express";
// import cors from "cors";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { Sequelize, DataTypes } from "sequelize";

// const app = express();
// app.use(express.json());
// app.use(cors());

// // ====== Sequelize Setup ======
// const sequelize = new Sequelize("visionstyle", "postgres", "Samuel03$", {
//   host: "localhost",
//   dialect: "postgres",
//   port: 5432,
//   logging: false, // shows SQL queries if set to true
// });

// // ====== User Model ======
// const User = sequelize.define("User", {
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   role: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     defaultValue: "user",
//   },
// });

// // ====== Sync Database ======
// sequelize
//   .sync({ alter: true }) // auto-create/alter tables based on model
//   .then(() => console.log("✅ Database synced"))
//   .catch((err) => console.error("❌ Error syncing DB:", err));

// // ===== Signup Route =====
// app.post("/signup", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // check if user exists
//     const existingUser = await User.findOne({ where: { email } });
//     if (existingUser) {
//       return res.status(400).json({ error: "User already exists" });
//     }

//     // assign role
//     const role = email === "admin@visionstyle.com" ? "admin" : "user";

//     // create user
//     await User.create({ email, password: hashedPassword, role });

//     res.json({ message: "User created successfully!" });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ error: "Error creating user" });
//   }
// });

// // ===== Login Route =====
// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ where: { email } });
//     if (!user) return res.status(400).json({ error: "User not found" });

//     // compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ error: "Invalid password" });

//     // create token
//     const token = jwt.sign(
//       { id: user.id, email: user.email, role: user.role },
//       "secret123",
//       { expiresIn: "1h" }
//     );

//     res.json({ message: "Login successful", token });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ error: "Error logging in" });
//   }
// });

// // ===== Start Server =====
// app.listen(5000, () => {
//   console.log("✅ Server running on http://localhost:5000");
// });

import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
