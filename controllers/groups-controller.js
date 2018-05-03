const Group = require('../models/group')
const menuView = require('../views/menu-view')

class GroupsController {
    constructor(users, groups) {
        this._users = users
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
                function: this.printGroups.bind(this)
            },
            createNewgroup: {
                title: 'Create group',
                function: this.createNewgroup.bind(this)
            },
            deleteGroup: {
                title: 'Delete group',
                function: this.deleteGroup.bind(this)
            },
            printGroupsAndUsers: {
                title: 'Get a list of groups and users under each group',
                function: this.printGroupsAndUsers.bind(this)
            },
            addUserToGroup: {
                title: 'Add user to group',
                function: this.addUserToGroup.bind(this)
            },
            removeUserFromGroup: {
                title: 'Remove user from group',
                function: this.removeUserFromGroup.bind(this)
            }
        }
    }

    createNewgroup(callback) {
        const questionsArray = ['Enter group name: ']
        menuView.getInput(questionsArray, answers => {
            const groupname = answers[0]
            if (!groupname.trim()) {
                throw new Error('You must enter group name')
            }
            const newGroup = new Group(groupname)
            this._groups.addGroup(newGroup)
            callback()
        })
    }

    addUserToGroup(username, groupname) {
        const questionsArray = ['Enter username: ', 'Enter group name: ']
        menuView.getInput(questionsArray, answers => {
            const username = answers[0]
            const groupname = answers[1]
            const user = this._users.getUser(username)
            this._groups.addUserToGroup(user, groupname)
            callback()
        })

    }
    removeUserFromGroup(username, groupname) {
        const questionsArray = ['Enter username: ', 'Enter group name: ']
        menuView.getInput(questionsArray, answers => {
            const username = answers[0]
            const groupname = answers[1]
            this._groups.removeUserFromGroup(username, groupname)
            callback()
        })
    }

    deleteGroup(callback) {
        const questionsArray = ['Enter group name: ']
        menuView.getInput(questionsArray, answers => {
            const groupname = answers[0]
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
