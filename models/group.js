let idCounter = 0

module.exports = class Group {
    constructor(name) {
        this._id = idCounter++  // unique
        this._name = name       // not unique
        this._users = []
    }

    getId() {
        return this._id
    }
    getName() {
        return this._name
    }
    getUsers() {
        return this._users
    }

    addUser(newUser) {
        if (this.getIndexByName(newUser.getName()) !== -1) return false
        this._users.push(newUser)
        return true
    }
    removeUser(userName) {
        const userIndex = this.getIndexByName(userName)
        if (userIndex === -1) return false
        this._users.splice(userIndex, 1)
    }

    getIndexById(userId) {
        return this._users.findIndex(user => user.getId() === userId)
    }
    getIndexByName(username) {
        return this._users.findIndex(user => user.getName() === username)
    }
}
