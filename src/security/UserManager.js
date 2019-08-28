class UserManager {
  constructor(user) {
    this._user = user;
  }
  
  returnUser() {
    return this._user;
  }
  
  static isOfficial(user) {
    return JSON.parse(user.roles).includes("official");
  }
  
  isOfficial() {
    return JSON.parse(this._user.roles).includes("official");
  }
  
  static isCandidate(user) {
    return JSON.parse(user.roles).includes("candidate");
  }
  
  isCandidate() {
    return JSON.parse(this._user.roles).includes("candidate");
  }
  
  static isOfficer(user) {
    return JSON.parse(user.roles).includes("officer");
  }
  
  isOfficer() {
    return JSON.parse(this._user.roles).includes("officer");
  }
  
  static isOnlyVoter(user) {
    const roles = JSON.parse(user.roles);
    return roles.includes("voter") && roles.length === 1;
  }
  
  isOnlyVoter() {
    const roles = JSON.parse(this._user.roles);
    return roles.includes("voter") && roles.length === 1;
  }
}

export default UserManager;
