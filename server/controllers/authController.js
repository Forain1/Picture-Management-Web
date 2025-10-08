import User from "../models/user.js";


const users = []

const registerUser = (req, res) => {
  const { userid, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "邮箱或密码不能为空" });
  }

  // 检查邮箱是否已注册
  const existingUser = users.find(user => user.getEmail() === email);
  if (existingUser) {
    return res.status(400).json({ message: "邮箱已被注册" });
  }

  // 创建新用户
  const newUser = new User(userid, email, password);
  users.push(newUser);

  //后端进行检查
  console.log("注册用户:", newUser);

  //返回给前端进行检查(debug用)
  res.json({ success: true, user: users});

};

export default registerUser;