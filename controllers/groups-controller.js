const User = require('../models/user')
const CompositeGroups = require('../models/composite-group')
const menuView = require('../views/menu-view')

class GroupsController {
    constructor(root, users, usersController) {
        this._root = root
        this._users = users

        // usersController.on('userDeleted', this._groups.removeUserFromAllGroups.bind(this._groups))

        this._menu = {
            groups: {
                title: 'Groups',
                /*options: ['createOrDeleteGroups', 'printGroups']*/
                options: ['createNewGroup', 'deleteGroup', 'printGroups']
            },
            /*createOrDeleteGroups: {
                title: 'Create / delete groups',
                options: ['createNewGroup', 'deleteGroup']
            },*/
            usersToGroups: {
                title: 'Users to Groups association',
                /*options: ['addOrRemoveFromGroup', 'printGroupsAndUsers']*/
                options: ['addUserToGroup', 'removeUserFromGroup', 'printGroupsAndUsers']
            },
            /*addOrRemoveFromGroup: {
                title: 'Add / remove user to / from group',
                options: ['addUserToGroup', 'removeUserFromGroup']
            },*/
            printGroups: {
                title: 'Get a list of groups in the system',
                function: this.printGroups.bind(this)
            },
            createNewGroup: {
                title: 'Create group',
                function: this.createNewGroup.bind(this)
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

    getMenu() {
        return this._menu
    }

    chooseGroup(currGroup, callback) {
        const currGroupGroupsKeys = currGroup.getGroupsKeys()
        if (!currGroupGroupsKeys.length) {
            callback(currGroup)
        } else {
            const options = [
                '== Right here! (' + currGroup.getName() + ') ==',
                ...currGroupGroupsKeys
            ]
            console.log('Pick group')
            menuView.chooseOne(options, optionIndex => {
                if (optionIndex === 0) {
                    callback(currGroup)
                } else {
                    const chosenGroupKey = options[optionIndex]
                    const chosenGroup = currGroup.getGroup(chosenGroupKey)
                    this.chooseGroup(chosenGroup, callback)
                }
            })
        }
    }

    createNewGroup(callback) {
        this.chooseGroup(this._root, chosenGroup => {
            const questions = [{ question: 'Enter group name: ', type: 'string' }]
            menuView.getInput(questions, answers => {
                const groupname = answers[0]

                const newGroup = new CompositeGroups(groupname, chosenGroup)
                chosenGroup.addGroup(newGroup)
                this.preventTwoEntities(chosenGroup)
                callback()
            })
        })
    }

    addUserToGroup(callback) {       // TODO: need more validations
        this.chooseGroup(this._root, chosenNode => {
            const questions = [{ question: 'Enter username: ', type: 'string' }]
            menuView.getInput(questions, answers => {
                const username = answers[0]

                const user = this._users.getUser(username)
                chosenNode.addUser(user)
                callback()
            })
        })
    }
    removeUserFromGroup(callback) {       // TODO: need more validations
        this.chooseGroup(this._root, chosenGroup => {
            const questions = [{ question: 'Enter username: ', type: 'string' }]
            menuView.getInput(questions, answers => {
                const username = answers[0]

                chosenGroup.removeUser(username)
                callback()
            })
        })
    }
    deleteGroup(callback) {       // TODO: need more validations
        this.chooseGroup(this._root, chosenGroup => {
            const chodenGroupName = chosenGroup.getNAme()
            const chosenGroupParent = chosenGroup.getParent()
            chosenGroupParent.removeGroup(chodenGroupName)
            callback()
        })
    }

    printGroups(callback) { // fix this
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
        callback()
    }

    printGroupsAndUsers(callback) {
        const obj = toObj(this._root)

        console.log(toString(obj))

        callback()

        function toObj(currGroup) {
            const currGroupGroups = currGroup.getGroups()
            const groupsObj = currGroupGroups.map(group => toObj(group))
            return {
                name: currGroup.getName(),
                users: currGroup.getUsers(),
                groups: groupsObj,
                usersCount: groupsObj.reduce((sum, group) => sum + group.usersCount, 0) + currGroup.getUsers().length
            }
        }
        function toString(objIn, dashes) {
            dashes = dashes || 0
            let str = `${'-'.repeat(dashes)} ${objIn.name} (${objIn.usersCount}) \n`
            str += objIn.users.reduce(user => `${'-'.repeat(dashes + 1)} ${user.getName()} \n`, '')
            objIn.groups.forEach(group => {
                str += toString(group, dashes + 1)
            })
            return str
        }
    }

    preventTwoEntities(currGroup) {
        const groupGroupsKeys = currGroup.getGroupsKeys()
        if (groupGroupsKeys.length) {
            const currGroupUsers = currGroup.getUsers()
            if (currGroupUsers.length) {
                let othersGroup
                if (groupGroupsKeys.indexOf('others')) {
                    othersGroup = currGroup.getGroup('others')
                } else {
                    othersGroup = new CompositeGroups('others', currGroup)
                    currGroup.addGroup(othersGroup)
                }
                othersGroup.addUsers(...currGroupUsers)
                currNodeGroup.removeAllUsers()
            }
        }
    }
}

module.exports = GroupsController
