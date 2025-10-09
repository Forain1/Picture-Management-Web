import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";


export default function Login() {
  const navigate = useNavigate();
  const [form , setform] = useState({
      email:'',
      password:''
  });


  const handleSubmit = async (e)=>{
      e.preventDefault();
      const email = form.email;
      const password = form.password;

      //调用后端判断登录
      try {
        const res = await axios.post('/api/login',{
          email,
          password
        });
        console.log(res);
        alert("登录成功!");
        navigate('/');
      } catch (error) {
        console.error(error);
        alert(error.response.data.message)
        return;
      }

  }


  const handleChange = (e)=>{
      const {name,value} = e.target;
      setform({...form,[name]:value});
  }

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

        <Box component="form" sx={{ mt: 1 }}
        onSubmit={handleSubmit}
        method="post"
        >

          <TextField
            margin="normal"
            required
            fullWidth
            label="邮箱地址"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
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
            name="password"
            value={form.password}
            onChange={handleChange}
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
