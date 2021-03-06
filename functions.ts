export function squareWalk(
  input: number[],
  rowBeginfunc: (
    y: number
  ) => void
    = (y) => console.log(`BEGIN[${y}]`)
  , cellfunc: (
    x: number,
    y: number,
  ) => void
    = (x, y) => console.log(`[${x}:${y}]`)
  ,
  rowEndfunc: (
    y: number
  ) => void
    = (y) => console.log(`END[${y}]`)
) {
  
  input.forEach((D: number, Y) => {
    rowBeginfunc(Y);
    input.forEach((D: number, X) => {
      cellfunc(X, Y);
    });
    rowEndfunc(Y)
  });

}

export function wavFile2array(filepath:string){

}

