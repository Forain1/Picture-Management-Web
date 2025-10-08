export default class User {
  #userid;
  #email;
  #passwd;

  constructor(userid, email, passwd) {
    this.#userid = userid;
    this.#email = email;
    this.#passwd = passwd;
  }

  // 提供访问方法
  getUserId() {
    return this.#userid;
  }

  getEmail() {
    return this.#email;
  }

}