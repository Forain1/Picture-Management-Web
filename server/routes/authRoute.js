import express from "express"
import authController from "../controllers/authController.js"

const router = express.Router()


router.post("/register",authController);


export default router
