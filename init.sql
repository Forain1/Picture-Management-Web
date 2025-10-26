-- ========================
-- 初始化数据库表
-- ========================

USE picsite;

-- ------------------------
-- 用户表
-- ------------------------
CREATE TABLE IF NOT EXISTS users (
  id INT NOT NULL AUTO_INCREMENT,
  userid VARCHAR(50) DEFAULT NULL,
  email VARCHAR(100) DEFAULT NULL,
  password VARCHAR(100) DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY email (email),
  UNIQUE KEY userid (userid)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ------------------------
-- 图片表
-- ------------------------
CREATE TABLE IF NOT EXISTS photos (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  originalname VARCHAR(255) NOT NULL,
  filename VARCHAR(255) NOT NULL,
  path VARCHAR(500) NOT NULL,
  width INT DEFAULT NULL,
  height INT DEFAULT NULL,
  uploadtime BIGINT NOT NULL,
  PRIMARY KEY (id),
  KEY user_id (user_id),
  CONSTRAINT photos_ibfk_1 FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ------------------------
-- 标签表
-- ------------------------
CREATE TABLE IF NOT EXISTS tags (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY user_tag (user_id, name),
  CONSTRAINT tags_ibfk_1 FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ------------------------
-- 图片标签关联表
-- ------------------------
CREATE TABLE IF NOT EXISTS photo_tags (
  photo_id INT NOT NULL,
  tag_id INT NOT NULL,
  PRIMARY KEY (photo_id, tag_id),
  KEY tag_id (tag_id),
  CONSTRAINT photo_tags_ibfk_1 FOREIGN KEY (photo_id) REFERENCES photos(id) ON DELETE CASCADE,
  CONSTRAINT photo_tags_ibfk_2 FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
