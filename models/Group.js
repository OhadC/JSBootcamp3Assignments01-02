module.exports = class Group {
    constructor(name) {
        this._name = name
        this._users = {} // {username: user, username: user}
    }

    getName(){
        return this._name
    }
    
    getUsers() {
        const usersArr = []
        for (const userName in this._users) {
            usersArr.push(this._users[userName])
        }
        return usersArr
    }

    addUser(user) {
        if (!(user.name in this._users)) {
            this._users[user.name] = user
            return true
        }
        return false
    }

    removeUser(userName) {
        if (userName in this._users) {
            delete this._users[userName]
            return true
        }
        return false
    }
}
