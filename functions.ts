
/**
 * O^2 を実行する
 * @param input 
 * @param rowBeginfunc 
 * @param cellfunc 
 * @param rowEndfunc 
 */
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
/**
 * O / N * N を実行する（折りたたみ繰り返し）
 */
export function foldingWalk(
  input:number[],
  foldSize:number,
  rowBeginfunc:(y:number)=>void,
  cellfunc:(x:number,y:number)=>void,
  rowEndfunc:(y:number)=>void
){

  for(var i=0,Y=0;i<input.length;i+=foldSize,Y++){
    rowBeginfunc(Y);
    for(var X=0;X<foldSize;X++){
      cellfunc(X,Y);
    }
    rowEndfunc(Y);
  }
}
