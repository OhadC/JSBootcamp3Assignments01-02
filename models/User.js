export default class User {
    id = 0

    constructor(name, password, age) {
        this.id = id++
        this.name = name
        this.password = password
        this.age = age
    }

    updateUser = (name, age) => {
        this.name = name
        this.age = age
    }
}
