import * as React from "react";
import { Box, InputAdornment } from "@mui/material";
import { MyTextFieldViolet, MyTextFieldPurple } from "./canvas_util";
import Input from "../IO/input_read";
import getInputVariables from "../IO/input_variables";

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
      {getInputVariables(props.input).map((info, idx) => {
        return (
          <MyTextFieldPurple
            InputProps={{
              startAdornment: <InputAdornment position="start">{info.id}</InputAdornment>,
            }}
            key={info.id}
            value={info.value}
            size="small"
          />
        );
      })}
    </Box>
  );
}
