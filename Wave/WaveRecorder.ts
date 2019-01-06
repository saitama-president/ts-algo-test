import * as fs from "fs"
import * as record from "node-record-lpcm16";

export default class WaveRecorder{
  public callback(err, resp, body) {
    if (err) console.error(err)
    console.log(body)
  }
/**
    sampleRate: 16000,
    channels: 1,
    compress: false,
    threshold: 0.5,
    thresholdStart: null,
    thresholdEnd: null,
    silence: '1.0',
    verbose: false,
    recordProgram: 'rec' */
//console.dir(record);
  public Start(option:{
    time:number
  }={
    time:5000
  }) {

    record.start({
      sampleRate : 44100,
    //  verbose : true
    }).pipe(
      process.stdout
    );

    setTimeout(() => {
      record.stop();
    },option.time);
  }
}



