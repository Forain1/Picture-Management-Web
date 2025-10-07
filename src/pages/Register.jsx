import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";


export default function Register() {
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
          注册账号
        </Typography>

        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="用户名"
            slotProps={{
              inputLabel: { style: { color: 'white' } }, // Label 颜色
              input: { style: { color: 'white' } },      // 输入文字颜色
            }}
            autoFocus
          />
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
          <TextField
            margin="normal"
            required
            fullWidth
            label="确认密码"
            type="password"
              slotProps={{
              inputLabel: { style: { color: 'white' } }, // Label 颜色
              input: { style: { color: 'white' } },      // 输入文字颜色
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            注册
          </Button>
        </Box>
      </Paper>
    </Container>



  );
}
