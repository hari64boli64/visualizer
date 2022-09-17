import Input from "./input_read";

interface VariableInfo {
  id: keyof Input;
  description: string;
  value: number;
}

export default function getInputVariables(input?: Input): VariableInfo[] {
  return [
    { id: "N", description: "grid size", value: input ? input.N : -1 },
    { id: "C", description: "num of colors", value: input ? input.C : -1 },
    { id: "P", description: "cross penalty", value: input ? input.P : -1 },
  ];
}
