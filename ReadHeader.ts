import { describe, it } from "mocha"
import * as mocha from "mocha"
import { assert } from "chai"
import * as dotenv from "dotenv";
import Wave from "./Wave/Wave";
import * as fs from "fs"

process.stdin
.pipe(Wave.Parser())
.pipe(fs.createWriteStream("/dev/null"));



