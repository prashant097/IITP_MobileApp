// POLYMORPHISM - METHOD OVERRIDING


//Parent class Dog
class Dog{
    //Declare protected (private) fields
    _attendance = 0;

    constructor(namee, birthday) {
        this.name = name;
        this.birthday = birthday;
    }

    getAge() {
        //Getter
        return this.calcAge();
    }

    calcAge() {
        //calculate age using today's date and birthday
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

//Child class TrackingDog, inherits from parent
class TrackingDog extends Dog {
    constructor(name, birthday)
        super(name);
        super(birthday);
    }

    track() {
        //additional method for TrackingDog child class
        return console.log("Searching...")
    }

    bark() {
        return console.log("Found it!");
    }


//instantiate a new TrackingDog object
const duke = new TrackingDog("Duke", "1/12/2019");
duke.bark(); //returns "Found it!"