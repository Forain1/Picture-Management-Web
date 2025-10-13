import React from "react";
import { Box, Card, CardMedia ,Button} from "@mui/material";
import { useState,useEffect } from "react";
import axios from "axios";
import { useUser } from "./UserProvider";
import PhotoDetail from "./PhotoDetail";


export default function PhotoWall({photoList,allTags,setPhotoList}) {

  const {token} = useUser();
  const [page,setPage] = useState(0);//一开始的照片页数,每一页只展示十张照片,to be done
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  //用来添加photolist中某张照片的tag,注意这里的newTag是个数组
  const addTagToPhoto = (photoId, newTags) => {
    setPhotoList(prevList =>
      prevList.map(photo =>
        photo.id === photoId
          ? {
              ...photo,
              tags: photo.tags ? [...photo.tags, ...newTags]:[...newTags],
            }
          : photo
      )
    );
    console.log("update photoList tags", photoList);
  };


  //用来删除phtotList中某张照片的tag,这里的tagToRemove单个tag,即字符串
  const removeTagFromPhoto = (photoId, tagToRemove) => {
    setPhotoList(prevList =>
      prevList.map(photo =>
        photo.id === photoId
          ? {
              ...photo,
              tags: photo.tags.filter(tag => tag !== tagToRemove),
            }
          : photo
      )
    )
  }


    //用来同步照片改变tag,从而确保侧边栏显示的标签是最新的
    useEffect(() => {
      if (selectedPhoto) {
        const updated = photoList.find(p => p.id === selectedPhoto.id);
        if (updated) setSelectedPhoto(updated);
      }
    }, [photoList]);
  

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
          <PhotoDetail photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} allTags={allTags} addTagToPhoto={addTagToPhoto} removeTagFromPhoto={removeTagFromPhoto} />
        )}
      </Box>




  );
}


/** 用来debug的按钮
 * 
 * 
 * 
 *         <Button
          variant="outlined"
          sx={{ ml: 1 }}
          onClick={() => {
              console.log(photoList);
          }}
        >
          查看当前 state
        </Button>
 */