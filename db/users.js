const User = require("./../models/User")

class Users {
    constructor() {
        this.users = {} // {username: user, username: user}
    }

    createUser(name, password, age) {
        if (!(name in this.users)) {
            this.users[name] = new User(name, password, age)
            return true
        }
        return false
    }
    updateUser(name, password, age) {
        if (user in this.users) {
            const user = this.users[name]
            user.updateUser(password, age)
            return true
        }
        return false
    }
    getUser(name) {
        if (name in this.users) {
            return this.users[name]
        }
        return null
    }
    getAllUsers() {
        const usersArr = []
        for (const name in this.users) {
            usersArr.push(this.users[name])
        }
        return usersArr
    }
    deleteUser(name) {
        if (name in this.users) {
            delete this.users[name]
            return true
        }
        return false
    }
}

module.exports = Users
