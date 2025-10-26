import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoute from "./routes/authRoute.js";
import photoRoute from "./routes/photoRoute.js";

const app = express();
const PORT = 5000;

// ES module 下获取 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 解析 JSON
app.use(express.json());

// 允许跨域
app.use(cors({
  origin: 'http://localhost:8000'
}));

// 后端 API
app.use('/api', authRoute);
app.use('/api', photoRoute);

// ==============================
// 前端静态文件托管（dist 在上一级）
const distPath = path.join(__dirname, '../dist'); // <-- 上一级
app.use(express.static(distPath));

// SPA fallback
app.use((req, res, next) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
