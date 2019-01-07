import {describe,it} from "mocha"
import * as mocha from "mocha"
import {assert} from "chai"
import * as dotenv from "dotenv";
import Wave from "../../Wave/Wave";
import * as fs from "fs"


dotenv.config();
/*
describe("TEST",()=>{
  it("IT",
    ()=>{

    assert(true);
    
  });

});
*/

process.stdin
.pipe(Wave.Parser())
//.pipe(Wave.Changer())
//.pipe(process.stdout)
.pipe(fs.createWriteStream("/dev/null"));