import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token,setToken] = useState(localStorage.getItem('token'));
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    if(!token){
      setLoading(false);
      return;
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const fetchUserID = async ()=>{
      try {
        const res = await axios.get('/api/profile');
        const {user} = res.data;
        //console.log(user);
        setUser({email:user.email,userid:user.userid});
        console.log("token check successfully!");
      } catch (error) {
        console.error('Token过期或无效',error);
        localStorage.removeItem('token');//从本地存储中移除
        delete axios.defaults.headers.common['Authorization'];//请求不要带上这个token了
        setUser(null);
      }finally{
        setLoading(false);
      }
    }
    fetchUserID();
  },[token]);


  return (
    <UserContext value={{user,setUser,setToken,loading}}>
      {children}
    </UserContext>
  );
};

// 自定义 Hook，方便使用
export const useUser = () => useContext(UserContext);
