import * as fs from "fs"
import foerier from "./foerier"



const file=process.argv[2];

interface waveFormat {
  chunk_type: string,
  chunk_size: number,
  format: string,
  subchunk_type: string,
  subchunk_size: number,
  sound_format: number,
  channels: number,
  sampling_rate: number,
  data_speed: number,
  sampling_block_bytes: number,
  sampling_bit: number,
  option_size: null,
  option_data: null,
  data_chunk: string,
  data_chunk_size: number,
};

function readHeader(
  fileName: string,
  next: (
    file_name: string,
    header: waveFormat
  ) => void
) {
  fs.createReadStream(
    fileName,
    {
      start: 0,
      end: 43,
      encoding: 'binary',
      highWaterMark: 44
    }
  )
    .on('data', (chunk) => {
      //console.log(chunk.length);
      var buff = Buffer.alloc(
        chunk.length, chunk,
        'binary');

      var header = {
        chunk_type: buff.slice(0, 4).toString(),
        chunk_size: buff.slice(4, 8).readUInt32LE(0),
        format: buff.slice(8, 12).toString(),
        subchunk_type: buff.slice(12, 16).toString(),
        subchunk_size: buff.slice(16, 20).readUInt32LE(0),
        sound_format: buff.slice(20, 22).readUInt16LE(0),
        channels: buff.slice(22, 24).readInt16LE(0),
        sampling_rate: buff.slice(24, 28).readInt32LE(0),
        data_speed: buff.slice(28, 32).readInt32LE(0),
        sampling_block_bytes: buff.slice(32, 34).readInt16LE(0),
        sampling_bit: buff.slice(34, 36).readInt16LE(0),
        option_size: null,
        option_data: null,
        data_chunk: buff.slice(36, 40).toString(),//data固定
        data_chunk_size:buff.readUInt32LE(40)//data固定

      }
      next(fileName, header);

    })
    .on("end", () => {
      console.log("END...");
    }
    )
    ;
}

function readBody(
  fileName: string,
  format: waveFormat) {
  console.log("wav reader!");
  fs.createReadStream(
    fileName,
    {
      start: 44,
      end:44+format.data_speed-1,//1秒
      encoding: 'binary',
      highWaterMark: format.data_speed
    }
  ).on("data",(chunk)=>{
    console.log(chunk.length);
    var buff = Buffer.alloc(
      chunk.length,
      chunk,
      'binary');
    console.log(format);
     console.log(chunk.length);
    
    let floats:number[]=new Array(format.sampling_rate);

    for(var i=0,index=0;
      i < format.sampling_rate;
      i++,index+=format.sampling_block_bytes){
      
      floats[i]=buff.readInt16LE(index) / (1<<15);
      
    }
    foerier(floats);
        
    console.log("wav done");
  });
}

console.log(process.argv);

readHeader(file,readBody);

