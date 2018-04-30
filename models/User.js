module.exports = class User {
    constructor(name, password, age) {
        this._name = name.trim()
        this._password = password.trim()
        this._age = age
    }

    getName() {
        return this._name
    }
    getPassword() {
        return this._password
    }
    getAge() {
        return this._age
    }

    updateUser(password, age) {
        this._password = password
        this._age = age
    }
}
