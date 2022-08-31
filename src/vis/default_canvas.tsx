import * as React from "react";
import INFO from "../basis/load_info";

export default function DefaultCanvas() {
  console.log("Default Canvas");
  return (
    <div className="canvas_container">
      <p>
        Score = -1 <span className="validation-message"></span>
      </p>
      <svg
        id="vis_svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${INFO.canvas_size} ${INFO.canvas_size}`}
        style={{
          maxWidth: "500px",
          maxHeight: "500px",
          border: "1px solid",
        }}
      ></svg>
    </div>
  );
}
