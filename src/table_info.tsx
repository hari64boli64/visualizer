import React from "react";
import Input from "./IO/input_read";
import TableCell from "@mui/material/TableCell";
import { HeadCell, ContainerProblemInfoTableCells } from "./basis/container_table_info";

export const headCells: readonly HeadCell[] = [
  {
    id: "seed",
    disablePadding: true,
    label: "seed",
  },
  {
    id: "N",
    disablePadding: false,
    label: "N (grid size)",
  },
  {
    id: "C",
    disablePadding: false,
    label: "C (num of colors)",
  },
  {
    id: "P",
    disablePadding: false,
    label: "P (cross penalty)",
  },
];

export function ProblemInfoTableCells(props: {
  input: Input;
  labelId: string;
  isItemSelected: boolean;
  handleClick: (event: React.MouseEvent<unknown>, seed: number) => void;
}) {
  return (
    <ContainerProblemInfoTableCells {...props}>
      <TableCell key="N">{props.input.N}</TableCell>
      <TableCell key="C">{props.input.C}</TableCell>
      <TableCell key="P">{props.input.P}</TableCell>
    </ContainerProblemInfoTableCells>
  );
}
