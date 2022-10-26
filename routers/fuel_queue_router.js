import express from 'express';
const router = express.Router();
import {
    createNewQueue,
    addVehicle,
    removeFromQueue,
} from '../controllers/fuel_queue_controller.js';

router.post('/', createNewQueue);
router.put('/:station_Id', addVehicle);
router.delete('/:station_Id/:vehicles_no', removeFromQueue);

export default router;