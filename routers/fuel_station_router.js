import express from 'express';
const router = express.Router();
import {
    addFuelStation,
    updateFuelData,
    getFuelDataByID,
    reduceFuelData,
    searchFuelStation,
    getAllStation,
} from '../controllers/fuel_station_controller.js';


router.post("/", addFuelStation);
router.get("/:station_Id", getFuelDataByID);
router.put("/:station_Id", updateFuelData);
router.put("/fuel_reduce/:station_Id", reduceFuelData);
router.get("/search/:name", searchFuelStation);
router.get("/getAll", getAllStation);

export default router;