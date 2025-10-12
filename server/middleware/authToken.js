import jwt from 'jsonwebtoken'
import User from '../models/user.js';
const AUTH_JWT_SECRET = 'mypicsiteloginkey';

const authToken = async (req, res, next) => {
  // 1. 先尝试从请求头取 token
  let token = null;
  const authHeader = req.headers['authorization'];
  if (authHeader) token = authHeader.split(' ')[1];

  // 2. 如果请求头没有 token，再从 query 参数取
  if (!token && req.query && req.query.token) {
    token = req.query.token;
  }

  // 3. 如果仍然没有 token
  if (!token) return res.status(401).json({ message: '未提供 token' });

  try {
    // 4. 验证 token
    const user = jwt.verify(token, AUTH_JWT_SECRET);
    req.user = user;

    // 5. 验证数据库中是否有对应用户
    const myUser = new User(user.userid, user.email, null);
    const exists = await myUser.checkEmail();

    if (exists) return res.status(403).json({ message: 'token 不匹配' });

    next();
  } catch (error) {
    return res.status(403).json({ message: 'token 不合法' });
  }
};



const genToken = (email,userid)=>{
    return jwt.sign({email,userid},AUTH_JWT_SECRET,{ expiresIn: '1d' });
}


export {authToken,genToken};