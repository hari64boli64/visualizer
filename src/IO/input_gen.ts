import Input from "./input_read";
import INFO from "../basis/util/load_info";

// 問題に応じて変更する
function makePath(seed: number) {
  return `./input/${seed}.in`;
}

async function getInputFromSeed(seed: number, log = true) {
  if (
    !((INFO.one_indexed ? 1 : 0) <= seed && seed < INFO.inputs_num + (INFO.one_indexed ? 1 : 0))
  ) {
    return "(out of bound)";
  } else {
    let response = await fetch(makePath(seed));
    if (response.ok) {
      if (log) console.log("[getInputFromSeed] response ok");
      return response.text();
    } else {
      throw new Error("[getInputFromSeed] response error");
    }
  }
}

async function getInputs(): Promise<Input[]> {
  console.log("getInputs");
  const promises: Promise<Input>[] = [];
  for (let idx = 0; idx < INFO.inputs_num; idx++) {
    const seed = idx + (INFO.one_indexed ? 1 : 0);
    promises.push(
      new Promise(function (resolve, reject) {
        getInputFromSeed(seed, false)
          .then((response) => resolve(new Input(response, seed)))
          .catch((error) => reject(error.response.status));
      })
    );
  }
  return Promise.all(promises);
}

export { getInputFromSeed, getInputs };
