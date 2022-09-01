import * as React from "react";
import DefaultSVG from "./default_svg";

export default function DefaultCanvas() {
  console.log("Default Canvas");
  return (
    <div className="canvas_container">
      <p>
        Score = -1 <span className="validation-message"></span>
      </p>
      <DefaultSVG />
    </div>
  );
}
