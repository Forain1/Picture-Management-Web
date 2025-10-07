import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";

import { useNavigate } from "react-router-dom";



export default function Login() {
  const navigate = useNavigate();


  return (
    <Container component="main" maxWidth="xs">

      <Paper
        elevation={6}
        sx={{
          mt: 8,
          p: 4,
          borderRadius: 3,
          bgcolor: "rgba(255,255,255,0.05)", 
          backdropFilter: "blur(10px)",  
          color: "white"   
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          登录
        </Typography>

        <Box component="form" sx={{ mt: 1 }}>

          <TextField
            margin="normal"
            required
            fullWidth
            label="邮箱地址"
            type="email"
              slotProps={{
              inputLabel: { style: { color: 'white' } }, // Label 颜色
              input: { style: { color: 'white' } },      // 输入文字颜色
          }}  
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="密码"
            type="password"
              slotProps={{
              inputLabel: { style: { color: 'white' } }, // Label 颜色
              input: { style: { color: 'white' } },      // 输入文字颜色
            }}
          />

      <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
        <Button
          variant="contained"
          sx={{ flex: 1, bgcolor: "#6366f1", ":hover": { bgcolor: "#4f46e5" } }}
          type="submit"
        >
          登录
        </Button>
        <Button
          variant="outlined"
          sx={{ flex: 1, color: "white", borderColor: "white", ":hover": { borderColor: "gray" } }}
          onClick={()=>{navigate("/register")}}
        >
          还没有注册?注册
        </Button>
      </Box>


        </Box>
      </Paper>
    </Container>



  );
}
