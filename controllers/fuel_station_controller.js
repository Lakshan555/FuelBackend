import FuelStation from "../models/fuel_station_model.js";

//add fuel station
export const addFuelStation = async (request, response) => {
  const { owner_id, fuel_station_name, register_no } = request.body;

  try {
    const fuelStation = await FuelStation.create({
      owner_id,
      fuel_station_name,
      register_no,
    });
    response.json({ isSuccessful: true, fuelStation });
  } catch (error) {
    response.status(500).json({ isSuccessful: false });
  }
};

//get fuel station
export const getFuelDataByID = async (request, response) => {
  const { station_Id } = request.params;

  try {
    const fuelStations = await FuelStation.findById(station_Id);
    response.json({ isSuccessful: true, fuelStations });
  } catch (error) {
    response.status(500).json({ isSuccessful: false });
  }
};

//update fuel station
export const updateFuelData = async (request, response) => {
  const { station_Id } = request.params;
  let { fuel_details, arrived_time } = request.body;
  fuel_details = JSON.parse(fuel_details);
  try {
    const fuelStation = await FuelStation.findByIdAndUpdate(
      station_Id,
      {
        fuel_details,
        arrived_time,
      },
      { new: true }
    );

    await fuelStation.save();
    response.json({ isSuccessful: true, fuelStation });
  } catch (error) {
    response.status(500).json({ isSuccessful: false });
  }
};

//Reduce fuel station
export const reduceFuelData = async (request, response) => {
  const { station_Id } = request.params;
  const { fuel_type, quantity } = request.body;

  try {

    const ft = await FuelStation.findOne({
      _id:station_Id

    })

   const fd = ft.fuel_details.filter(i => {
      return i.fuel_type === fuel_type
    })

    console.log(fd[0].quantity)

    await FuelStation.findOneAndUpdate(
      { _id: station_Id },
      {
        $set: {
          "fuel_details.$[el].quantity":fd[0].quantity  - quantity,
        },
      },
      {
        arrayFilters: [{ "el.fuel_type": fuel_type }],
        new: true,
      }
    );

    response.status(200).json({ isSuccessful: true });
  } catch (error) {
    console.log(error);
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
  try {
    const fuelStations = await FuelStation.find({});

    response.json({ isSuccessful: true, fuelStations });
  } catch (error) {
    response.status(500).json({ isSuccessful: false });
  }
};


//get one station
exports.getOwnerFuelStation = async (req, res) => {
  const { owner_id } = req.params;

  try {
      const fuelStation = await FuelStation.find({ owner_id });
      res.json({ isSuccessful: true, fuelStation });

  } catch (error) {
      res.json({ isSuccessful: false });
  }
}

