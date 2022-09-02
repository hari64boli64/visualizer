import * as React from "react";
import { Box, InputAdornment } from "@mui/material";
import { MyTextFieldViolet, MyTextFieldPurple } from "./canvas_util";
import Input from "../IO/input_read";

export default function CanvasVisInfo(props: { score: number; input: Input }) {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "200px" },
      }}
      noValidate
      autoComplete="off"
    >
      <MyTextFieldViolet
        InputProps={{
          startAdornment: <InputAdornment position="start">score</InputAdornment>,
        }}
        key="score"
        value={props.score}
        color="warning"
        size="small"
      />
      {props.input.variables.map((info, idx) => {
        return (
          <MyTextFieldPurple
            InputProps={{
              startAdornment: <InputAdornment position="start">{info.name}</InputAdornment>,
            }}
            key={info.name}
            value={info.value}
            size="small"
          />
        );
      })}
    </Box>
  );
}
