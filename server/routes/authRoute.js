import express from "express"
import {registerUser,loginUser,userInfo} from "../controllers/authController.js"
import { authToken } from "../middleware/authToken.js";


const router = express.Router()


router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/profile",authToken,userInfo);


export default router
