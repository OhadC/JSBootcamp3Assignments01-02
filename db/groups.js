const Group = require('./../models/Group')

module.exports = groups = {
    groups: [], // TODO: return it to fucking object

    createGroup: (name) => {
        if (getIndex(name) === -1) {
            groups.push(new Group(name))
            return true
        }
        return false
    },
    deleteGroup: (name) => {
        const groupIndex = getIndex(name)
        if (groupIndex !== -1) {
            groups.splice(groupIndex, 1)
            return true
        }
        return false
    },
    addUserToGroup: (groupName, user) => {
        const groupId = getIndex(groupName)
        groups[groupId].addUser(user)
    },
    removeUserFromGroup: (groupName, userName) => {
        const groupId = getIndex(groupName)
        groups[groupId].removeUser(userName)
    },
    getAllGroupsNames(){
        return [] // TODO: this
    },
    getIndex: (groupName) => {
        return groups.findIndex(group => group.name === groupName)
    }
}
