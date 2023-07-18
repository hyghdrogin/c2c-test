import { Router } from "express";
import farmerRoutes from "./farmerRouter.js";

const router = Router();

router.use("/farmer", farmerRoutes);

export default router;