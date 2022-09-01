import * as React from "react";
import INFO from "../basis/load_info";
import Input from "../IO/input_read";
import Output from "../IO/output_read";
import IgnoreStyle from "./ignore_style";
import ColorPalette from "./color_palette";
import DefaultCanvas from "./default_canvas";
import DefaultSVG from "./default_svg";

function VisInfo(props: { score: number }) {
  return (
    <p>
      Score = {props.score} <span className="validation-message"></span>
    </p>
  );
}

interface CellInfo {
  r: number;
  c: number;
  setStyle: React.Dispatch<React.SetStateAction<string>>;
}

function Title(props: { y: number; x: number }) {
  return (
    <title>
      y:{props.y} x:{props.x}
    </title>
  );
}

function VisSVG(props: { input: Input; output: Output }) {
  const sz = INFO.canvas_size / props.input.N;
  const _cells: JSX.Element[] = [];
  for (let y = 0; y < props.input.N; y++) {
    for (let x = 0; x < props.input.N; x++) {
      const cell = props.input.grid[y][x];
      _cells.push(
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
  const _paths: JSX.Element[] = [];
  props.output.pipes.forEach((pipe) => {
    let str = "M ";
    pipe.forEach((p) => {
      str += `${(p.c + 0.5) * sz},${(p.r + 0.5) * sz} `;
    });
    _paths.push(
      <path
        d={str}
        key={`${pipe[0].r}-${pipe[0].c}`}
        fill="none"
        stroke={ColorPalette[firstC as number]}
        strokeOpacity="0.3"
        strokeWidth={sz * 0.8}
        strokeLinecap="round"
        style={IgnoreStyle}
      />
    );
  });

  const [score, setScore] = React.useState<number>(0);
  const [paths, setPaths] = React.useState<JSX.Element[]>(_paths);
  const [cells] = React.useState<JSX.Element[]>(_cells);

  const cellInfos: CellInfo[] = [];
  let firstC: number | undefined = undefined;
  let firstV: number | undefined = undefined;

  function fill(color: string = "white") {
    if (color !== "white") {
      console.log("white");
      cellInfos.forEach((cell) => {
        cell.setStyle("white");
      });
      let str = "M ";
      cellInfos.forEach((cell) => {
        str += `${(cell.c + 0.5) * sz},${(cell.r + 0.5) * sz} `;
      });
      console.log(cellInfos);
      const newPath = (
        <path
          d={str}
          key={`${cellInfos[0].r}-${cellInfos[0].c}`}
          fill="none"
          stroke={ColorPalette[firstC as number]}
          strokeOpacity="0.3"
          strokeWidth={sz * 0.8}
          strokeLinecap="round"
          style={IgnoreStyle}
        />
      );
      setPaths((path) => [...path, newPath]);
    } else {
      console.log(color);
      cellInfos.forEach((cell) => {
        cell.setStyle(color);
      });
    }
    cellInfos.length = 0;
    firstC = undefined;
    firstV = undefined;
  }

  function onRectClicked(
    r: number,
    c: number,
    setStyle: React.Dispatch<React.SetStateAction<string>>
  ) {
    if (cellInfos.length === 0) {
      if (props.input.grid[r][c].c === 0) {
        alert("choice colored cell");
        fill();
      } else {
        setStyle("gray");
        cellInfos.push({ r, c, setStyle });
        firstC = props.input.grid[r][c].c;
        firstV = props.input.grid[r][c].v;
      }
    } else {
      const lastRC = cellInfos.slice(-1)[0];
      if (Math.abs(lastRC.r - r) + Math.abs(lastRC.c - c) !== 1) {
        alert("far from last RC");
        fill();
      } else {
        if (props.input.grid[r][c].c === 0) {
          setStyle("gray");
          cellInfos.push({ r, c, setStyle });
        } else if (props.input.grid[r][c].c !== firstC) {
          alert("different color from first");
          fill();
        } else {
          if (!firstV) {
            alert("AssertionError");
            return -1;
          }
          setScore((score) => {
            return score + (firstV as number) * props.input.grid[r][c].v;
          });
          cellInfos.push({ r, c, setStyle });
          fill(ColorPalette[firstC]);
        }
      }
    }
  }

  function Rect(props: { y: number; x: number; sz: number }) {
    const [style, setStyle] = React.useState<string>("white");
    return (
      <rect
        x={props.sz * props.x}
        y={props.sz * props.y}
        width={props.sz}
        height={props.sz}
        fill={style}
        stroke="gray"
        strokeWidth="2"
        // onTouchStart={(event) => {
        //   event.preventDefault();
        //   onRectClicked(props.y, props.x, setStyle);
        // }}
        onClick={(event) => {
          event.preventDefault();
          onRectClicked(props.y, props.x, setStyle);
        }}
      />
    );
  }

  return (
    <>
      <VisInfo score={score} />
      <DefaultSVG>
        <>
          {cells}
          {paths}
        </>
      </DefaultSVG>
    </>
  );
}

export default function Canvas(props: { input_data: string; output_data: string }) {
  console.log("Canvas");

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

  return <VisSVG input={input} output={output} />;
}
