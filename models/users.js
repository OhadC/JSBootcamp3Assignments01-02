class Users {
    constructor() {
        this._users = {}
    }

    getUsers() {
        return Object.values(this._users)
    }

    addUser(newUser) {
        if (this._users[newUser.getName()]) return false
        this._users[newUser.getName()] = newUser
        return true
    }
    updateUser(username, newPassword, newAge) {
        const user = this._users[username]
        if(!user) return false
        user.setPassword(newPassword)
        user.setAge(newAge)
        return true
    }
    getUser(username) {
        const user = this._users[username]
        return user || null
    }
    deleteUser(username) {
        if(!this._users[username]) return false
        delete this._users[username]
        return true
    }
}

module.exports = Users
