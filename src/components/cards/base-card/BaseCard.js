import React from "react";

import "./index.sass";

function BaseCard({ id, className, children, ...props }) {
  return (
    <div
      id={id}
      className={`baseCard ${className !== undefined && className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default BaseCard;
