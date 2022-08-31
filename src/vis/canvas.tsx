import * as React from "react";
import Input from "../IO/input_read";
import INFO from "../basis/load_info";
import Output from "../IO/output_read";
import IgnoreStyle from "./ignore_style";
import ColorPalette from "./color_palette";
import DefaultCanvas from "./default_canvas";

function Rect(props: { y: number; x: number; sz: number }) {
  const [style, setStyle] = React.useState<string>("white");
  function f(
    event: React.MouseEvent<SVGRectElement, MouseEvent> | React.TouchEvent<SVGRectElement>
  ) {
    console.log("#");
    setStyle("gray");
  }
  return (
    <rect
      x={props.sz * props.x}
      y={props.sz * props.y}
      width={props.sz}
      height={props.sz}
      fill={style}
      stroke="gray"
      strokeWidth="2"
      onTouchStart={f}
      onMouseDown={f}
    />
  );
}

function Title(props: { y: number; x: number }) {
  return (
    <title>
      y:{props.y} x:{props.x}
    </title>
  );
}

export default function Canvas(props: { input_data: string; output_data: string }) {
  console.log("Canvas");
  if (props.input_data === "" && props.output_data === "") {
    return <DefaultCanvas />;
  }

  let input: Input;
  let output: Output;
  try {
    input = new Input(props.input_data);
    output = new Output(props.output_data);
  } catch (e) {
    return <DefaultCanvas />;
  }

  const cells: JSX.Element[] = [];
  const sz = INFO.canvas_size / input.N;
  for (let y = 0; y < input.N; y++) {
    for (let x = 0; x < input.N; x++) {
      const cell = input.grid[y][x];
      if (cell.c > 0) {
        cells.push(
          <g key={`${y}-${x}`}>
            <Title y={y} x={x} />
            <Rect y={y} x={x} sz={sz} />
            <circle
              cx={sz * (x + 0.5)}
              cy={sz * (y + 0.5)}
              r={(sz / 2) * 0.8}
              fill={ColorPalette[cell.c]}
              style={IgnoreStyle}
            />
            <text
              x={sz * (x + 0.5)}
              y={sz * (y + 0.5)}
              textAnchor="middle"
              alignmentBaseline="middle"
              fontSize={`${sz / 2}px`}
              style={IgnoreStyle}
            >
              {cell.v}
            </text>
          </g>
        );
      } else {
        cells.push(
          <g key={`${y}-${x}`}>
            <Title y={y} x={x} />
            <Rect y={y} x={x} sz={sz} />
          </g>
        );
      }
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
