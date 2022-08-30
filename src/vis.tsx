import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Canvas } from "./canvas";
import Copyright from "./copyright";
import DownloadButton from "./download_button";
import { getInputFromSeed, one_indexed } from "./input_gen";

function InOutForm(props: {
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setOutput: React.Dispatch<React.SetStateAction<string>>;
}) {
  const first_index = one_indexed ? 1 : 0;

  const [seed, setSeed] = React.useState<number>(first_index);
  const [input_rawdata, setRawInput] = React.useState<string>(getInputFromSeed(first_index));
  const [output_rawdata, setRawOutput] = React.useState<string>("");

  function onChangeSeed(e: React.ChangeEvent<HTMLInputElement>) {
    console.log("seed change");
    const new_seed = parseInt(e.currentTarget.value, 10);
    setSeed(new_seed);
    setRawInput(getInputFromSeed(new_seed));
  }
  function onChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    console.log("input change");
    setRawInput(e.currentTarget.value);
  }
  function onChangeOutput(e: React.ChangeEvent<HTMLInputElement>) {
    console.log("output change");
    setRawOutput(e.currentTarget.value);
  }
  function onButtonClicked(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    console.log("button clicked");
    props.setInput(input_rawdata);
    props.setOutput(output_rawdata);
  }

  return (
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
          sx={{ m: 1, width: "10ch" }}
        />
      </FormControl>
      <Button variant="outlined" sx={{ m: 1 }} onClick={onButtonClicked}>
        OK
      </Button>
      <div className="testcase-section">
        <TextField
          id="input_textfiled"
          label="Input"
          multiline
          rows={4}
          value={input_rawdata}
          onChange={onChangeInput}
        />
        <TextField
          id="output_textfiled"
          label="Output"
          multiline
          rows={4}
          value={output_rawdata}
          onChange={onChangeOutput}
        />
      </div>
    </Box>
  );
}

export default function Visualizer() {
  const [input_data, setInput] = React.useState<string>("");
  const [output_data, setOutput] = React.useState<string>("");

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <article>
          <h1>Visualizer</h1>
          <InOutForm setInput={setInput} setOutput={setOutput} />
          <hr></hr>
          <Canvas input_data={input_data} output_data={output_data} />
          <DownloadButton />
        </article>
      </Paper>
      <Copyright sx={{ pt: 4 }} />
    </Container>
  );
}
