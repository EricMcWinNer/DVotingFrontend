class UserManager {
  static isOfficial(user) {
    return JSON.parse(user.roles).includes("official");
  }

  static isCandidate(user) {
    return JSON.parse(user.roles).includes("candidate");
  }

  static isOfficer(user) {
    return JSON.parse(user.roles).includes("officer");
  }

  static isOnlyVoter(user) {
    const roles = JSON.parse(user.roles);
    return roles.includes("voter") && roles.length === 1;
  }
}

export default UserManager;
