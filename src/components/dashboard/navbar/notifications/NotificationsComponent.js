import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./index.sass";
import create from "assets/img/icons/create-notif.png";
import { dateStringParser } from "utils/helpers";

function NotificationsComponent(props) {
  const [clickCount, setClickCount] = useState(0);
  const dropDownContent = React.createRef();

  const toggleDropdown = e => {
    setClickCount(clickCount + 1);
    dropDownContent.current.classList.toggle("show-dropDown");
    if (clickCount % 2 === 1) {
      props.setNotificationsAsRead();
    }
  };

  const notificationLinks =
    props.notifications === null
      ? null
      : props.notifications.data.map((notification, index) => (
          <li
            key={index}
            className={`${notification.read_at === null ? "unread" : "read"}`}
          >
            <div className={"notificationBody"}>
              <img
                src={create}
                alt={notification.data.message}
                className={"notifIcon"}
              />
              <Link to={"#"}>{notification.data.message}</Link>
            </div>
            <div className="time">
              {dateStringParser(notification.data.election.created_at)}
            </div>
          </li>
        ));

  return (
    <li id={"notifications"} className={"text-center"}>
      <div className="dropDown">
        <Link
          onClick={e => toggleDropdown(e)}
          className={"dropdown-btn"}
          to={"#"}
        >
          <i className="fas navbarIcons fa-bell" />
          <p className="mb-0 text-muted">Notifications</p>
          {props.notifications !== null &&
            props.notifications.unreadNotificationsCount >= 1 && (
              <span className={"badge notifCount badge-success"}>
                {props.notifications === null
                  ? ""
                  : props.notifications.unreadNotificationsCount}
              </span>
            )}
        </Link>
        <div
          ref={dropDownContent}
          className="dropdown-content"
          id="notifications-dropdown"
        >
          <ul>{notificationLinks}</ul>
        </div>
      </div>
    </li>
  );
}

export default NotificationsComponent;
