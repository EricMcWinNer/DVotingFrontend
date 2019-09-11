import create from "assets/img/icons/create-notif.png";
import edit from "assets/img/icons/edited.png";
import finish from "assets/img/icons/finished.png";
import start from "assets/img/icons/started.png";
import deleted from "assets/img/icons/delete.png";
import { dateStringParser } from "utils/helpers";

class NotificationHelper {
  constructor(notification) {
    this._notification = notification;
  }

  getIcon() {
    switch (this._notification.data.type) {
      case "election_completed":
        return finish;
      case "election_created":
        return create;
      case "election_started":
        return start;
      case "election_updated":
        return edit;
      case "election_deleted":
        return deleted;
      default:
        return `${process.env.REACT_APP_API_PATH}/storage/${this._notification.icon}`;
    }
  }

  getTime() {
    switch (this._notification.data.type) {
      case "election_completed":
        return dateStringParser(this._notification.data.election.end_date);
      case "election_created":
        return dateStringParser(this._notification.data.election.created_at);
      case "election_started":
        return dateStringParser(this._notification.data.election.start_date);
      case "election_updated":
        return dateStringParser(this._notification.data.election.updated_at);
      case "election_deleted":
        return "string";
      default:
        return "string";
    }
  }

  getLink() {
    switch (this._notification.data.type) {
      case "election_completed":
        return "/dashboard/election";
      case "election_created":
        return "/dashboard/election";
      case "election_started":
        return "/dashboard/election";
      case "election_updated":
        return "/dashboard/election";
      case "election_deleted":
        return "string";
      default:
        return "string";
    }
  }
}

export default NotificationHelper;
