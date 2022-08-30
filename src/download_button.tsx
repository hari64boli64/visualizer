import * as React from "react";
import Button from "@mui/material/Button";
import { canvas_size } from "./canvas";

function download_func() {
  // https://stackoverflow.com/questions/23218174/how-do-i-save-export-an-svg-file-after-creating-an-svg-with-d3-js-ie-safari-an
  // https://stackoverflow.com/questions/32230894/convert-very-large-svg-to-png-using-canvas
  const svg = document.getElementById("vis_svg");
  if (svg === null) {
    alert("svg is null");
    return;
  }
  const serializer = new XMLSerializer();
  let source = serializer.serializeToString(svg);
  source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
  const url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
  const img = new Image();
  img.width = canvas_size;
  img.height = canvas_size;
  img.src = url;
  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas_size;
    canvas.height = canvas_size;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.drawImage(img, 0, 0, canvas_size, canvas_size);
    URL.revokeObjectURL(url);
    const canvasdata = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.download = "export_" + Date.now() + ".png";
    a.href = canvasdata;
    a.click();
    a.remove();
  };
}

export default function DownloadButton() {
  return (
    <div>
      <Button onClick={download_func}>download</Button>
    </div>
  );
}
