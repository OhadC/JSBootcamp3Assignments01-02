module.exports = class Groups {
    constructor() {
        this._groups = []
    }

    getGroups() {
        return this._groups
    }

    getGroup(groupName) {
        const groupIndex = this.getIndexByName(groupName)
        if (groupIndex === -1) throw new Error('No group with that name')
        return this._groups[groupIndex]
    }
    addGroup(group) {
        this._groups.push(group)
    }
    deleteGroup(groupName) {
        const groupIndex = this.getIndexByName(groupName)
        if (groupIndex === -1) throw new Error('No group with that name')
        this._groups.splice(groupIndex, 1)
    }
    addUserToGroup(user, groupName) {
        const groupIndex = this.getIndexByName(groupName)
        if (groupIndex === -1) throw new Error('No group with that name')
        if (!(this._groups[groupIndex].addUser(user))) throw new Error('User Already in that group')
    }
    removeUserFromGroup(username, groupName) { // TODO: should be removed
        if (!(groupName in this._groups)) {
            throw new Error('No group with that name')
        }
        if (!(this._groups[groupName].removeUser(username))) {
            throw new Error('No user with that name')
        }
    }
    removeUserFromAllGroups(username) {
        for (const groupName in this._groups) {
            this._groups[groupName].removeUser(username)
        }
    }


    getIndexById(groupId) {
        return this._groups.findIndex(group => group.getId() === groupId)
    }
    getIndexByName(groupName) {
        return this._groups.findIndex(group => group.getName() === groupName)
    }
}
