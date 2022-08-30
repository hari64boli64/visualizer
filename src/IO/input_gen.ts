import input_0001 from "../input_ts/1";
import input_0002 from "../input_ts/2";
import input_0003 from "../input_ts/3";
import input_0004 from "../input_ts/4";
import input_0005 from "../input_ts/5";
import input_0006 from "../input_ts/6";
import input_0007 from "../input_ts/7";
import input_0008 from "../input_ts/8";
import input_0009 from "../input_ts/9";
import input_0010 from "../input_ts/10";
import Input from "./input_read";

const inputs_raw: string[] = [
  input_0001,
  input_0002,
  input_0003,
  input_0004,
  input_0005,
  input_0006,
  input_0007,
  input_0008,
  input_0009,
  input_0010,
];

const inputs: Input[] = inputs_raw.map((input_raw: string) => new Input(input_raw));

// seedが1-indexedかどうか
const one_indexed = true;

function getInputFromSeed(seed: number): string {
  if (one_indexed) seed--;
  if (!(0 <= seed && seed < inputs_raw.length)) {
    return "(out of bound)";
  } else {
    return inputs_raw[seed];
  }
}

export { inputs, getInputFromSeed, one_indexed };
