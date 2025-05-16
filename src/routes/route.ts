import { Router } from "express";
import { profileController } from "../controllers/profileController";

const router = Router();

router.post("/register", profileController.registerUser);
router.post("/login", profileController.loginUser);

export default router;
