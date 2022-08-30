// https://github.com/kmyk/longcontest-visualizer-framework/blob/master/index.ts
export default class FileParser {
  private filename: string;
  private content: string[][];
  private y: number;
  private x: number;

  constructor(filename: string, content: string) {
    this.filename = filename;
    this.content = [];
    for (const line of content.split("\n")) {
      const words = line.trim().split(new RegExp("\\s+"));
      this.content.push(words);
    }
    this.y = 0;
    this.x = 0;
  }

  public isEmpty(): boolean {
    return this.content.length === 1 && this.content[0].length === 1 && this.content[0][0] === "";
  }
  public getWord(): string {
    if (this.content.length <= this.y) {
      this.reportError("a word expected, but EOF");
    }
    if (this.content[this.y].length <= this.x) {
      this.reportError("a word expected, but newline");
    }
    const word = this.content[this.y][this.x];
    this.x += 1;
    return word;
  }
  public getInt(): number {
    const word = this.getWord();
    if (!word.match(new RegExp("^[-+]?[0-9]+$"))) {
      this.reportError(`a number expected, but word ${this.content[this.y][this.x]}`);
    }
    return parseInt(word);
  }
  public getNewline() {
    if (this.content.length <= this.y) {
      this.reportError("newline expected, but EOF");
    }
    if (this.x < this.content[this.y].length) {
      this.reportError(`newline expected, but word ${this.content[this.y][this.x]}`);
    }
    this.x = 0;
    this.y += 1;
  }

  public isEOF(): boolean {
    while (this.y < this.content.length) {
      while (this.x < this.content[this.y].length) {
        const word = this.getWord();
        if (word != "") {
          this.reportError(`EOF expected, but word ${this.content[this.y][this.x]}`);
          return false;
        }
      }
      this.getNewline();
    }
    return true;
  }
  public unwind() {
    if (this.x === 0) {
      this.y -= 1;
      this.x = this.content[this.y].length - 1;
    } else {
      this.x -= 1;
    }
  }
  public reportError(msg: string) {
    msg = `${this.filename}: line ${this.y + 1}: ${msg}`;
    alert(msg);
    throw new Error(msg);
  }
}
