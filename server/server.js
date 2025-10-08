// 后端最小化示例，只用 express
import express from 'express'
import cors from 'cors';
import authRoute from "./routes/authRoute.js"


const app = express();
const PORT = 5000; // 后端端口

// 使用中间件解析 JSON
app.use(express.json());

// 允许前端跨域请求
app.use(cors({
  origin: 'http://localhost:8000'
}));

app.use('/api',authRoute)




app.listen(PORT, () => {
  console.log(`后端已启动: http://localhost:${PORT}`);
});
