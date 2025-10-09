import jwt from 'jsonwebtoken'
const AUTH_JWT_SECRET = 'mypicsiteloginkey';

const authToken = (req,res,next)=>{
    const authHeader = req.headers['authorization'];//取出请求头的对应行
    const token  = authHeader && authHeader.split(' ')[1];//取出token
    
    if(!token)return res.status(401).json({message:'未提供token'});

    //调用api对token进行验证
    try {
        const user = jwt.verify(token,AUTH_JWT_SECRET);
        req.user = user;
        //console.log(user);
        next();
    } catch (error) {
        return res.status(403).json({message:'token不合法'});
    }
 
}


const genToken = (email,userid)=>{
    return jwt.sign({email,userid},AUTH_JWT_SECRET,{ expiresIn: '1d' });
}


export {authToken,genToken};