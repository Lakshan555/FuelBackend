import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = Schema({
    user_type: {
        type: String,
        default: "VEHICLE_OWNER"
    },    
    user_name: {
        type: String,
        default: null,
    },    
    NIC: {
        type: String,
        default: null,
    },
    name: {
        type: String,
        default: null,
    },  
    vehicle_number: {
        type: String,
        default: null,
    },
    vehicle_type: {
        type: String,
        default: null,
    },
    fuel_type: {
        type: String,
        default: null,
    },
    chassis_number: {
        type: String,
        default: null,
    },
    station_name: {
        type: String,
        default: null,
    },
    register_no: {
        type: String,
        default: null,
    },      
    password: {
        type: String,
    },    
});

const User = mongoose.model("users", userSchema);
export default User;