const User = require("./../models/User")

class Users {
    constructor() {
        this.users = [] // TODO: return it to fucking object
    }

    createUser(name, password, age) {
        if (this.getIndex(name) === -1) {
            this.users.push(new User(name, password, age))
            return true
        }
        return false
    }
    updateUser(oldName, newName, newAge) {
        const userIndex = this.getIndex(oldName)
        if (userIndex !== -1 && this.getIndex(newName) === -1) {
            this.users[userIndex].updateUser(newName, newAge)
            return true
        }
        return false
    }
    getAllUserNames() {
        return [] // TODO: this
    }
    deleteUser(name) {
        const userIndex = this.getIndex(name)
        if (userIndex !== -1) {
            // TODO: notify groups
            this.users.splice(userIndex, 1)
            return true
        }
        return false
    }
    getIndex(name) {
        return this.users.findIndex(user => user.name === name)
    }
}

module.exports = new Users
