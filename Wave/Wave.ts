import * as fs from "fs"

export default class Wave{


  public static Creator():WaveCreator{
    return new WaveCreator();
  }
}

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


class WaveCreator{

  public option;

  public constructor(option?:{
    channels:1,
    sampling_rate:44100,
  }){
    this.option=option;
  }


  public Write(fileName:string){
    var out:fs.WriteStream=fs.createWriteStream(fileName,'binary');
    
    this.writeHeader(out);
    this.writeBody(out,523.251);
    this.writeBody(out,587.330);
    this.writeBody(out,659.255);
    this.writeBody(out,698.456);
    this.writeBody(out,783.99);
    this.writeBody(out,880);

    out.close();
  }

  private writeHeader(stream:fs.WriteStream){
    var header=Buffer.alloc(48,0xff,'binary');

    header.write("RIFF",0,4,'binary');
    header.writeUInt32LE( 0xFFFFFFFF -8,4);
    header.write("WAVE",8,4,'binary');
    header.write("fmt ",12,4,'binary');
    header.writeUInt32LE(16,16);//サブチャンクサイズ。16固定
    header.writeUInt16LE(1,20);//サウンドフォーマット：1固定

    //チャンネル数
    header.writeUInt16LE(1,22);//チャンネル数
    
    header.writeUInt32LE(44100,24);//サンプリングレート
    header.writeUInt32LE((44100*16) >>3,28);//データの長さ
    header.writeUInt16LE(2,32);//1単位あたりのバイト数
    header.writeUInt16LE(16,34);//サンプリングビット数

    //dataチャンク
    
    header.write("data",36,4,'binary');
    header.writeUInt32LE(0xFFFFFFFF -40,40);//データの長さ
    
    
    stream.write(header,'binary');

    return;
  }

  private writeBody(stream:fs.WriteStream,hz:number=440){
    const sample=44100;
    var buff=Buffer.alloc(sample*2,null,'binary');
    var signalLength:number=sample/hz;
    var signalHz:number=sample / hz;
    var signalHalf=signalHz/2.0;

    for(var x=0;x<sample;x++){
      
      //var y =Math.round(Math.sin(Math.PI*2 * 
      //(x/signalHalf)
      //)*0x7FFF);

      var y =Math.round(
        Math.sin(
          Math.PI*2 
          * (x/signalLength)
          )
        *0x7FFF);

      buff.writeInt16LE(y,x<<1);
      /*
      if(sigMod==0){
        buff.writeInt16LE(0x7FFF,i<<1);
      }else{
        buff.writeInt16LE(signalInt16 ,i<<1);
      }*/
    }

    stream.write(buff);
  }

}