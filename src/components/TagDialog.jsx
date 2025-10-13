import React, { useState, useMemo } from "react";
import {
  Box,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

export default function TagDialog({ tags, open, setOpen ,onClose, onClickTag ,selectedTag ,setSelectedTag}) {
  const [search, setSearch] = useState("");

  // 根据 search 输入过滤标签
  const filteredTags = useMemo(() => {
    if (!search.trim()) return tags; // 没有输入则显示全部
    const lowerSearch = search.toLowerCase();
    return tags.filter((tag) => tag.toLowerCase().includes(lowerSearch));
  }, [tags, search]);

  return (
    <Dialog open={open} onClose={()=>{setOpen(false)}} disableScrollLock>
      <DialogTitle>编辑标签</DialogTitle>
      <DialogContent>

        {/* 标签列表 */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
          {filteredTags.map((tag) => {
            const selected = selectedTag ? selectedTag.includes(tag) : false;
            return (
            <Chip
              key={tag}
              label={tag}
              clickable              // 使 Chip 可点击
              color={selected ? "primary" : "default"} // 点击切换颜色
              onClick={() => {
                // 点击时调用回调，把 tag 传出去
                if(onClickTag)onClickTag(tag);
              }}

            />
          )}
          )}
        </Box>


        {/* 搜索框 */}
        <TextField
          autoFocus
          margin="dense"
          label="搜索标签"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={()=>{
          setOpen(false)
          setSelectedTag(null);
        }}>取消</Button>
        <Button variant="contained" onClick={onClose}>
          确认
        </Button>
      </DialogActions>
    </Dialog>
  );
}
