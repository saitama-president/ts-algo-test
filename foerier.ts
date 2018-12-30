import { squareWalk } from "./functions";

export default function fourier( input : number[],filter:number = 300 ){

  var N:number = input.length;
  var re:number=0;
  var im:number=0;

  squareWalk(input,
      y=>{
        re=0;
        im=0;
      },
      (x,y)=>{
        re +=   input[x] * Math.cos( ( 2 * Math.PI * x * y ) / N );
        im += - input[x] * Math.sin( ( 2 * Math.PI * x * y ) / N );
      },
      y=>{
        if(re< -filter || filter < re 
          || im < -filter || filter < im){
          console.log(`${y} : ${re.toFixed(2)} : ${im.toFixed(2)}`);
        }

      }
      );
};


