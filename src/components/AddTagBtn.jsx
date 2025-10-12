import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

export default function AddTagBtn({ onAddTag }) {
  const [open, setOpen] = useState(false);
  const [newTag, setNewTag] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewTag(""); // 清空输入
  };

  const handleConfirm = () => {
    if (newTag.trim()) {
      onAddTag(newTag.trim().toLowerCase()); // 通知父组件添加标签
    }
    handleClose();
  };

  return (
    <>
      <Button
        fullWidth
        variant="outlined"
        sx={{ mb: 1 }}
        onClick={handleOpen}
      >
        添加新标签
      </Button>

      <Dialog open={open} onClose={handleClose} disableScrollLock>
        <DialogTitle>添加新标签</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="标签名"
            fullWidth
            variant="outlined"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleConfirm} variant="contained">
            确定
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
