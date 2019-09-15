import React from "react";
import Countdown from "react-countdown-now";

import "./index.sass";
import { pad } from "utils/helpers";
import LinkButton from "components/buttons/react-router-link-button";
import voting from "assets/img/icons/voting.png";

//TODO - CONDITIONALLY RENDER A LINK TO CREATE AN ELECTION AND A COUNTDOWN FOR ELECTION FINISHING OR THAT NO ELECTION EXISTS IF THE PERSON IS NOT AN OFFICIAL

function CountdownTimer(props) {
  if (props.election !== null) {
    const { start_date, end_date, status } = props.election;
    let countDownDate, countDownText;
    if (status === "pending") {
      countDownDate = new Date(start_date);
      countDownText = "Countdown to Next Election";
    } else if (status === "ongoing") {
      countDownDate = new Date(end_date);
      countDownText = "Countdown to end of Election";
    } else countDownDate = new Date(end_date);
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
      if (completed) {
        // Render a completed state
        return <div />;
      } else {
        // Render a countdown
        return (
          <div className="countDown">
            <div className="overlay">
              <ul>
                <li>
                  <span className={"count"}>{pad(days, 2)}</span>
                  <p>{days === 1 ? "Day" : "Days"}</p>
                </li>
                <li>
                  <span className={"count"}>{pad(hours, 2)}</span>
                  <p>{hours === 1 ? "Hour" : "Hours"}</p>
                </li>
                <li>
                  <span className={"count"}>{pad(minutes, 2)}</span>
                  <p>{minutes === 1 ? "Minute" : "Minutes"}</p>
                </li>
                <li>
                  <span className={"count"}>{pad(seconds, 2)}</span>
                  <p>{seconds === 1 ? "Second" : "Seconds"}</p>
                </li>
              </ul>
            </div>
            {status === "ongoing" && (
              <div className={"voter-call-to-action"}>
                <LinkButton
                  className={"confirm-background"}
                  to={"/dashboard/vote"}
                >
                  <img src={voting} alt={"Vote Now!"} />
                  Vote Now
                </LinkButton>
              </div>
            )}
            <p className={"mt-3 mb-0 countdown-title"}>{countDownText}</p>
          </div>
        );
      }
    };
    return (
      <Countdown
        zeroPadTime={2}
        date={countDownDate}
        onComplete={() => setTimeout(props.updateDashboard, 3000)}
        renderer={renderer}
      />
    );
  } else return <div />;
}

export default CountdownTimer;
