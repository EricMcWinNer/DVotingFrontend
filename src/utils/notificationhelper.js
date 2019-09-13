import create from "assets/img/icons/create-notif.png";
import edit from "assets/img/icons/edited.png";
import finish from "assets/img/icons/finished.png";
import start from "assets/img/icons/started.png";
import deleted from "assets/img/icons/delete.png";
import { dateStringParser } from "utils/helpers";

class NotificationHelper {
  constructor(notification, election, index) {
    this._notification = notification;
    this._election = election;
    this._index = index;
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
        return `${process.env.REACT_APP_API_PATH}/storage/${this._notification.data.icon}`;
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
        return dateStringParser(this._notification.data.election.deleted_at);
      case "candidate_created":
        return dateStringParser(this._notification.data.candidate.created_at);
      case "candidate_updated":
        return dateStringParser(this._notification.data.candidate.updated_at);
      case "officer_created":
      case "officer_deleted":
        return dateStringParser(this._notification.data.officer.updated_at);
      case "official_created":
      case "official_deleted":
        return dateStringParser(this._notification.data.official.updated_at);
      default:
        return dateStringParser(new Date());
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
        return "/dashboard/election";
      case "candidate_created":
        return "/dashboard/candidates";
      case "candidate_updated":
        return "/dashboard/candidates";
      case "candidate_deleted":
        return "/dashboard/candidates";
      case "officer_created":
      case "officer_deleted":
        return "/dashboard/officers";
      case "official_created":
      case "official_deleted":
        return "/dashboard/officials";
      default:
        return "#";
    }
  }

  faded() {
    switch (this._notification.data.type) {
      case "election_completed":
        return this._election === null ||
          this._election.id !== this._notification.data.election.id
          ? "faded"
          : "";
      case "election_created":
        return this._election === null ||
          this._election.id !== this._notification.data.election.id
          ? "faded"
          : "";
      case "election_started":
        return this._election === null ||
          this._election.id !== this._notification.data.election.id
          ? "faded"
          : "";
      case "election_updated":
        return this._election === null ||
          this._election.id !== this._notification.data.election.id
          ? "faded"
          : "";
      case "election_deleted":
        return this._index !== 0 ||
          (this._election !== null &&
            this._election.id !== this._notification.data.election.id)
          ? "faded"
          : "";
      case "candidate_created":
        return this._election === null ||
          this._election.id !== this._notification.data.candidate.election_id
          ? "faded"
          : "";
      case "candidate_deleted":
        return this._election === null ||
          this._election.id !== this._notification.data.candidate.election_id
          ? "faded"
          : "";
      case "candidate_updated":
        return this._election === null ||
          this._election.id !== this._notification.data.candidate.election_id
          ? "faded"
          : "";
      case "officer_created":
      case "officer_deleted":
        return this._election === null ||
          this._election.id !== this._notification.data.officer.election_id
          ? "faded"
          : "";
      case "official_created":
      case "official_deleted":
        return this._election === null ||
          this._election.id !== this._notification.data.official.election_id
          ? "faded"
          : "";
      default:
        return "";
    }
  }

  isFromCurrentElection() {
    return this.faded() !== "faded";
  }
}

export default NotificationHelper;
