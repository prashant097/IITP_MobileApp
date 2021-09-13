// POLYMORPHISM - METHOD OVERLOADING

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

    updateAttendance(x) {
        //adds multiple to the dog's attendance days at the petsitters
        this._attendance = this._attendance + x;
    }
}

//instantiate a new instance of Dog class, an individual dog named Rufus
const rufus = new Dog("Rufus", "2/1/2017");
rufus.updateAttendance(); //attendance = 1
rufus.updateAttendance(4); // attendance = 5