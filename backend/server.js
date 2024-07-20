const express = require("express");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorMiddleware");
const dotenv = require("dotenv").config();
const connectDB = require("./connect/database");
const port = process.env.PORT || 5000;

connectDB();
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.options(
  "*",
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/user", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Listening on port ${port}`));
