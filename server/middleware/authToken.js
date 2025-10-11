import jwt from 'jsonwebtoken'
import User from '../models/user.js';
const AUTH_JWT_SECRET = 'mypicsiteloginkey';

const authToken = async (req,res,next)=>{
    const authHeader = req.headers['authorization'];//取出请求头的对应行
    const token  = authHeader && authHeader.split(' ')[1];//取出token
    
    if(!token)return res.status(401).json({message:'未提供token'});

    //调用api对token进行验证
    try {
        const user = jwt.verify(token,AUTH_JWT_SECRET);
        req.user = user;
        const myUser = new User(user.userid,user.email,null);
        //这里是要检测邮箱在数据库中是否存在, 若存在则证明这个token是有对应用户的
        if(await myUser.checkEmail())return res.status(403).json({message:'token不匹配'});
        next();
    } catch (error) {
        return res.status(403).json({message:'token不合法'});
    }finally{
        
    }
 
}


const genToken = (email,userid)=>{
    return jwt.sign({email,userid},AUTH_JWT_SECRET,{ expiresIn: '1d' });
}


export {authToken,genToken};