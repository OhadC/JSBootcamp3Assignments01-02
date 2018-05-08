class User {
    constructor(name, password, age) {
        this._id = User.idCounter++     // unique
        this._name = name               // unique
        this._password = password
        this._age = age
    }

    getId() {
        return this._id
    }
    getName() {
        return this._name
    }
    getPassword() {
        return this._password
    }
    setPassword(newPassword) {
        this._password = newPassword
    }
    getAge() {
        return this._age
    }
    setAge(newAge) {
        this._age = newAge
    }

    toString() {
        return this._name
    }
}

User.idCounter = 0

module.exports = User
