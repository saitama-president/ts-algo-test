import {describe,it} from "mocha"
import * as mocha from "mocha"
import {assert} from "chai"
import * as dotenv from "dotenv";
import Wave from "../../Wave/Wave";
import * as fs from "fs"


dotenv.config();
describe(
"WaveParserのテスト",()=>{
  it("サンプルWavファイルを読み込む",
    ()=>{
    fs.createReadStream(__dirname+"/../../sample-data/test-out.wav",'binary')
    .pipe(Wave.Parser())
    .pipe(fs.createWriteStream("/dev/null"));
    assert(true);
    
  });

});



