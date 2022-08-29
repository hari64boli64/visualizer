import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Input from "@mui/material/Input";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Copyright from "./copyright";
import Canvas from "./canvas";
import { getInputFromSeed, one_indexed } from "./input";

export default function Visualizer() {
  const first_index = one_indexed ? 1 : 0;

  const [seed, setSeed] = React.useState<number>(first_index);
  const [input_data, setInput] = React.useState<string>(getInputFromSeed(first_index));
  const [output_data, setOutput] = React.useState<string>("");

  function onChangeSeed(e: React.ChangeEvent<HTMLInputElement>) {
    const new_seed = parseInt(e.currentTarget.value, 10);
    setSeed(new_seed);
    setInput(getInputFromSeed(new_seed));
  }
  function onChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    console.log("input change");
    setInput(e.currentTarget.value);
  }
  function onChangeOutput(e: React.ChangeEvent<HTMLInputElement>) {
    console.log("output change");
    setOutput(e.currentTarget.value);
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <article>
          <h1>Visualizer</h1>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "45%" },
            }}
            noValidate
            autoComplete="off"
            spellCheck="false"
          >
            <FormControl>
              <InputLabel htmlFor="seed_input">Seed</InputLabel>
              <Input
                id="seed_input"
                type="number"
                inputProps={{ min: first_index.toString(), max: "1000" }}
                value={seed}
                onChange={onChangeSeed}
                sx={{ m: 1, width: "25ch" }}
              />
            </FormControl>
            <div className="testcase-section">
              <TextField
                id="input_textfiled"
                label="Input"
                multiline
                rows={4}
                value={input_data}
                onChange={onChangeInput}
              />
              <TextField
                id="output_textfiled"
                label="Output"
                multiline
                rows={4}
                value={output_data}
                onChange={onChangeOutput}
              />
            </div>
          </Box>
          <hr></hr>
          <p>
            Score = -1 <span className="validation-message"></span>
          </p>
          <Canvas input_data={input_data} output_data={output_data} />
        </article>
      </Paper>
      <Copyright sx={{ pt: 4 }} />
    </Container>
  );
}
