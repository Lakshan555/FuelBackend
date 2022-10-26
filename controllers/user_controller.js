import User from "../models/user_model.js";
import bcrypt from "bcrypt";

export const login = async (request, response) => {
  const { identifier, password, user_type } = request.body;
  let user;

  try {
    if (user_type === "STATION_OWNER") {
      user = await User.findOne({ user_name: identifier });
    } else if (user_type === "VEHICLE_OWNER") {
      user = await User.findOne({ vehicle_number: identifier });
    }
    if (!user) {
      return response.json({
        message: "User doesn't exist!",
        isSuccessful: false,
      });
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return response.json({
        message: "Incorrect password!",
        isSuccessful: false,
      });
    }
    //creating a JWT token
    response.json({
      isSuccessful: true,
      user: { id: user._id, user_type: user.user_type },
    });
  } catch (error) {
    response
      .status(500)
      .json({ message: "Internal Server Error!", isSuccessful: false });
  }
};

export const register = async (request, response) => {
  const {
    user_type,
    password,
    vehicle_number,
    NIC,
    name,
    vehicle_type,
    fuel_type,
    chassis_number,
    user_name,
    station_name,
    register_no,
  } = request.body;
  console.log(
    user_type,
    password,
    vehicle_number,
    NIC,
    name,
    vehicle_type,
    fuel_type,
    chassis_number,
    user_name,
    station_name,
    register_no
  );

  let user;
  const salt = await bcrypt.genSalt(10);
  const decryptedPassword = await bcrypt.hash(password, salt);

  try {
    if (user_type === "STATION_OWNER") {
      user = await User.create({
        user_type,
        user_name,
        station_name,
        register_no,
        password: decryptedPassword,
        NIC,
        fuel_type,
      });
    } else if (user_type === "VEHICLE_OWNER") {
      user = await User.create({
        user_type,
        password: decryptedPassword,
        vehicle_number,
        NIC,
        name,
        vehicle_type,
        fuel_type,
        chassis_number,
      });
    }

    response
      .status(201)
      .json({
        isSuccessful: true,
        user: { id: user._id, user_type: user.user_type },
      });
  } catch (error) {
    response
      .status(500)
      .json({ message: "Internal Server Error!", isSuccessful: false });
  }
};
