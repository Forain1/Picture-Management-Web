import React, { useState } from "react";
import { Box, Typography, Chip } from "@mui/material";
import TagList from "./TagLists";

function PhotoDetail({ photo, onClose, allTags , addTagToPhoto}) {
  if (!photo) return null; // 没有选中照片就不显示



  return (
    <Box
      sx={{
        height: "100vh",
        boxShadow: "-4px 0 15px rgba(0,0,0,0.5)",
        background: "linear-gradient(to bottom, #1f1f23, #27272a, #323238)",
        padding: 2,
        zIndex: 10,
        flexBasis: "30%",          // 侧边栏占父容器宽度的 30%
        flexShrink: 0,          // 防止被压缩
      }}
    >
      <Typography variant="h6" gutterBottom>
        照片信息
      </Typography>
      <Typography variant="body1" >
        照片名称: {photo.originalName}
        </Typography>

      {/* 分辨率 */}
      <Typography variant="body1">
        分辨率: {photo.solution.width}  {"\u00D7"}  {photo.solution.height}
      </Typography>

      {/* 标签 */}
      <Box>
        <Typography variant="body1">标签:</Typography>
        {/* 使用 TagList 组件管理标签 */}
        <TagList tags={photo.tags}  allTags={allTags} addTagToPhoto={addTagToPhoto} photoid={photo.id}/>
      </Box>
    </Box>
  );
}

export default  PhotoDetail;
