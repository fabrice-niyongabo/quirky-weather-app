require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json({ limit: "50mb" }));

app.use(cors());

const usersRoute = require("./routes/users");
const weatherRoute = require("./routes/weather");

//home route
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/users", usersRoute);
app.use("/api/weather", weatherRoute);

//404 route
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Page not found",
  });
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
