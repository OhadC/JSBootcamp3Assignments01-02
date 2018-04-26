module.exports = class Group {
    constructor(name) {
        this.name = name
        this.users = [] // TODO: return it to fucking object
    }

    addUser(user) {
        if (this.getUserIndex(user.name) === -1) {
            this.users.push(user)
            return true
        }
        return false
    }

    removeUser(userName) {
        const userIndex = this.getUserIndex(userName)
        if (userIndex !== -1) {
            this.users.splice(userIndex, 1)
            return true
        }
        return false
    }

    getUserIndex(userName) {
        return this.users.findIndex(user => user.name === userName)
    }
}
