import React, { useEffect, useState } from "react";
import { Chip, Box } from "@mui/material";
import TagDialog from "./TagDialog";
import axios from "axios";
import CancelIcon from '@mui/icons-material/Cancel';



export default function TagList({ tags , allTags ,addTagToPhoto , removeTagFromPhoto , photoid }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTag, setSelectedTag] = useState([]);//新添加给这张照片的标签
  const [availableTags,setAvailableTags] = useState(allTags.filter(tag => !tags.includes(tag)));//TagDialog中要显示的标签,即allTags - tags
  const [removeTag,setRemoveTag] = useState(null);//要删除的标签

  //处理对话框关闭后的逻辑
  const handleClose = async ()=>{
    try {
        setOpenDialog(false);
        //需要把新添加标签的信息传给后端的同时更新前端该照片的tags
        await axios.post("/api/addTagToPhoto",{photoid:photoid,tag:selectedTag});
        addTagToPhoto(photoid,selectedTag);
        setSelectedTag(null);
        //console.log("添加标签成功:", selectedTag);
    } catch (error) {
        console.error("添加标签失败:", error);
    }
  }

  //处理点击标签的逻辑,这里是增添tag页面的tag不是展示的tag
  const handleClickTag = (tag) => {
    setSelectedTag((prevTags)=>{
      if(!prevTags)return [tag];
      else {
        return prevTags.includes(tag) ? prevTags.filter(t => t !== tag) : [...prevTags, tag];
      }
    });
    // console.log("点击了标签:", selectedTag);
  }
  
  const removeClickTag = async(tag)=>{
    if(!removeTag||removeTag!=tag){
      setRemoveTag(tag);
      return;
    }
    try {
      //把删除标签的信息传给后端
      await axios.post("/api/removeTagFromPhoto",{photoid:photoid,tag});
      //从前端删除该标签
      removeTagFromPhoto(photoid,tag);
      setRemoveTag(null);
      console.log("照片标签移除成功");
    } catch (error) {
        console.error(error);
    }
  }


  useEffect(()=>{
    setAvailableTags(allTags.filter(tag => !tags.includes(tag)));
    setSelectedTag([]);
    setRemoveTag(null);
  },[tags,allTags]);


  //console.log("availableTags:", availableTags);
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
      {tags.map(tag => (
        tag === removeTag ? (
          // 删除状态
          <Box
            key={tag}
            onClick={() => removeClickTag(tag)}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "16px",    // 与Chip一致
              height: "24px",
              minWidth: "24px",
              padding: "0 8px",
              backgroundColor: "#bd191985",
              color: "#fff",
              cursor: "pointer",
              transition: "background-color 0.2s ease",
              "&:hover": { backgroundColor: "#ff4d4d" },
            }}
          >
            <CancelIcon sx={{ fontSize: 16, color: "white" }} />
          </Box>
        ) : (
          // 普通标签
          <Chip
            key={tag}
            label={tag}
            onClick={() => setRemoveTag(tag)}
            sx={{
              borderRadius: "16px",
              height: "24px",
              minWidth: "24px",
              padding: "0 8px",
              cursor: "pointer",
              backgroundColor: "#7b3ee3ff",
              color: "#fff",
              "&:hover": { backgroundColor: "#5f0671ff" },
            }}
          />
        )
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


      <TagDialog tags={availableTags} open={openDialog} setOpen={setOpenDialog} onClose={handleClose} onClickTag={handleClickTag} selectedTag={selectedTag} setSelectedTag={setSelectedTag}/>
    </Box>
  );
}
