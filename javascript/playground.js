var something = "weird";

// Created by Me.
var Person = function(gender) {
    this.gender = gender;
    alert("Person instantiated");
}

var person1 = new Person('Male');
var person2 = new Person('Female');

alert("person1 is a " + person1.gender);