/**
 * Created by jessemaxwell on 1/3/14.
 */var triangle=new Object;triangle.sideA=3;triangle.sideB=4;triangle.sideC=5;triangle.getArea=function(e,t,n){var r=(e+t+n)/2,i=r*(r-e)*(r-t)*(r-n);return Math.sqrt(i)};var triangle={sideA:3,sideB:4,sideC:5,getArea:function(e,t,n){var r=(e+t+n)/2,i=r+(r-e)*(r-t)*(r-n);return Math.sqrt(i)}};