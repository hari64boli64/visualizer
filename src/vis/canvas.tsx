import * as React from "react";
import INFO from "../basis/load_info";
import Input from "../IO/input_read";
import Output from "../IO/output_read";
import IgnoreStyle from "./ignore_style";
import ColorPalette from "./color_palette";
import DefaultCanvas from "./default_canvas";
import DefaultSVG from "./default_svg";
import ErrorBoundary from "../basis/error_boundary";
import CanvasVisInfo from "./canvas_vis_info";

// https://stackoverflow.com/questions/322378/javascript-check-if-mouse-button-down
let isMouseDown = false;
document.body.onmousedown = () => {
  isMouseDown = true;
};
document.body.onmouseup = () => {
  isMouseDown = false;
};

// because mouseup while alerting is not detectable
function myAlert(str: string) {
  isMouseDown = false;
  alert(str);
}

function Title(props: { y: number; x: number }) {
  return (
    <title>
      y:{props.y} x:{props.x}
    </title>
  );
}

interface CellInfo {
  r: number;
  c: number;
  setStyle: React.Dispatch<React.SetStateAction<string>>;
}

function VisSVG(props: { input: Input; output: Output }) {
  const sz = INFO.canvas_size / props.input.N;
  const _cells: JSX.Element[] = [];
  for (let y = 0; y < props.input.N; y++) {
    for (let x = 0; x < props.input.N; x++) {
      const cell = props.input.grid[y][x];
      _cells.push(
        <g key={`${y}-${x}`}>
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
  let _score = 0;
  const _paths: JSX.Element[] = [];
  props.output.pipes.forEach((pipe) => {
    let str = "M ";
    pipe.forEach((p) => {
      str += `${(p.c + 0.5) * sz},${(p.r + 0.5) * sz} `;
    });
    const score_diff =
      props.input.grid[pipe[0].r][pipe[0].c].v *
      props.input.grid[pipe[pipe.length - 1].r][pipe[pipe.length - 1].c].v;
    _score += score_diff;
    _paths.push(
      <path
        d={str}
        key={`${pipe[0].r}-${pipe[0].c}`}
        fill="none"
        stroke={ColorPalette[props.input.grid[pipe[0].r][pipe[0].c].c]}
        strokeOpacity="0.3"
        strokeWidth={sz * 0.8}
        strokeLinecap="round"
        onClick={(e: React.MouseEvent<SVGPathElement, MouseEvent>) => {
          e.currentTarget.remove();
          setScore((score) => score - score_diff);
        }}
      />
    );
  });

  const [score, setScore] = React.useState<number>(_score);
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
      const score_diff =
        (firstV as number) *
        props.input.grid[cellInfos[cellInfos.length - 1].r][cellInfos[cellInfos.length - 1].c].v;
      const newPath = (
        <path
          d={str}
          key={`${cellInfos[0].r}-${cellInfos[0].c}`}
          fill="none"
          stroke={ColorPalette[firstC as number]}
          strokeOpacity="0.3"
          strokeWidth={sz * 0.8}
          strokeLinecap="round"
          onClick={(e: React.MouseEvent<SVGPathElement, MouseEvent>) => {
            e.currentTarget.remove();
            setScore((score) => score - score_diff);
          }}
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
        isMouseDown = false;
        myAlert("choice colored cell");
        fill();
      } else {
        setStyle("gray");
        cellInfos.push({ r, c, setStyle });
        firstC = props.input.grid[r][c].c;
        firstV = props.input.grid[r][c].v;
      }
    } else {
      const lastRC = cellInfos.slice(-1)[0];
      if (lastRC.r === r && lastRC.c === c) return;
      if (Math.abs(lastRC.r - r) + Math.abs(lastRC.c - c) !== 1) {
        isMouseDown = false;
        myAlert("far from last RC");
        fill();
      } else {
        if (props.input.grid[r][c].c === 0) {
          setStyle("gray");
          cellInfos.push({ r, c, setStyle });
        } else if (props.input.grid[r][c].c !== firstC) {
          isMouseDown = false;
          myAlert("different color from first");
          fill();
        } else {
          if (!firstV) {
            isMouseDown = false;
            myAlert("AssertionError");
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
      <>
        <Title y={props.y} x={props.x} />
        <rect
          x={props.sz * props.x}
          y={props.sz * props.y}
          width={props.sz}
          height={props.sz}
          fill={style}
          stroke="gray"
          strokeWidth="2"
          onMouseDown={(event) => {
            event.preventDefault();
            onRectClicked(props.y, props.x, setStyle);
          }}
          onMouseEnter={(event) => {
            event.preventDefault();
            if (isMouseDown) {
              onRectClicked(props.y, props.x, setStyle);
            }
          }}
        />
      </>
    );
  }

  return (
    <>
      <CanvasVisInfo score={score} input={props.input} />
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

  return (
    <ErrorBoundary>
      <VisSVG input={input} output={output} />
    </ErrorBoundary>
  );
}
