import mongoose from "mongoose";
const {Schema} = mongoose;

const fuelQueueSchema = Schema({
    station_Id: {
        type: String,
    },
    vehicles: [
        {
            vehicles_no: String,
            fuel_type: String,
            vehicle_type: String,
            arrived_time: String,
            departed_time: String,
        }
    ]
});

const FuelQueue = mongoose.model("fuel_queues", fuelQueueSchema);
export default FuelQueue;