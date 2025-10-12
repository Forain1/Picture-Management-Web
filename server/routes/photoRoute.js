import express from "express"
import {uploadPhoto , getPhotoUrls ,sendPhoto} from "../controllers/photoController.js"
import upload from "../middleware/upload.js"
import { authToken } from "../middleware/authToken.js";


const router = express.Router();

router.post("/upload",authToken,upload.single("photo"),uploadPhoto);
router.get("/photosUrl",authToken,getPhotoUrls);
router.get("/uploads/:userid/:filename",authToken,sendPhoto);

export default router;