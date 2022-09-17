import React from "react";
import Input from "../IO/input_read";
import TableCell from "@mui/material/TableCell";
import { HeadCell, ContainerProblemInfoTableCells } from "./container_table_info";
import getInputVariables from "../IO/input_variables";

export const headCells: readonly HeadCell[] = [
  {
    id: "seed" as keyof Input,
    disablePadding: true,
    label: "seed",
  },
].concat(
  getInputVariables().map((element) => {
    return {
      id: element.id,
      disablePadding: false,
      label: element.id + " (" + element.description + ")",
    };
  })
);

export function ProblemInfoTableCells(props: {
  input: Input;
  labelId: string;
  isItemSelected: boolean;
  handleClick: (event: React.MouseEvent<unknown>, seed: number) => void;
}) {
  return (
    <ContainerProblemInfoTableCells {...props}>
      {getInputVariables(props.input).map((element) => {
        return <TableCell key={element.id}>{element.value}</TableCell>;
      })}
    </ContainerProblemInfoTableCells>
  );
}
