class Group {
    constructor(name) {
        this._id = Group.idCounter++    // unique
        this._name = name               // not unique
        this._users = {}
    }

    getId() {
        return this._id
    }
    getName() {
        return this._name
    }
    getUsers() {
        return Object.values(this._users)
    }

    addUser(user) {
        if (this._users[user.getName()]) return false
        this._users[user.getName()] = user
        return true
    }
    addUsers(users) {
        users.forEach(user => this.addUser(user))
        return true
    }
    isContainUser(username){
        return (username in this._users)
    }
    removeUser(userName) {
        if (!this._users[userName]) return false
        delete this._users[userName]
        return true
    }
    removeAllUsers() {
        this._users = {}
        return true
    }
}

Group.idCounter = 0

module.exports = Group
