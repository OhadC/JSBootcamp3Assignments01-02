const Node = require('./n-tree')
const Group = require('./group')

class GroupNode extends Node {
    constructor(groupname) {
        const group = new Group(groupname)
        super(group)
    }

    getId() {
        return super.getData().getId()
    }
    getName() {
        return super.getData().getName()
    }
    getUsers() {
        return super.getData().getUsers()
    }

    addUser(newUser) {
        return super.super.getData().addUser(newUser)
    }
    addUsers(newUsers) {
        return super.super.getData().addUsers(newUsers)
    }
    removeUser(userName) {
        return super.super.getData().removeUser(userName)
    }
    removeAllUsers() {
        return super.super.getData().removeAllUsers()
    }
}