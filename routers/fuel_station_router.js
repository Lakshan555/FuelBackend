import express from 'express';
const router = express.Router();
import {
    addFuelStation,
    updateFuelData,
    getFuelDataByID,
    reduceFuelData,
    searchFuelStation,
    getAllStation,
    getOwnerFuelStation
} from '../controllers/fuel_station_controller.js';


router.get("/getAll", getAllStation);
router.post("/", addFuelStation);
router.get("/:station_Id", getFuelDataByID);
router.get("/owner_station/:owner_Id", getOwnerFuelStation);
router.put("/:station_Id", updateFuelData);
router.put("/fuel_reduce/:station_Id", reduceFuelData);
router.get("/search/:name", searchFuelStation);

export default router;