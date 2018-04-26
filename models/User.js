module.exports = class User {
    constructor(name, password, age) {
        this.name = name
        this.password = password
        this.age = age
    }

    updateUser(password, age) {
        this.password = password
        this.age = age
    }
}
