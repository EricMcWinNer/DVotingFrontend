import axios from "axios";
//TODO WRITE A CLEAN METHOD FOR HANDLING AUTHENTICATED REQUESTS
class SessionManager {
  static isUserSignedIn(props) {
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
