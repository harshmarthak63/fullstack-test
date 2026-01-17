// const express = require("express");
// const mongoose = require("mongoose");
// const app = express();

// const PORT = 3000;

// mongoose.connect("MONGO_URI")
//     .then(() => console.log("mongo connected"))
//     .catch(err => console.error(err));

// const userSchema = new mongoose.Schema({
//   name: String,
//   age: Number
// });

// // Model
// const User = mongoose.model('User', userSchema);

// app.get('/users', async (req, res) => {
//   const users = await User.find();
//   res.json(users);
// });

// // POST create user
// app.post('/users', async (req, res) => {
//   const user = new User(req.body);
//   await user.save();
//   res.json({ message: 'User created', user });
// });

// // DELETE user by id
// app.delete('/users/:id', async (req, res) => {
//   await User.findByIdAndDelete(req.params.id);
//   res.json({ message: 'User deleted' });
// });

// app.listen(PORT, () => {

//     console.log("server is running successfully on port " + PORT);
// });


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 3000;

// 🔴 REQUIRED middleware
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "MONGO_URI"
  )
  .then(() => {
    console.log("✅ MongoDB Atlas connected");

    app.listen(PORT, () => {
      console.log("🚀 Server running successfully on port " + PORT);
    });
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err.message);
  });

// Schema
const userSchema = new mongoose.Schema({
  name: String,
  age: Number
});

const User = mongoose.model("User", userSchema);

// GET
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// POST
app.post("/users", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json({ message: "User created", user });
});

// DELETE
app.delete("/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});
