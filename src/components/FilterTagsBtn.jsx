import React, { useState , useMemo } from "react";
import { Button, Dialog, DialogTitle, DialogContent, Chip, Box , TextField } from "@mui/material";

export default function FilterTagsBtn({setFilterTags,allTags,filterTags}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");


  const filteredTags = useMemo(() => {
    if (!search.trim()) return allTags; // 没有输入则显示全部
    const lowerSearch = search.toLowerCase();
    return allTags.filter((tag) => tag.toLowerCase().includes(lowerSearch));
  }, [allTags, search]);


  const onClickTag = (tag)=>{
    setFilterTags((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((t) => t!== tag);
      } else {
        return [...prev, tag];
      }
    }
    );
  }


  return (
    <>
      {/* 打开对话框按钮 */}
      <Button 
        fullWidth
        variant="outlined" 
        color="primary" 
        sx={{mb:1}}
        onClick={() => setOpen(true)}
      >
        过滤标签
      </Button>

      {/* 弹出框 */}
      <Dialog 
        open={open} 
        onClose={() => setOpen(false)} 
        disableScrollLock
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>过滤标签</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
            {filteredTags && filteredTags.length > 0 ? (
              filteredTags.map((tag) => {
                const isSelected = filterTags&&filterTags.includes(tag);

                return <Chip key={tag} label={tag} color={isSelected? "primary":"default"} variant="outlined" onClick={() => onClickTag(tag)} />
              })
            ) : (
              <p>暂无标签</p>
            )}

        <TextField
          autoFocus
          margin="dense"
          label="搜索标签"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
