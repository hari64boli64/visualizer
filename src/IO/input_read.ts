import FileParser from "./parser";

interface Cell {
  v: number;
  c: number;
}

export default class Input {
  public seed: number;
  public N: number;
  public C: number;
  public P: number;
  public grid: Cell[][];

  constructor(input_content: string, seed = -1) {
    this.seed = seed;
    const parser = new FileParser("input", input_content);
    this.N = parser.getInt();
    parser.getNewline();
    this.C = parser.getInt();
    parser.getNewline();
    this.P = parser.getInt();
    parser.getNewline();
    this.grid = new Array(this.N);
    for (let i = 0; i < this.N; i++) {
      this.grid[i] = new Array(this.N);
      for (let j = 0; j < this.N; j++) {
        const v = parser.getInt();
        const c = parser.getInt();
        parser.getNewline();
        this.grid[i][j] = { v: v, c: c };
      }
    }
    console.assert(parser.isEOF());
    if (seed === -1) {
      console.log("[input read] done");
    }
  }
}
