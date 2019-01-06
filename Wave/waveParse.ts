import * as fs from "fs"
import * as FT from "../fourier"
import * as child_process from "child_process"
import {Transform,Readable} from "stream"

//13バイト目から24バイト
interface FormatChunk{
  chunkID:string,//string4
  chunkSize:number,//long 
  wFormatTag:number,//short
  wChannels:number,//short
  dwSamplesPerSec:number,//long
  dwAvgBytesPerSec:number,//long
  wBlockAlign:number,//short
  wBitsPerSample:number, //short
} ;

interface WAVEFORMATEX{
    wFormatTag:number,//uint16
    nChannels:number,//uint16
    nSamplesPerSec:number,//uint32 ; 
    nAvgBytesPerSec:number,//uint32 ; 
    nBlockAlign:number,//uint16 ; 
    wBitsPerSample:number,//uint16 ;  
    cbSize:number,//uint16 ; ; 
}

interface WAVEFORMATEXTENSIBLE {
  Format:WAVEFORMATEX,
  wValidBitsPerSample:number,//int16
  wSamplesPerBlock:number,//int16
  wReserved:number,//int16

  dwChannelMask:number, //int16
  SubFormat:number
} 


export default class WaveParser extends Transform{ 
  private header:FormatChunk =undefined;

  public transform(chunk:Buffer, encoding:string, next:()=>void) {
    var offset =0;
    if(!this.header){
      this.header=this.readFormatChunk(chunk.slice(12,12+24));
      console.error(this.header);
      offset=40;
      //ここで解析条件を生成する
    }
    this.push(chunk,"binary");
    next();
  }

  public flush(next:()=>void) {
    next();
  }
  public _transform(chunk:Buffer, encoding:string, next:()=>void) {
    this.transform(chunk,encoding,next);
  }
 
  public _flush(next:()=>void) {
    this.flush(next);
  }


  
  private events:{
    [key:string]:()=>void
    }
  ={
    "e":()=>{},
    "a":()=>{},
  };


  private readFormatChunk(buff:Buffer):FormatChunk{
    return {
      chunkID:buff.slice(0,4).toString(),//string4
      chunkSize:buff.readUInt32LE(4),//long 
      wFormatTag:buff.readUInt16LE(8),//short
      wChannels:buff.readUInt16LE(10),//short
      dwSamplesPerSec:buff.readUInt32LE(12),//long
      dwAvgBytesPerSec:buff.readUInt32LE(16),//long
      wBlockAlign:buff.readUInt16LE(20),//short
      wBitsPerSample:buff.readUInt16LE(22), //short    
    };
  }

}
