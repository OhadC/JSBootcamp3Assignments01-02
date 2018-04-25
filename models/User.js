module.exports = class User {
    constructor(name, password, age) {
        this.name = name
        this.password = password
        this.age = age
    }

    updateUser(name, age) {
        this.name = name
        this.age = age
    }
}
