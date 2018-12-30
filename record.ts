import * as  record from "node-record-lpcm16";
import * as fs from "fs"



var file = fs.createWriteStream(
  'test.wav',
  {
    encoding: 'binary' 
  }
);

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

record.start({
  sampleRate : 44100,
//  verbose : true
})
.pipe(file);
