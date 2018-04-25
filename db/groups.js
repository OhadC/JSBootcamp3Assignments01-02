const Group = require('./../models/Group')
const users = require('./Users')

class Groups {
    constructor() {
        this.groups = [] // TODO: return it to fucking object
    }
    createGroup(name) {
        if (this.getIndex(name) === -1) {
            this.groups.push(new Group(name))
            return true
        }
        return false
    }
    deleteGroup(name) {
        const groupIndex = this.getIndex(name)
        if (groupIndex !== -1) {
            this.groups.splice(groupIndex, 1)
            return true
        }
        return false
    }
    addUserToGroup(groupName, username) {
        const user = users.getUserByName(username)
        const groupId = this.getIndex(groupName)
        this.groups[groupId].addUser(user)
    }
    removeUserFromGroup(groupName, userName) {
        const groupId = this.getIndex(groupName)
        this.groups[groupId].removeUser(userName)
    }
    removeUserFromAllGroups(username){
        for(group of groups){
            group.removeUser(userName)
        }
    }
    getIndex(groupName) {
        return groups.findIndex(group => group.name === groupName)
    }
}

module.exports = new Groups()
