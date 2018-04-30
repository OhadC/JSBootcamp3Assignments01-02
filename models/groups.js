module.exports = class Groups {
    constructor() {
        this._groups = {} // {name: group, name: group}
    }
    addGroup(group) {
        const groupname = group.getName()
        if (groupname in this._groups) {
            throw new Error('Group with that name Already Exists')
        }
        this._groups[groupname] = group
    }
    deleteGroup(groupname) {
        if (!(groupname in this._groups)) {
            throw new Error('No group with that name')
        }
        delete this._groups[groupname]
    }
    addUserToGroup(groupname, user) {
        if (!(groupname in this._groups)) {
            throw new Error('No group with that name')
        }
        if (!(this._groups[groupname].addUser(user))) {
            throw new Error('User Allready in that group')
        }
    }
    removeUserFromGroup(groupname, username) {
        if (!(groupname in this._groups)) {
            throw new Error('No group with that name')
        }
        if (!(this._groups[groupname].removeUser(username))) {
            throw new Error('No user with that name')
        }
    }
    removeUserFromAllGroups(username) {
        for (const groupname in this._groups) {
            this._groups[groupname].removeUser(username)
        }
    }
    getGroup(groupname) {
        if (groupname in this._groups) {
            return this._groups[groupname]
        }
        return null
    }
    getGroups() {
        const groupsArr = []
        for (const groupname in this._groups) {
            groupsArr.push(this._groups[groupname])
        }
        return groupsArr
    }
}
