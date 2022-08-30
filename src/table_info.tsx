import React from "react";
import Input from "./IO/input_read";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";

interface HeadCell {
  disablePadding: boolean;
  id: keyof Input;
  label: string;
}

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
    <TableRow
      hover
      onClick={(event) => props.handleClick(event, props.input.seed)}
      role="checkbox"
      aria-checked={props.isItemSelected}
      tabIndex={-1}
      selected={props.isItemSelected}
    >
      <TableCell padding="checkbox" key="checkbox">
        <Checkbox
          color="primary"
          checked={props.isItemSelected}
          inputProps={{
            "aria-labelledby": props.labelId,
          }}
        />
      </TableCell>
      <TableCell component="th" id={props.labelId} scope="row" key="seed">
        {props.input.seed}
      </TableCell>
      <TableCell key="N">{props.input.N}</TableCell>
      <TableCell key="C">{props.input.C}</TableCell>
      <TableCell key="P">{props.input.P}</TableCell>
    </TableRow>
  );
}
