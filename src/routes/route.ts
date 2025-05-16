import { Router, RequestHandler } from "express";
import { profileController } from "../controllers/profileController";

const router = Router();

router.post("/register", profileController.registerUser as RequestHandler);
router.post("/login", profileController.loginUser as RequestHandler);

export default router;
