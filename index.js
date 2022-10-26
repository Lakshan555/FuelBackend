import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserRouter from "./routers/user_router.js";
import FuelStationRouter from "./routers/fuel_station_router.js";
import FuelQueueRouter from "./routers/fuel_queue_router.js";

const PORT = process.env.PORT || 8000;
const MONGO_URI =
  "mongodb+srv://admin:admin123@cluster0.dsqkbfi.mongodb.net/?retryWrites=true&w=majority";
const app = express();

app.use(cors()).use(express.json());

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Successfully connected to MongoDB !");
});

app.get("/", (req, res) => {
  res.send("App is Running");
});
app.use("/users", UserRouter);
app.use("/fuel_stations", FuelStationRouter);
app.use("/fuel_queues", FuelQueueRouter);

app.listen(PORT, () => {
  console.log(`Server is up and running on PORT: ${PORT}`);
});
