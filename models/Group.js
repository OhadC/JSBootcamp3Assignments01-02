module.exports = class Group {
    constructor(name) {
        this.name = name
        this.users = {} // {username: user, username: user}
    }

    addUser(user) {
        if (!(user.name in this.users)) {
            this.users[user.name] = user
            return true
        }
        return false
    }

    removeUser(userName) {
        if (userName in this.users) {
            delete this.users[userName]
            return true
        }
        return false
    }

    getAllUsers() {
        const usersArr = []
        for (let userName in this.users) {
            usersArr.push(this.users[userName])
        }
        return usersArr
    }
}
