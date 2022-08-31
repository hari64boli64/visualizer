import FileParser from "./parser";
import RC from "./interface_RC";

export default class Output {
  public K: number;
  public pipes: RC[][];

  constructor(output_content: string) {
    const parser = new FileParser("output", output_content);
    this.K = parser.getInt();
    parser.getNewline();
    this.pipes = new Array(this.K);
    for (let i = 0; i < this.K; i++) {
      const M = parser.getInt();
      parser.getNewline();
      const cells: RC[] = new Array(M);
      for (let j = 0; j < M; j++) {
        const r = parser.getInt();
        const c = parser.getInt();
        parser.getNewline();
        cells[j] = { r: r, c: c };
      }
      this.pipes[i] = cells;
    }
    console.assert(parser.isEOF());
    console.log("[output read] done.");
  }
}
