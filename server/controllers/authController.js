import User from "../models/user.js";
import {genToken,authToken} from "../middleware/authToken.js"



//处理注册
export const registerUser = async (req, res) => {
  const { userid, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "邮箱或密码不能为空" });
  }

  // 生成用户实例
  const newUser = new User(userid, email, password);

  try {
    const emailRes = await newUser.checkEmail();
    // 检查邮箱是否已注册
    if (!emailRes) {
      return res.status(409).json({ message: "邮箱已被注册" });
    }else{
      newUser.storeUser();//将用户保存到数据库中
    }
  } catch (error) {
      return res.status(500).json({massage:"发生某些问题,注册失败"});
  }

  return res.status(201).json({message:"成功注册用户"});

};


//处理登录
export const loginUser = async (req,res) => {
  const {email,password} = req.body;
  
  if(!email||!password){
    return res.status(400).json({message:"邮箱或密码不能为空"});
  }

  const newUser = new User(null,email,password);

  try {
    const userRes = await newUser.checkUser();
    // 检查用户的邮箱和密码信息
    if(!userRes){
      return res.status(400).json({message:"邮箱或密码错误"});
    }else{
      //用JWT生成token,并返回给前端
      const token = genToken(newUser.getEmail(),newUser.getUserId());
      return res.status(200).json({message:"用户登录成功",token});
    }
  } catch (error) {
    return res.status(500).json({message:"发生某些问题,登录失败"}); 
  }
}


//获取用户信息,需要经过中间件的保护
export const userInfo = async (req,res) =>{
  const user = req.user;
  //可以通过user的唯一emali去定位数据库中的其他表,在这里只做userid和email的返回
  return res.status(200).json({message:"获取用户id成功",user});
}



