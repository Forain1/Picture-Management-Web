import React, { useState } from "react";
import { Chip, Box } from "@mui/material";
import TagDialog from "./TagDialog";
import axios from "axios";


export default function TagList({ tags , allTags ,addTagToPhoto , photoid}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);//新添加给这张照片的标签

  const handleClose = async ()=>{
    try {
        setOpenDialog(false);
        //需要把新添加标签的信息传给后端的同时更新前端该照片的tags
        addTagToPhoto(photoid,selectedTag);
        await axios.post("/api/addTagToPhoto",{photoid:photoid,tag:selectedTag});
    } catch (error) {
        console.error("添加标签失败:", error);
    }
  }

  const handleClickTag = (tag) => {
    setSelectedTag((prevTags)=>{
      if(!prevTags)return tag;
      else return [...prevTags , tag];
    });
  }

  //allTags - tags = TagDialog中要显示的标签
  const availableTags = allTags.filter(tag => !tags.includes(tag));
  //console.log("availableTags:", availableTags);
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
      {tags && tags.map((tag) => (
        <Chip key={tag} label={tag} />
      ))}

      {/* + Chip */}
        <Chip
        label="+"
        onClick={() => setOpenDialog(true)}
        sx={{
            borderRadius: "16px",      // 小椭圆
            height: "24px",
            minWidth: "24px",
            padding: "0 8px",
            cursor: "pointer",
            backgroundColor: "#1976d2", // 蓝色背景
            color: "#fff",              // 白色文字
            "&:hover": { backgroundColor: "#1565c0" }, // 悬浮变深蓝
        }}
        />


      <TagDialog tags={availableTags} open={openDialog} setOpen={setOpenDialog} onClose={handleClose} onClickTag={handleClickTag}/>
    </Box>
  );
}
