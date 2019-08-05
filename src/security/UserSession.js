import jwt from "jsonwebtoken";
import getCookie from "utils/cookie";

class UserSession {
  constructor() {
    this._jwt = getCookie("jwt");
  }

  static isUserSignedIn() {}

  get jwt() {
    console.log(this._jwt);
  }

  get userId() {}
}

export default UserSession;
