import * as fs from "fs";
import * as FT from "../fourier";
import * as child_process from "child_process";
import { Transform, Readable } from "stream";
import { SIGHUP } from "constants";

export default class WaveChanger extends Transform {
  public constructor(options?: {}) {
    super();
  }

  public transform(chunk: Buffer, encoding: string, next: () => void) {
    //console.log(chunk.length);
    //console.error("_T_");
    this.push(chunk, "binary");

    next();
  }

  public flush(next: () => void) {
    console.error("_CHANGE_F_");
    next();
  }
  public _transform(chunk: Buffer, encoding: string, next: () => void) {
    this.transform(chunk, encoding, next);
  }

  public _flush(next: () => void) {
    this.flush(next);
  }
}
