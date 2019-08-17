import React from "react";

import "./userinfo.sass";

function UserInfo(props) {
  return (
    <div id="userInfo" className={"text-center"}>
      <img
        src={`${process.env.REACT_APP_API_PATH}/storage/${props.user.picture}`}
        alt={"User's Name"}
        id="userPicture"
      />
      <p id={"userName"}>{props.name}</p>
    </div>
  );
}

export default UserInfo;
