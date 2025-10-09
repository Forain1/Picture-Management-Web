import pool from "../db.js";



export default class User {
  #userid;
  #email;
  #password;

  constructor(userid, email, password) {
    this.#userid = userid;
    this.#email = email;
    this.#password = password;
  }

  // 提供访问方法
  getUserId() {
    return this.#userid;
  }

  getEmail() {
    return this.#email;
  }

  //检测邮箱是否已经存在,若存在返回false,否则返回true
  async checkEmail(){
    let connection;
    try {
        connection = await pool.getConnection();//从池子获取连接
        const sql = 'select * from users where email = ?';
        const [rows] = await connection.execute(sql,[this.#email]);
        if(rows.length>0)return false;
        else return true;
    } catch (error) {
        console.log(error);
        throw error;
    }finally{
        if(connection)connection.release();//释放连接回池子
    }
  }

  //将用户数据保存到数据库中
  async storeUser(){
    let connection;
    try {
        connection  = await pool.getConnection();
        const sql = 'insert into users (userid , email ,password) values (?,?,?)';
        await connection.execute(sql,[this.#userid,this.#email,this.#password]);
    } catch (error) {
        console.log(error);
        throw error;
    }finally{
      if(connection)connection.release();
    }
  }

  //检查用户的登录信息
  async checkUser(){
    let connection;
    try {
      connection = await pool.getConnection();
      const sql = 'select * from users where email = ?';
      const [rows] = await connection.execute(sql,[this.#email]);
      if(rows.length===0)return false;
      //只有一个对应的邮箱
      this.#email = rows[0].email;
      this.#userid = rows[0].userid;
      return rows[0].password===this.#password;
    } catch (error) {
      console.log(error);
      throw error;
    }finally{
      if(connection)connection.release();
    }
  }
}