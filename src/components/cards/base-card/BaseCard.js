import React from "react";

import "./index.sass";

function BaseCard(props) {
  return (
    <div id={props.id} className={"baseCard " + props.className}>
      {props.children}
    </div>
  );
}

export default BaseCard;
