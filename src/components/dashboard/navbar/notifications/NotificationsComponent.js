import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";

import "./index.sass";

import { dateStringParser } from "utils/helpers";
import NotificationHelper from "utils/notificationhelper";

function NotificationsComponent(props) {
  const [clickCount, setClickCount] = useState(0);
  const dropDownContent = React.createRef();

  const toggleDropdown = e => {
    if (props.notifications.data.length >= 1) {
      setClickCount(clickCount + 1);
      dropDownContent.current.classList.toggle("show-dropDown");
      if (clickCount % 2 === 1) {
        props.setNotificationsAsRead();
      }
    }
  };

  const notificationLinks =
    props.notifications === null
      ? null
      : props.notifications.data.map((notification, index) => {
          const notificationHelper = new NotificationHelper(
            notification,
            props.notifications.election,
            index
          );
          return (
            <li
              key={index}
              className={`${
                notification.read_at === null ? "unread" : "read"
              } ${notificationHelper.faded()}`}
            >
              <div
                data-for={`notification-${index}`}
                data-tip="This notification belongs to an inactive election"
              >
                <div className={"notificationBody"}>
                  <img
                    src={notificationHelper.getIcon()}
                    alt={notification.data.message}
                    className={"notifIcon"}
                  />
                  <Link
                    to={
                      notificationHelper.isFromCurrentElection()
                        ? notificationHelper.getLink()
                        : "#"
                    }
                  >
                    {notification.data.message}
                  </Link>
                </div>
                <div className="time">{notificationHelper.getTime()}</div>
                <ReactTooltip
                  id={`notification-${index}`}
                  disabled={notificationHelper.isFromCurrentElection()}
                  place={"left"}
                />
              </div>
            </li>
          );
        });

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
