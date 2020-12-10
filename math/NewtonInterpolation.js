new function Interpolation (x, y, a, n) {
    //Declare and init variables
    var x = []
    var y = []
    var a = []
    var n = Number
    var f = []
    var i = 0
    var j = 0
    var m = []

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
        Generate a 2 dimensiol array for storing the binomial values of the x-Array

                m[0][]      m[1][]      m[2][]                          m[3][]
        1       1           -x[0]       x[0]x[1]                        -(x[0]x[1]x[2])
        x                   1           m[1][0] + m[1][1] * x[1]        m[2][0] + m[2][1] * x[2]
        x^2                             1                               -(m[2][1] + m[2][2] * x[2])
        x^3                                                             1
        x^n
   */
   //Init first 2 dimensions of the array as base values
   m[0] = []
   m[0][0] = 1
   m[1] = []
   m[1][0] = -x[0]
   m[1][1] = 1

   //Loop over the remaining dimensions, extending the binomials with the next x-array-value
   for(i = 2; i <= n + 1; i++ ){
        //Init root value of the dimension
        m[i] = []
        m[i][0] = m[i - 1][0] * x[i - 1]

        //Loop over all sub dimensions of the root
        for(j = 1; j < i; j++){
            if(i%2 == 0 && j%2 !== 0){
                m[i][j] = m[i - 1][j - 1] + m[i - 1][j] * x[i - 1]
            }
            else{
                m[i][j] = m[i - 1][j - 1] + m[i - 1][j] * x[i - 1] * -1
            }
        }
        m[i][j] = 1
    }

    //Calculate final coefficents by multipling the 2 dimensiol pyramid array f and the 2 dimensiol array of binomial x values m
    for(i = 0; i < n; i++){

        for(j = i; j <= n; j++){
            a[i] += m[j][i] * f[j][0]
        }
    }
    a[n] = f[n][0]
}
