import * as React from "react";
import Input from "../IO/input_read";
import INFO from "../basis/load_info";
import Output from "../IO/output_read";
import IgnoreStyle from "./ignore_style";
import ColorPalette from "./color_palette";
import DefaultCanvas from "./default_canvas";

interface CellInfo {
  r: number;
  c: number;
  setStyle: React.Dispatch<React.SetStateAction<string>>;
}

class Ruler {
  public cells: CellInfo[] = [];
  public point: number = 0;
  private firstC?: number;
  private firstV?: number;
  private input?: Input;
  private setScore?: React.Dispatch<React.SetStateAction<number>>;

  constructor() {}

  setInput(input: Input, setScore: React.Dispatch<React.SetStateAction<number>>) {
    this.firstC = undefined;
    this.firstV = undefined;
    this.input = input;
    this.setScore = setScore;
  }

  fill(color: string = "white") {
    console.log(color);
    this.cells.forEach((cell) => {
      cell.setStyle(color);
    });
    this.cells.length = 0;
    this.firstC = undefined;
    this.firstV = undefined;
  }

  addCell(r: number, c: number, setStyle: React.Dispatch<React.SetStateAction<string>>) {
    if (this.input === undefined || this.setScore === undefined) {
      return;
    }
    if (this.cells.length === 0) {
      if (this.input.grid[r][c].c === 0) {
        alert("choice colored cell");
        this.fill();
      } else {
        setStyle("gray");
        this.cells.push({ r, c, setStyle });
        this.firstC = this.input.grid[r][c].c;
        this.firstV = this.input.grid[r][c].v;
      }
    } else {
      const lastRC = this.cells.slice(-1)[0];
      if (Math.abs(lastRC.r - r) + Math.abs(lastRC.c - c) !== 1) {
        alert("far");
        this.fill();
      } else {
        if (this.input.grid[r][c].c === 0) {
          setStyle("gray");
          this.cells.push({ r, c, setStyle });
        } else if (this.input.grid[r][c].c !== this.firstC) {
          alert("different from first");
          this.fill();
        } else {
          if (!this.firstV) {
            alert("AssertionError");
            return;
          }
          this.point += this.firstV * this.input.grid[r][c].v;
          this.setScore(this.point);
          this.cells.push({ r, c, setStyle });
          this.fill(ColorPalette[this.firstC]);
        }
      }
    }
  }
}
const ruler = new Ruler();

function VisInfo(props: { score: number }) {
  return (
    <p>
      Score = {props.score} <span className="validation-message"></span>
    </p>
  );
}

function Title(props: { y: number; x: number }) {
  return (
    <title>
      y:{props.y} x:{props.x}
    </title>
  );
}

function Rect(props: { y: number; x: number; sz: number }) {
  const [style, setStyle] = React.useState<string>("white");
  function onRectCliccked(
    event: React.MouseEvent<SVGRectElement, MouseEvent> | React.TouchEvent<SVGRectElement>
  ) {
    ruler.addCell(props.y, props.x, setStyle);
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
      onTouchStart={onRectCliccked}
      onMouseDown={onRectCliccked}
    />
  );
}

function VisSVG(props: {
  input: Input;
  output: Output;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}) {
  const cells: JSX.Element[] = [];
  const sz = INFO.canvas_size / props.input.N;

  for (let y = 0; y < props.input.N; y++) {
    for (let x = 0; x < props.input.N; x++) {
      const cell = props.input.grid[y][x];
      cells.push(
        <g key={`${y}-${x}`}>
          <Title y={y} x={x} />
          <Rect y={y} x={x} sz={sz} />
          {cell.c > 0 && (
            <>
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
            </>
          )}
        </g>
      );
    }
  }

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
      {cells}
    </svg>
  );
}

export default function Canvas(props: { input_data: string; output_data: string }) {
  console.log("Canvas");

  const [score, setScore] = React.useState<number>(0);

  if (props.input_data === "" && props.output_data === "") {
    return <DefaultCanvas />;
  }
  let input: Input, output: Output;
  try {
    input = new Input(props.input_data);
    output = new Output(props.output_data);
  } catch (e) {
    return <DefaultCanvas />;
  }

  ruler.setInput(input, setScore);

  return (
    <>
      <VisInfo score={score} />
      <VisSVG input={input} output={output} setScore={setScore} />
    </>
  );
}
