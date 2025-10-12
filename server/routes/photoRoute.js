import express from "express"
import {uploadPhoto , getPhotoUrls ,sendPhoto , getAllTags , uploadTag , addTagToPhoto} from "../controllers/photoController.js"
import upload from "../middleware/upload.js"
import { authToken } from "../middleware/authToken.js";


const router = express.Router();

router.post("/upload",authToken,upload.single("photo"),uploadPhoto);
router.post("/addTag",authToken,uploadTag);

router.get("/photosUrl",authToken,getPhotoUrls);
router.get("/uploads/:userid/:filename",authToken,sendPhoto);
router.get("/allTags",authToken,getAllTags);
router.post("/addTagToPhoto",authToken,addTagToPhoto);

export default router;