module.exports = class Users {
    constructor() {
        this._users = []
    }

    getUsers() {
        return this._users
    }

    addUser(newUser) {
        if (this.getIndexByName(newUser.getName()) !== -1) throw new Error('User with that name Already Exists')
        this._users.push(newUser)
    }
    updateUser(username, newPassword, newAge) {
        const userIndex = this.getIndexByName(username)
        if (userIndex === -1) throw new Error('No user with that name')
        const user = this._users[userIndex]
        user.setPassword(newPassword)
        user.setAge(newAge)
    }
    getUser(username) {
        const userIndex = this.getIndexByName(username)
        if (userIndex === -1) throw new Error('No user with that name')
        return this._users[userIndex]
    }
    deleteUser(username) {
        const userIndex = this.getIndexByName(username)
        if (userIndex === -1) throw new Error('No user with that name')
        this._users.splice(userIndex, 1)
    }

    getIndexById(userId) {
        return this._users.findIndex(user => user.getId() === userId)
    }
    getIndexByName(username) {
        return this._users.findIndex(user => user.getName() === username)
    }
}
