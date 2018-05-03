const Group = require('../models/group')

class GroupsController {
    constructor(users, groups) {
        this._users = users,
            this._groups = groups

        this.menu = {
            groups: {
                title: 'Groups',
                options: ['createOrDeleteGroups', 'printGroups']
            },
            createOrDeleteGroups: {
                title: 'Create / delete groups',
                options: ['createNewgroup', 'deleteGroup']
            },
            usersToGroups: {
                title: 'Users to Groups association',
                options: ['addOrRemoveFromGroup', 'printGroupsAndUsers']
            },
            addOrRemoveFromGroup: {
                title: 'Add / remove user to / from group',
                options: ['addUserToGroup', 'removeUserFromGroup']
            },
            printGroups: {
                title: 'Get a list of groups in the system',
                function: this.printGroups
            },
            createNewgroup: {
                title: 'Create group',
                function: this.createNewgroup
            },
            deleteGroup: {
                title: 'Delete group',
                function: this.deleteGroup
            },
            printGroupsAndUsers: {
                title: 'Get a list of groups and users under each group',
                function: this.printGroupsAndUsers
            },
            addUserToGroup: {
                title: 'Add user to group',
                function: this.addUserToGroup
            },
            removeUserFromGroup: {
                title: 'Remove user from group',
                function: this.removeUserFromGroup
            }
        }
    }

    createNewgroup(callback) {
        rl.question('Enter group name: ', (groupname) => {
            if (!groupname.trim()) {
                throw new Error('You must enter group name')
            }
            const newGroup = new Group(groupname)
            this._groups.addGroup(newGroup)
            callback()
        })
    }

    addUserToGroup(username, groupname) {
        const user = this._chat.getUser(username)
        this._groups.addUserToGroup(user, groupname)
    }
    removeUserFromGroup(username, groupname) {
        this._groups.removeUserFromGroup(groupname, username)
    }

    deleteGroup(callback) {
        rl.question('Enter group name: ', (groupname) => {
            try {
                this._groups.deleteGroup(groupname)
            } catch (e) {
                console.log(e.message)
            }
            callback()
        })
    }

    printGroups() {
        const groups = this._groups.getGroups()
        console.log()
        if (!groups.length) {
            console.log('There is no groups')
        } else {
            groups.forEach(group => {
                console.log(group.getName())
            })
        }
        console.log()
    }
    printGroupsAndUsers() {
        const groups = this._groups.getGroups()
        console.log()
        if (!groups.length) {
            console.log('There is no groups')
        } else {
            groups.forEach(group => {
                console.log(group.getName())
                const users = group.getUsers()
                users.forEach(user => {
                    console.log('\t', user.getName(), '(' + user.getAge() + ")")
                })
            })
        }
        console.log()
    }
}

module.exports = GroupsController
