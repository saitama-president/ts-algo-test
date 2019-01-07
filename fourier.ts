import { squareWalk,foldingWalk } from "./functions";

export interface fourierResult{
  [key:number]:{
    real:number,
    imaginal:number
  }
}

export function FullFourier(input: number[]):fourierResult{
  const markStart = Date.now();

  var N: number = input.length ;
  let real: number = 0;
  let imaginal: number = 0;

  var cost: number = 0;
  const notch:number=2 * Math.PI/N;

  var result:fourierResult={};

  squareWalk(input,
    y => {
      real = 0;
      imaginal = 0;
    },
    (x, y) => {
      let r=notch * x*y;
      real += input[x] * Math.cos(r);
      imaginal -= input[x] * Math.sin(r);
      cost++;
    },
    y => {
      result[y]={
        real:real,
        imaginal:imaginal
      };
    }
  );
//  console.error(`TOTAL COST = ${cost}`);
//  console.error(`TIME = ${Date.now() - markStart}msec`);
  return result;
};


export function FastFourier(input: number[], sample_count: number = 256):
fourierResult[] 
{
  var result:fourierResult[]=[];
  var buff:number[]=[];


  foldingWalk(input,sample_count,
      y=>{
        buff=[];
      },
      (x,y)=>{
        var index=x+(y*sample_count);
/*        if(!input[index]){
          console.error(`undef X=${x} Y=${y} ${x+(y*sample_count)}`);
        }
*/        
        buff.push(input[index]?input[index]:0)
      },
      y=>{
        result.push(FullFourier(buff));
        //足す
      //  console.log(`${y}:PUSH ${buff.length}`);
      //  console.error(buff);
      }
    );

  return result;
}
