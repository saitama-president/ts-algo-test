import * as fs from "fs";
import * as FT from "../fourier";
import { Transform, Readable } from "stream";

//13バイト目から24バイト
interface FormatChunk {
  chunkID: string; //string4
  chunkSize: number; //long
  wFormatTag: number; //short
  wChannels: number; //short
  dwSamplesPerSec: number; //long
  dwAvgBytesPerSec: number; //long
  wBlockAlign: number; //short
  wBitsPerSample: number; //short
}

interface WAVEFORMATEX {
  wFormatTag: number; //uint16
  nChannels: number; //uint16
  nSamplesPerSec: number; //uint32 ;
  nAvgBytesPerSec: number; //uint32 ;
  nBlockAlign: number; //uint16 ;
  wBitsPerSample: number; //uint16 ;
  cbSize: number; //uint16 ; ;
}

interface WAVEFORMATEXTENSIBLE {
  Format: WAVEFORMATEX;
  wValidBitsPerSample: number; //int16
  wSamplesPerBlock: number; //int16
  wReserved: number; //int16

  dwChannelMask: number; //int16
  SubFormat: number;
}

export default class WaveParser extends Transform {
  private header: FormatChunk = undefined;
  private parseSetting: {} = {};

  public constructor(
    options: {
      second: number;
    } = {
      second: 0.1
    }
  ) {
    super();
  }

  public transform(chunk: Buffer, encoding: string, next: () => void) {
    var offset = 0;
    var floats: number[] = [];
    if (!this.header) {
      this.header = this.readFormatChunk(chunk.slice(12, 12 + 24));
      console.error(this.header);
      offset = 40;
    }
    //以下　読み取り

    for (var i = offset; 
          i < chunk.length; 
          i += this.header.wBlockAlign
      ) {
        switch(this.header.wBitsPerSample){
        }
      //switch(this.he);
      var vol:number=
      {
        8:chunk.readInt8(i)/ (1 << 7),
        16:chunk.readInt16LE(i) / (1 << 15),
        32:chunk.readInt32LE(i) / (1 << 31)
      }[this.header.wBitsPerSample];
      floats.push(vol);
    }
    var result: FT.fourierResult[] = FT.FastFourier(floats);

    /**
     * 結果をどう解析するか　ここから
     * 
     * 
     * 
     * 
     */

    this.push(chunk, "binary");
    return next();
  }

  //最後に呼ばれる
  public flush(next: () => void) {
    return next();
  }
  public _transform(chunk: Buffer, encoding: string, next: () => void) {
    return this.transform(chunk, encoding, next);
  }

  public _flush(next: () => void) {
    console.error("_PARSE_F_");
    return this.flush(next);
  }

  private readFormatChunk(buff: Buffer): FormatChunk {
    return {
      chunkID: buff.slice(0, 4).toString(), //string4
      chunkSize: buff.readUInt32LE(4), //long
      wFormatTag: buff.readUInt16LE(8), //short > 20  2
      wChannels: buff.readUInt16LE(10), //short > 2
      dwSamplesPerSec: buff.readUInt32LE(12), //long >4
      dwAvgBytesPerSec: buff.readUInt32LE(16), //long > 4
      wBlockAlign: buff.readUInt16LE(20), //short > 2
      wBitsPerSample: buff.readUInt16LE(22) //short >2
    };
  }
}
