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

    addUser(newUser) {
        if (this._users[newUser.getName()]) return false
        this._users[newUser.getName()] = newUser
        return true
    }
    addUsers(newUsers) {
        for(let newUser in newUsers){
            this.addUser(newUser)
        }
        return true
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
