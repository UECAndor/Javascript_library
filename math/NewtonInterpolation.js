new function Interpolation (x, y, a, n) {
    //Declare and init variables
    var x = []
    var y = []
    var a = []
    var n = Number
    var f = []
    var i = 0
    var j = 0

        //Debug
        var x = [-1, 0, 1,3];
        var y = [1, 3, -7, 3];
        var a = [0,0,0];
        var n = 3;
        /*Solution: 
        Pyramid: 
        1; 3; -7; 3
        2; -10; 5
        -6; 5
        2,75
        Koeffizienten:
        2,75; -6; -6,75; 3 */

    a = a.map(function() { return 0; })     //empty current coefficent of the polynom
    x = x.map(parseFloat)                   //format real values for calculation
    y = y.map(parseFloat)                   //format real values for calculation
    f[0] = []                               //add new array to the 2. Dimension

    /*
        Generate the newton interpolation pyramid with a 2 Dimensiol array of the function value f.
        https://en.wikipedia.org/wiki/Newton_polynomial

                f[0][]              f[1][]                                     f[2][]                                  f[3][]                               f[4][]

        x[0]    y[0]
                        (y[1] - y[0]) / (x[1] - x[0])
        x[1]    y[1]                                        (f[1][1] - f[1][0]) / (x[2] - x[0])
                        (y[2] - y[1]) / (x[2] - x[1])                                               (f[2][1] - f[2][0]) / (x[3] - x[0])
        x[2]    y[2]                                        (f[1][2] - f[1][1]) / (x[3] - x[1])                                             (f[3][1] - f[3][0]) / (x[4] - x[0])
                        (y[3] - y[2]) / (x[3] - x[2])                                               (f[2][2] - f[2][1]) / (x[4] - x[1])
        x[3]    y[3]                                        (f[1][3] - f[1][2]) / (x[4] - x[2])
                        (y[4] - y[3]) / (x[4] - x[3])
        x[4]    y[4]

        . . .
        x[n]    y[n]
    */

    for(i in y){
        f[0][i] = y[i]
    }

   for(i = 0; i < n; i++){
       f[i + 1] = []
       for(j = 1; j <= (n - i); j++){
           f[i + 1][j - 1] = (f[i][j] - f[i][j - 1]) / (x[j + i] - x[j - 1])
       }
   }

   /*

   */


}