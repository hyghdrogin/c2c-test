import { Router } from "express";
import { createFarmer, filterFarmerDetails } from "../controller/farmer.js";

const router = Router();

router.post("/", createFarmer);
router.get("/", filterFarmerDetails);

export default router;