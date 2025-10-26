import mysql from "mysql2/promise";

// 创建连接池
const pool = mysql.createPool({
  host: "db",
  user: "root",          // MySQL 用户名
  password: "123456",  // MySQL 密码
  database: "picsite",  // 数据库名
  waitForConnections: true,
  connectionLimit: 10
});

export default pool;
