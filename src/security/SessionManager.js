import jwt from "jsonwebtoken";
import getCookie, { checkCookie } from "utils/cookie";
import axios from "axios";

class SessionManager {
  static isUserSignedIn() {
    axios.defaults.withCredentials = true;
    return axios(
      `${process.env.REACT_APP_API_PATH}/api/validate-web-app-session`,
      {
        method: "get"
      }
    );
  }
}

export default SessionManager;
