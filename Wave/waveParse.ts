import * as fs from "fs"
import * as FT from "../fourier"



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
        chunk_size: buff.readUInt32LE(4),
        format: buff.slice(8, 12).toString(),
        subchunk_type: buff.slice(12, 16).toString(),
        subchunk_size: buff.readUInt32LE(16),
        sound_format: buff.readUInt16LE(20),
        channels: buff.readInt16LE(22),
        sampling_rate: buff.readInt32LE(24),
        data_speed: buff.readInt32LE(28),
        sampling_block_bytes: buff.readInt16LE(32),
        sampling_bit: buff.readInt16LE(34),
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
      floats[i]=buff.readInt16LE(index)/(1<<15);
      
    }

    FT.fourier(
      floats.slice(
        9980,
        9980+(floats.length>>9)
        )
    );
        
    console.log("wav done");
  });
}

console.log(process.argv);

readHeader(file,readBody);

