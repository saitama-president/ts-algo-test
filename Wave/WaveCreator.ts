import * as fs from "fs";

export default class WaveCreator {
  public option;

  public constructor(option?: { channels: 1; sampling_rate: 44100 }) {
    this.option = option;
  }

  public Write(fileName: string) {
    var out: fs.WriteStream = fs.createWriteStream(fileName, "binary");

    this.writeHeader(out);

    for (var oct = 0; oct < 3; oct++) {
      this.writeBody(out, 523.251 << oct);
      this.writeBody(out, 587.33 << oct);
      this.writeBody(out, 659.255 << oct);
      this.writeBody(out, 698.456 << oct);
      this.writeBody(out, 783.99 << oct);
      this.writeBody(out, 880 << oct);
      this.writeBody(out, 987.767 << oct);
      this.writeBody(out, 1046.502 << oct);
    }
    out.close();
  }

  private writeHeader(stream: fs.WriteStream) {
    var header = Buffer.alloc(48, 0xff, "binary");

    header.write("RIFF", 0, 4, "binary");
    header.writeUInt32LE(0xffffffff - 8, 4);
    header.write("WAVE", 8, 4, "binary");
    header.write("fmt ", 12, 4, "binary");
    header.writeUInt32LE(16, 16); //サブチャンクサイズ。16固定
    header.writeUInt16LE(1, 20); //サウンドフォーマット：1固定

    //チャンネル数
    header.writeUInt16LE(1, 22); //チャンネル数

    header.writeUInt32LE(44100, 24); //サンプリングレート
    header.writeUInt32LE((44100 * 16) >> 3, 28); //データの長さ
    header.writeUInt16LE(2, 32); //1単位あたりのバイト数
    header.writeUInt16LE(16, 34); //サンプリングビット数

    //dataチャンク

    header.write("data", 36, 4, "binary");
    header.writeUInt32LE(0xffffffff - 40, 40); //データの長さ

    stream.write(header, "binary");

    return;
  }

  private writeBody(stream: fs.WriteStream, hz: number = 440) {
    const sample = 44100;
    var buff = Buffer.alloc(sample * 2, null, "binary");
    var signalLength: number = sample / hz;

    console.log(`${hz}:${signalLength}`);

    for (var x = 0; x < sample; x++) {
      var y = Math.round(Math.sin(Math.PI * 2 * (x / signalLength)) * 0x7fff);

      buff.writeInt16LE(y, x << 1);
    }
    stream.write(buff);
  }
}
