import express from "express"
import {uploadPhoto} from "../controllers/uploadController.js"
import upload from "../middleware/upload.js"
import { authToken } from "../middleware/authToken.js";


const router = express.Router();

router.post("/upload",authToken,upload.single("photo"),uploadPhoto);


export default router;