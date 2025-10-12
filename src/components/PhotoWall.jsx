import React from "react";
import { Box, Card, CardMedia } from "@mui/material";
import { useState,useEffect } from "react";
import axios from "axios";
import { useUser } from "./UserProvider";
import PhotoDetail from "./PhotoDetail";


export default function PhotoWall({photoList,allTags,setPhotoList}) {

  const {token} = useUser();
  const [page,setPage] = useState(0);//一开始的照片页数,每一页只展示十张照片,to be done
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const addTagToPhoto = (photoId, newTag) => {
    setPhotoList(prevList =>
      prevList.map(photo =>
        photo.id === photoId
          ? {
              ...photo,
              tags: photo.tags.includes(newTag) ? photo.tags : [...photo.tags, newTag]
            }
          : photo
      )
    );
  };



  return (
      <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
        {/* 瀑布流照片墙 */}
        <Box
          sx={{
            flex: 1,
            p: 3,
            backgroundColor: "#18181b",
            columnCount: { xs: 2, sm: 3, md: 4 },
            columnGap: "16px",
            overflowY: "auto", // 允许滚动
            height: "100%",
          }}
        >
          {photoList.map(photo => (
            <Card
              key={photo.id}
              sx={{
                mb: "16px",
                borderRadius: "16px",
                overflow: "hidden",
                breakInside: "avoid",
              }}
            >
              <CardMedia
                component="img"
                image={`${photo.url}?token=${token}`}
                alt={`photo-${photo.id}`}
                onClick={() => setSelectedPhoto(photo)}
              />
            </Card>
          ))}
        </Box>

        {/* 侧边栏 */}
        {selectedPhoto && (
          <PhotoDetail photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} allTags={allTags} addTagToPhoto={addTagToPhoto} />
        )}
      </Box>
  );
}
