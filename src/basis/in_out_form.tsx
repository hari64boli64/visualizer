import * as React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CheckIcon from "@mui/icons-material/Check";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import INFO from "../basis/load_info";
import { getInputFromSeed } from "../IO/input_gen";

function OutputFileButton(props: { setRawOutput: any; setOutput: any }) {
  const [fileName, setFileName] = React.useState("");

  function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.currentTarget.files === null) {
      alert("no file");
      return;
    }
    const reader = new FileReader();
    reader.readAsText(event.currentTarget.files[0]);
    setFileName(event.currentTarget.files[0].name);
    reader.onloadend = () => {
      if (reader.result === "") {
        alert("no valid content");
      } else {
        props.setRawOutput(reader.result);
        props.setOutput(reader.result);
      }
    };
  }

  return (
    <>
      <Button variant="contained" component="label">
        Upload(Output)
        <input hidden type="file" onChange={onInputChange} />
      </Button>
      <span>&nbsp;{fileName}</span>
    </>
  );
}

export default function InOutForm(props: {
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setOutput: React.Dispatch<React.SetStateAction<string>>;
}) {
  const first_index = INFO.one_indexed ? 1 : 0;

  // this type should be <string> because the input can be "" (when deleteing the input)
  const [seed, setSeed] = React.useState<string>(first_index.toString());
  const [input_rawdata, setRawInput] = React.useState<string>("");
  const [output_rawdata, setRawOutput] = React.useState<string>("0");

  React.useEffect(() => {
    // https://reactjs.org/docs/hooks-reference.html#conditionally-firing-an-effect
    console.log("[InOutForm] first render");
    const f = async () => {
      const new_input = await getInputFromSeed(first_index);
      setRawInput(new_input);
      props.setInput(new_input);
      props.setOutput("0");
    };
    f();
    // https://zenn.dev/mackay/articles/1e8fcce329336d
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onChangeSeed(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.currentTarget.value === "") {
      setSeed("");
      return;
    }
    const new_seed = parseInt(e.currentTarget.value, 10);
    setSeed(new_seed.toString());
    const f = async () => {
      const new_input = await getInputFromSeed(new_seed);
      setRawInput(new_input);
      props.setInput(new_input);
      props.setOutput("0");
    };
    f();
  }
  function onChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    setRawInput(e.currentTarget.value);
  }
  function onChangeOutput(e: React.ChangeEvent<HTMLInputElement>) {
    setRawOutput(e.currentTarget.value);
  }
  function onButtonClicked(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
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
          onKeyDown={(event) => {
            // This func is necessary because this is MUI's Input, not the html input itself
            if (event.key === "Enter") event.preventDefault();
          }}
        />
      </FormControl>
      <Button variant="outlined" sx={{ m: 1 }} onClick={onButtonClicked} startIcon={<CheckIcon />}>
        OK
      </Button>
      <OutputFileButton setRawOutput={setRawOutput} setOutput={props.setOutput} />
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
