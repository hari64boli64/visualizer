import * as React from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Canvas from "../vis/canvas";
import Copyright from "./copyright";
import TweetButton from "./tweet_button";
import DownloadButton from "./download_button";
import InOutForm from "./in_out_form";

export default function Visualizer() {
  const [input_data, setInput] = React.useState<string>("");
  const [output_data, setOutput] = React.useState<string>("");

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }} elevation={10}>
        <article>
          <h1>Visualizer</h1>
          <InOutForm setInput={setInput} setOutput={setOutput} />
          <hr></hr>
          <Canvas input_data={input_data} output_data={output_data} />
          <Stack spacing={2} direction="row">
            <DownloadButton />
            <TweetButton />
          </Stack>
        </article>
      </Paper>
      <Copyright sx={{ pt: 4 }} />
    </Container>
  );
}
