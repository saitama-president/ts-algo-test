import { squareWalk } from "./functions";

//console.dir(fMath.cos(1));

export function fourier(input: number[],
  filter: number = 100) {

  const markStart = Date.now();
  var N: number = input.length ;
  let real: number = 0;
  let imaginal: number = 0;

  var cost: number = 0;
  const notch:number=2 * Math.PI/N;


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
      //console.log(`REAL=${real}`);
      //console.log(`IMAG=${imaginal}`);
    },
    y => {
      if (
        true ||
        real < -filter || filter < real
        || imaginal < -filter || filter < imaginal) {
        console.log(`${y} : ${real.toFixed(2)} : ${imaginal.toFixed(2)}`);
      }
    }
  );

  console.log(`TOTAL COST = ${cost}`);
  console.log(`TIME = ${Date.now() - markStart}msec`);
};

export function fastFourier(input: number[], density: number = 0.1, filter: number = 10) {

}
