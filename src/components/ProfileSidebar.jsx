import { Box, Avatar, Button, Divider,Typography } from "@mui/material";
import { useUser } from "./UserProvider";
import axios from "axios";
import React, { useState } from "react";

export default function ProfileSidebar() {
    const {user} = useUser();
    const [file ,setFile] = useState(null);
    const [uploading,setUploading] = useState(false);


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


  return (
    <Box
    sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "linear-gradient(to bottom, #1f1f23, #27272a, #323238)",
        boxShadow: "4px 0 15px rgba(0,0,0,0.5)",
        borderRadius: "16px",
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

        {file && (
        <Button
            fullWidth
            variant="outlined"
            color="primary"
            sx={{ mb: 1 }}
            onClick={handleUpload}
            disabled={uploading}
        >
            {uploading ? "上传中..." : "确认上传"}
        </Button>
        )}


      <Button fullWidth variant="outlined" sx={{ mb: 1 }}>
        Demo2
      </Button>
      <Button fullWidth variant="outlined" sx={{ mb: 1 }}>
        Demo3
      </Button>
      <Button fullWidth color="error" variant="outlined">
        退出登录
      </Button>
    </Box>
  );
}
