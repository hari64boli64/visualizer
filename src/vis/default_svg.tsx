import * as React from "react";
import INFO from "../basis/load_info";

type Props = {
  children?: JSX.Element;
};
const DefaultSVG = ({ children }: Props) => {
  return (
    <svg
      id="vis_svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${INFO.canvas_size} ${INFO.canvas_size}`}
      style={{
        maxWidth: "500px",
        maxHeight: "500px",
        border: "1px solid",
      }}
    >
      {children}
    </svg>
  );
};

export default DefaultSVG;
