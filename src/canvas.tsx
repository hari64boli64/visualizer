import * as React from "react";

export default function Canvas(props: { input_data: string; output_data: string }) {
  console.log("canvas");
  const x: number = Math.random() * 100;
  const y: number = Math.random() * 100;
  return (
    <svg style={{ border: "1px solid" }}>
      <polygon
        points={`${x} ${y - 20}, ${x + 20} ${y}, ${x} ${y + 20}, ${x - 20} ${y}`}
        fill="#99f"
      />
    </svg>
  );
}
