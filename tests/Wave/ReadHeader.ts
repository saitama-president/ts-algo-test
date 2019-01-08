import {describe,it} from "mocha"
import * as mocha from "mocha"
import {assert} from "chai"
import * as dotenv from "dotenv";
import Wave from "../../Wave/Wave";
import * as fs from "fs"


//dotenv.config();
//describe(
//"WaveParserのテスト",()=>{
//  it("サンプルWavファイルを読み込む",
//    ()=>{
    fs.createReadStream(__dirname+"/../../sample-data/test-out.wav",{
      encoding:'binary',
      start:0

    })
    .pipe(Wave.Parser())
    .pipe(fs.createWriteStream("/dev/null"));
//    assert(true);
    
//  });

//});



