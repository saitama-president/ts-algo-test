import { squareWalk } from "./functions";

//console.dir(fMath.cos(1));
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
  console.error(`TOTAL COST = ${cost}`);
  console.error(`TIME = ${Date.now() - markStart}msec`);
  return result;
};


export function fastFourier(input: number[], density: number = 0.1, filter: number = 10) {

}