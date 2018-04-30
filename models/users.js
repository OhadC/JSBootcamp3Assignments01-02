module.exports = class Users {
    constructor() {
        this._users = {} // {username: user, username: user}
    }

    getUsers() {
        const usersArr = []
        for (const name in this._users) {
            usersArr.push(this._users[name])
        }
        return usersArr
    }

    addUser(user) {
        const username = user.getName()
        if (username in this._users) {
            throw new Error('User with that name Already Exists')
        }
        this._users[username] = user
    }
    updateUser(username, password, age) {
        if (!(username in this._users)) {
            throw new Error('No user with that name')
        }
        const user = this._users[username]
        user.updateUser(password, age)
    }
    getUser(username) {
        if (username in this._users) {
            return this._users[username]
        }
        return null
    }
    deleteUser(username) {
        if (!(username in this._users)) {
            throw new Error('No user with that name')
        }
        delete this._users[username]
    }
}
