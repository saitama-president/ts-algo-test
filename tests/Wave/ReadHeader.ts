import Wave from "../../Wave/Wave";
import * as fs from "fs"

var parser=Wave.Parser();



process.stdin
.pipe(Wave.Parser())
.pipe(Wave.Changer())
.pipe(process.stdout);