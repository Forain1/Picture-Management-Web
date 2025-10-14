import express from "express"
import {uploadPhoto , getPhotoUrls ,sendPhoto , getAllTags , uploadTag , addTagToPhoto , removeTagFromPhoto , deletePhoto} from "../controllers/photoController.js"
import upload from "../middleware/upload.js"
import { authToken } from "../middleware/authToken.js";


const router = express.Router();

router.post("/upload",authToken,upload.single("photo"),uploadPhoto);
router.post("/addTag",authToken,uploadTag);

router.get("/photosUrl",authToken,getPhotoUrls);
router.get("/uploads/:userid/:filename",authToken,sendPhoto);
router.get("/allTags",authToken,getAllTags);
router.post("/addTagToPhoto",authToken,addTagToPhoto);
router.post("/removeTagFromPhoto",authToken,removeTagFromPhoto);
router.post("/deletePhoto",authToken,deletePhoto);


export default router;