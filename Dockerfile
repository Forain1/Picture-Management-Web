# =========================
# 阶段 1：构建前端
# =========================
FROM node:20 AS build

WORKDIR /app

# 复制 package.json 安装依赖
COPY package*.json ./
RUN npm install

# 复制 Vite 配置、前端源码和 HTML
COPY vite.config.js ./
COPY index.html ./
COPY src ./src

# 构建前端 dist
RUN npm run build

# =========================
# 阶段 2：运行后端
# =========================
FROM node:20

WORKDIR /app

# 安装生产依赖
COPY package*.json ./
RUN npm install --omit=dev

# 拷贝后端代码
COPY server ./server

# 拷贝前端构建结果
COPY --from=build /app/dist ./dist

# 暴露端口（和 server.js 中 PORT 一致）
EXPOSE 5000

# 启动后端服务
CMD ["node", "server/server.js"]
