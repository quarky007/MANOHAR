const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://reddymoramanohar99:Jnvs@123456@cluster0.zmbpylv.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Employee model
const Employee = mongoose.model("Employee", {
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  hireDate: Date,
  jobId: String,
  salary: Number,
});

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// API routes
app.get("/api/employees", async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

app.post("/api/employees", async (req, res) => {
  const newEmployee = new Employee(req.body);
  await newEmployee.save();
  res.json(newEmployee);
});

app.delete("/api/employees/:id", async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: "Employee deleted" });
});

// Serve frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
