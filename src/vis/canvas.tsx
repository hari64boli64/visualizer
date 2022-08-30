import * as React from "react";
import Input from "../IO/input_read";
import Output from "../IO/output_read";
import INFO from "../basis/load_info";

function DefaultCanvas() {
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

export default function Canvas(props: { input_data: string; output_data: string }) {
  console.log("Canvas");

  if (props.input_data === "" && props.output_data === "") {
    console.log("DefaultCanvas");
    return <DefaultCanvas />;
  }

  let input: Input;
  let output: Output;
  try {
    console.log(props.input_data);
    console.log(props.output_data);

    input = new Input(props.input_data);
    output = new Output(props.output_data);
  } catch (e) {
    console.log("DefaultCanvas");
    return <DefaultCanvas />;
  }

  const cells: JSX.Element[] = [];
  const sz = INFO.canvas_size / input.N;
  for (let i = 0; i < input.N; i++) {
    for (let j = 0; j < input.N; j++) {
      cells.push(
        <rect
          x={sz * i}
          y={sz * j}
          width={sz}
          height={sz}
          fill="skyblue"
          stroke="cadetblue"
          strokeWidth="2"
          key={`${i}-${j}`}
        />
      );
    }
  }

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
      >
        {cells}
      </svg>
    </div>
  );
}
