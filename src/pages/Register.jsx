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

export default function Register() {

  const navigate = useNavigate();

  const [form,setForm] = useState({
    userid : '',
    email:'',
    password:'',
    confirmpassword:''
  })

  //表单提交处理函数
  const handleSubmit = async (e)=>{
        e.preventDefault();
        const email = form.email;
        const password = form.password;
        const confirmpassword = form.confirmpassword;
        const userid = form.userid;

        //判断密码一致性
        if(confirmpassword!==password){
          alert("两次输入的密码不一致");
          return;
        }

        //调用后端接口进行注册
        try {
          //给后端传输注册数据
            const response = await axios.post("/api/register", {
              email,
              password,
              userid
            });
          console.log(response.data); // 后端返回的数据
          alert("注册成功！");
          navigate("/login"); // 注册后跳转登录
        } catch (error) {

          console.error(error);
          alert(error.response.data.message);
          return;
          
        }
  }

  //处理组件输入改变
  const handleChange = (e)=>{
      const {name,value} = e.target;
      setForm({...form,[name]:value});
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
          注册账号
        </Typography>

        <Box component="form" sx={{ mt: 1 }} 
        onSubmit={handleSubmit}
        method="post"
        >
          <TextField
            margin="normal"
            required
            fullWidth
            label="用户名"
            name="userid"
            value={form.userid}
            onChange={handleChange}
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
            name="email"
            type="email"
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
          <TextField
            margin="normal"
            required
            fullWidth
            label="确认密码"
            type="password"
            name="confirmpassword"
            value={form.confirmpassword}
            onChange={handleChange}
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
