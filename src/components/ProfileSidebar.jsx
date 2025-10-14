import { Box, Avatar, Button, Divider,Typography } from "@mui/material";
import { useUser } from "./UserProvider";
import axios from "axios";
import React, { useState } from "react";
import AddTagBtn from "./AddTagBtn";
import ShowTagBtn from "./ShowTagBtn";
import FilterTagsBtn from "./FilterTagsBtn";

export default function ProfileSidebar({allTags,setAllTags,setFilterTags,filterTags}) {
    const {user} = useUser();
    const [file ,setFile] = useState(null);
    const [uploading,setUploading] = useState(false);


    const onAddTag = async (newTag)=>{
      //若新加入的tag已经存在了 不允许添加
      if(allTags.includes(newTag)){
        alert("标签已存在!");
        return;
      }else{
        //否则添加标签,调用对应的后端api
        try {
          await axios.post("/api/addTag",{tag:newTag});
         setAllTags((prevTags) => [...prevTags, newTag]);
         alert("添加标签成功!");
        } catch (error) {
          console.error("添加标签失败:", error);
          alert("添加标签失败!");
        }
      }
    }

    const handleChange = (e)=>{
        setFile(e.target.files[0]);
    }

    const handleUpload = async () => {
        if (!file) return;
        const formData = new FormData();
        formData.append("photo", file);

        try {
            setUploading(true);
            await axios.post("/api/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
            });
            alert("上传成功！");
        } catch (err) {
            alert("上传失败！");
        }finally{
            setUploading(false);
            setFile(null);
        }
    };

    const handleCancel = ()=>{
      setFile(null);
      setUploading(false);
    }


  return (
    <Box
    sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "linear-gradient(to bottom, #1f1f23, #27272a, #323238)",
        boxShadow: "4px 0 10px rgba(0,0,0,0.5)",
        borderRadius: "16px",
        position: "relative", 
        zIndex: 1,            
        p: 2,
        
    }}
    >
      {/* 头像 */}
      <Avatar sx={{ width: 80, height: 80, mb: 2 }}>{user.userid[0].toUpperCase()}</Avatar>

      <Divider
        sx={{
            width: "100%",
            mb: 2,
            borderColor: "rgba(255,255,255,0.5)", // 分割线颜色
            borderWidth: "2px",                     // 分割线粗细
            borderRadius: '8px'
        }}
/>


      {/* 上传按钮 */}
        <Button
        fullWidth
        variant="contained"
        component="label" // 让按钮变成label
        sx={{
            mb: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 48
        }}
        >
        <Typography variant="h6" color="white" align="center">
            上传照片
        </Typography>
        <input type="file" accept="image/*" hidden onChange={handleChange} />
        </Button>

      {/* 确认上传和取消按钮,只有在选择了文件后才显示 */}
      {file && (
        <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? "上传中..." : "确认上传"}
          </Button>

          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            onClick={handleCancel} 
            disabled={uploading}
          >
            取消上传
          </Button>
        </div>
      )}


      {/* 用来输入标签进行检索 */}
      <AddTagBtn onAddTag={onAddTag} />
      <ShowTagBtn allTags={allTags} />
      <FilterTagsBtn setFilterTags={setFilterTags} allTags={allTags} filterTags={filterTags} />

      {/* <Button fullWidth variant="outlined" sx={{ mb: 1 }} onClick={()=>console.log(filterTags)}>
        添加标签
      </Button>
        <Button fullWidth variant="outlined" sx={{ mb: 1 }}>
        查看已有标签
      </Button>
      <Button fullWidth color="error" variant="outlined">
        退出登录
      </Button> */}

    </Box>
  );
}
