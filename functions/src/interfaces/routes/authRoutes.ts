import {Router} from "express";
import {
  loginController,
  registerController,
} from "../controllers/authController";

// eslint-disable-next-line new-cap
const router = Router();

router.post("/login", loginController);
router.post("/register", registerController);

export default router;
