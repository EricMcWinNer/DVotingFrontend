import React from "react";

import "./userinfo.sass";
import testImg from "assets/img/tests/test.jpg";

function UserInfo() {
  return (
    <div id="userInfo" className={"text-center"}>
      <img src={testImg} alt={"User's Name"} id="userPicture" />
      <p id={"userName"}>Web Developer</p>
    </div>
  );
}

export default UserInfo;
