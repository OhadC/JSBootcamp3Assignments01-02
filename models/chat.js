const Users = require('./users')
const Groups = require('./groups')

module.exports = class Chat {
    constructor() {
        this._users = new Users()
        this._groups = new Groups()
    }

    getUsers() {
        return this._users.getUsers()
    }
    getGroups() {
        return this._groups.getGroups()
    }
    getUser(username){
        return this._users.getUser(username)
    }
    getGroup(groupname){
        return this._groups.getGroup(groupname)
    }

    addUser(user) {
        this._users.addUser(user)
    }
    addGroup(group) {
        this._groups.addGroup(group)
    }
    addUserToGroup(user, groupname) {
        this._groups.addUserToGroup(user, groupname)
    }
    removeUserFromGroup(username, groupname) {
        this._groups.removeUserFromGroup(groupname, username)
    }
    
    deleteUser(username) {
        this._users.deleteUser(username)
        this._groups.removeUserFromAllGroups(username)
    }
    deleteGroup(groupname) {
        this._groups.deleteGroup(groupname)
    }
}
