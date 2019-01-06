import Wave from "./Wave/Wave";

// Wave.Creator().Write("test-out.wav");


var total=0;

function Gain(v){

}
function capInt16(v):number{
  return v< -0x7FFF 
    ? -0x7FFF
    : 0x7FFF < v 
      ? 0x7FFF
      :v;
}

var last:number=0;

process.stdin.on("data",(chunk:Buffer|string|any)=>{
  var buff:Buffer =Buffer.from(chunk,'binary');
  var offset=0;

  if(total<44){
    total+=44;
    offset+=44;    
  }

  for(var i=offset;i<buff.length;i+=2){
    var vol:number= buff.readInt16LE(i);

    last=(last*0.8)+(vol*0.2);

    buff.writeInt16LE(capInt16(last*1) ,i);
  }

  process.stdout.write(buff);
});
process.stdin.on("end",()=>{
  console.log()
});
