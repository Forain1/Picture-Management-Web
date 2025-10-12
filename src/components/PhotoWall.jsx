import React from "react";
import { Box, Card, CardMedia } from "@mui/material";
import { useState,useEffect } from "react";
import axios from "axios";
import { useUser } from "./UserProvider";


// 模拟照片数据（本地资源）
const photos = [
  { id: 1, url: "/src/assets/image1.jpg" },
  { id: 2, url: "/src/assets/image2.jpg"},
  { id: 3 ,url: "/src/assets/image3.jpg"},
  { id: 4 ,url: "/src/assets/image3.jpg"},
  { id: 5 ,url: "/src/assets/image3.jpg"},
  { id: 6 ,url: "/src/assets/image2.jpg"},
  { id: 7 ,url: "/src/assets/image2.jpg"},
  { id: 8 ,url: "/src/assets/image2.jpg"},
  { id: 9 ,url: "/src/assets/image2.jpg"},
  { id: 10 ,url: "/src/assets/image2.jpg"},
  { id: 11 ,url: "/src/assets/image2.jpg"},
  { id: 12,url: "/src/assets/image2.jpg"},
  { id: 13 ,url: "/src/assets/image2.jpg"},
  { id: 14 ,url: "/src/assets/image2.jpg"},
  { id: 15 ,url: "/src/assets/image2.jpg"},
];

export default function PhotoWall() {
  const [photoList, setPhotoList] = useState([]);
  const {user,loading,token} = useUser();

  useEffect(()=>{

      if(loading||!user)return;
      
      const fetchPhotos = async()=>{
        try {
          const response = await axios.get("/api/photosUrl");
          setPhotoList(response.data.photoUrls);
          console.log("获取照片列表:", response.data.photoUrls);
        } catch (error) {
          console.error("获取照片列表失败:", error);
        }
      }
      fetchPhotos();
  },[user,loading]);



  return (
    <Box sx={{ display: "flex" }}>
      {/* 右侧瀑布流照片墙 */}
      <Box
        sx={{
          flex: 1,
          p: 3,
          backgroundColor: "#18181b", // 与背景一致
          columnCount: { xs: 2, sm: 3, md: 4 }, // 响应式列数
          columnGap: "16px",
        }}
      >
        {photoList.map((photo) => (
          <Card
            key={photo.id}
            sx={{
              mb: "16px",
              borderRadius: "16px",
              overflow: "hidden",
              breakInside: "avoid", // 防止列内断裂
            }}
          >
            <CardMedia
              component="img"
              image={`${photo.url}?token=${token}`} // 使用本地资源路径
              alt={`photo-${photo.id}`}
            />
          </Card>
        ))}
      </Box>
    </Box>
  );
}
