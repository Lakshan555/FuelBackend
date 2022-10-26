import FuelQueue from "../models/fuel_queue_model.js";


export const createNewQueue = async (request, response) => {

    const { station_Id } = request.body;
    try {
        const fuelQueue = await FuelQueue.create({station_Id});
        response.json({ isSuccessful: true, fuelQueue });

    } catch (error) {
        response.status(500).json({ isSuccessful: false });        
    }
}

export const addVehicle = async (request, response) => {
    const { station_Id } = request.params;
    const { vehicles_no,fuel_type,vehicle_type,arrived_time } = request.body;

    try {
        const fuelQueue = await FuelQueue.findOne({ _id: station_Id });
        fuelQueue.vehicles.push({ vehicles_no, fuel_type, vehicle_type, arrived_time });
        await fuelQueue.save();
        response.status(200).json({ isSuccessful: true, fuelQueue });
    } catch (error) {
        response.status(500).json({ isSuccessful: false });
    }
};

export const removeFromQueue = async (request, response) => {
    const { station_Id, vehicles_no } = request.params;

    try {
        const fuelQueue = await FuelQueue.findOne({ _id: station_Id });
        const VehiclesCopy = fuelQueue.vehicles;
        const filteredVehicles = VehiclesCopy.filter(vehicle => vehicle.vehicles_no !== vehicles_no);
        fuelQueue.vehicles = filteredVehicles;

        await fuelQueue.save();
        response.status(200).json({ isSuccessful: true, fuelQueue });
    } catch (error) {
        response.status(500).json({ isSuccessful: false });
    }
};