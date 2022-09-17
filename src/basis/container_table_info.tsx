import React from "react";
import Input from "../IO/input_read";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";

export interface HeadCell {
  id: keyof Input;
  disablePadding: boolean;
  label: string;
}

export function ContainerProblemInfoTableCells(props: {
  input: Input;
  labelId: string;
  isItemSelected: boolean;
  handleClick: (event: React.MouseEvent<unknown>, seed: number) => void;
  children: React.ReactNode;
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
      {props.children}
    </TableRow>
  );
}
