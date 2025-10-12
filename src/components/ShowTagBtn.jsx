import React, { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, Chip, Box } from "@mui/material";

export default function ShowTagBtn({ allTags }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 打开对话框按钮 */}
      <Button 
        fullWidth
        variant="outlined" 
        color="primary" 
        onClick={() => setOpen(true)}
      >
        查看所有标签
      </Button>

      {/* 弹出框 */}
      <Dialog 
        open={open} 
        onClose={() => setOpen(false)} 
        disableScrollLock
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>所有标签</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
            {allTags && allTags.length > 0 ? (
              allTags.map((tag) => (
                <Chip key={tag} label={tag} color="primary" variant="outlined" />
              ))
            ) : (
              <p>暂无标签</p>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
