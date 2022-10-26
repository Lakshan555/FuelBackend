import FuelStation from "../models/fuel_station_model.js";


export const addFuelStation = async (request, response) => {

    const { owner_id, fuel_station_name, register_no } = request.body;

    try {
        const fuelStation = await FuelStation.create({
            owner_id,
            fuel_station_name,
            register_no
        });
        response.json({ isSuccessful: true, fuelStation });

    } catch (error) {
        response.status(500).json({ isSuccessful: false });
    }
};


export const getFuelDataByID = async (request, response) => {

    const { station_Id } = request.params;

    try {
        const fuelStations = await FuelStation.findById(station_Id);
        response.json({ isSuccessful: true, fuelStations });
    } catch (error) {
        response.status(500).json({ isSuccessful: false });
    }
};

export const updateFuelData = async (request, response) => {

    const { station_Id } = request.params;
    const { fuel_details, arrived_time } = request.body;

    try {

        const fuelStation = await FuelStation.findByIdAndUpdate(station_Id, {
            fuel_details,
            arrived_time
        }, { new: true });

        await fuelStation.save();
        response.json({ isSuccessful: true, fuelStation });

    } catch (error) {
        response.status(500).json({ isSuccessful: false });
    }
};

export const reduceFuelData = async (request, response) => {

    const { station_Id } = request.params;
    const { fuel_type, quantity } = request.body;

    try {
        await FuelStation.updateOne({ _id: station_Id, "fuel_details.fuel_type": fuel_type }, {
            $set: { "fuel_details.$.quantity": fuel_details.quantity - quantity },
        })
        
        response.status(200).json({ isSuccessful: true });

    } catch (error) {
        response.status(500).json({ isSuccessful: false });
    }
};

export const searchFuelStation = async (request, response) => {
    const { name } = request.params;

    try {
        const fuelStation = await FuelStation.find({ fuel_station_name: name });
        response.status(200).json({ isSuccessful: true, fuelStation });

    } catch (error) {
        response.status(500).json({ isSuccessful: false });
    }
};

export const getAllStation = async (request, response) => {
    console.log("huahuidh")
    try {
        const fuelStations = await FuelStation.find({

        })
     
        response.json({ isSuccessful: true, fuelStations });

    } catch (error) {
        response.status(500).json({ isSuccessful: false });
    }
};