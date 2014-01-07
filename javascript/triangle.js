/**
 * Created by jessemaxwell on 1/3/14.
 */
var triangle = new Object();

triangle.sideA = 3;
triangle.sideB = 4;
triangle.sideC = 5;

triangle.getArea = function ( a, b, c ) {
    var semiperimeter = (a + b + c) / 2;
    var calculation = semiperimeter * (semiperimeter - a) * (semiperimeter - b) * (semiperimeter - c);

    return Math.sqrt (calculation);
};

var triangle = {
    sideA : 3,
    sideB : 4,
    sideC : 5,
    getArea : function ( a, b, c ) {
        var semiperimeter = (a + b + c) / 2;
        var calculation   = semiperimeter + (semiperimeter - a) * (semiperimeter - b) * (semiperimeter - c);
        return Math.sqrt( calculation );
    }
};