class Users {
    constructor() {
        this._users = []
    }

    getUsers() {
        return this._users
    }

    addUser(newUser) {
        if (this.getIndexByName(newUser.getName()) !== -1) return false
        this._users.push(newUser)
        return true
    }
    updateUser(username, newPassword, newAge) {
        const userIndex = this.getIndexByName(username)
        if (userIndex === -1) return false
        const user = this._users[userIndex]
        user.setPassword(newPassword)
        user.setAge(newAge)
        return true
    }
    getUser(username) {
        const userIndex = this.getIndexByName(username)
        if (userIndex === -1) return null
        return this._users[userIndex]
    }
    deleteUser(username) {
        const userIndex = this.getIndexByName(username)
        if (userIndex === -1) return false
        this._users.splice(userIndex, 1)
        return true
    }

    getIndexById(userId) {
        return this._users.findIndex(user => user.getId() === userId)
    }
    getIndexByName(username) {
        return this._users.findIndex(user => user.getName() === username)
    }
}

module.exports = Users
