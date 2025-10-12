import ProfileSidebar from "../components/ProfileSidebar"
import PhotoWall from "../components/PhotoWall"
import { Box } from "@mui/material"
import { useUser } from "../components/UserProvider";
import { useState , useEffect } from "react";
import axios from "axios";

export default function Profile() {
    const {user,loading} = useUser();
    const [allTags,setAllTags] = useState([]);//该用户所有标签,用来搜索 
    const [photoList, setPhotoList] = useState([]);//该用户照片的url




    useEffect(()=>{

      if(loading||!user)return;
      
      const fetchPhotos = async()=>{
        try {
          const response = await axios.get("/api/photosUrl");
          setPhotoList(response.data.photoUrls);
          const tagsResponse = await axios.get("/api/allTags");
          setAllTags(tagsResponse.data.tags);
        } catch (error) {
          console.error("获取照片列表失败:", error);
        }
      }
      fetchPhotos();
  },[user,loading]);

    return (
        <Box sx={{ display: "flex" }}>
            <Box sx={{ width: "15vw", flexShrink: 0 }}>
                <ProfileSidebar allTags={allTags} setAllTags={setAllTags} />
            </Box>
            <Box sx={{ flex: 1 }}>
                <PhotoWall photoList={photoList} setPhotoList={setPhotoList} allTags={allTags}  />
            </Box>
        </Box>
    )
}