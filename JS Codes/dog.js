//  CLASS, OBJECT, INHERITENCE (CHILD CLASS)

//Parent class Dog
class Dog{
    //Declare protected (private) fields
    _attendance = 0;

    constructor(namee, birthday) {
        this.name = name;
        this.birthday = birthday;
    }ṇ

    getAge() {
        //Getter
        return this.calcAge();
    }

    calcAge() {
        //calculate age using today's date and birthday6+-
        return this.calcAge();
    }

    bark() {
        return console.log("Woof!");
    }

    updateAttendance() {
        //add a day to the dog's attendance days at the petsitters
        this._attendance++;
    }
}

//Child class HerdingDog, inherits from parent Dog
class HerdingDog extends Dog {
    constructor(name, birthday) {
        super(name);
        super(birthday);
    }

    herd() {
        //additional method for HerdingDog child class
        return console.log("Stay together!")
    }
}

//instantiate a new HerdingDog object
const fluffy = new HerdingDog("Fluffy", "1/12/2019");
fluffy.bark();

//instantiate a new instance of Dog class, an individual dog named Rufus
const rufus = new Dog("Rufus", "2/1/2017");
//use getter method to calculate Rufus' age
rufus.getAge();

