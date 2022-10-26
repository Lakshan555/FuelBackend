import mongoose from "mongoose";
const { Schema } = mongoose;


const fuelStationSchema = Schema({
    owner_id: {
        type: String,
    },
    register_no: {
        type: String,
    },
    fuel_station_name: {
        type: String,
    },
    fuel_details: [
        {
            fuel_type: String,
            quantity: String,
        }
    ],
    arrived_time: [
        {
            name: String,
            time: String,
        }
    ],
});

const FuelStation = mongoose.model("fuel_Stations", fuelStationSchema);
export default FuelStation;