import React from "react";
import Countdown from "react-countdown-now";

import "./index.sass";
import { pad } from "utils/helpers";

function CountdownTimer() {
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <div/>;
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
          <p className={"mt-3 mb-0 countdown-title"}>Countdown to Next Election</p>
        </div>
      );
    }
  };
  return (
    <Countdown zeroPadTime={2} date={Date.now() + (48 * 60 * 60 * 1000)} renderer={renderer}/>
  );
}

export default CountdownTimer;