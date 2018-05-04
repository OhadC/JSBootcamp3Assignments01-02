const Node = require('../models/n-tree')
const Group = require('../models/group')
const menuView = require('../views/menu-view')

class GroupsController {
    constructor(root, users, groups, usersController) {
        this._root = root
        this._users = users
        this._groups = groups

        usersController.on('userDeleted', this._groups.removeUserFromAllGroups.bind(this._groups))

        this._menu = {
            groups: {
                title: 'Groups',
                options: ['createOrDeleteGroups', 'printGroups']
            },
            createOrDeleteGroups: {
                title: 'Create / delete groups',
                options: ['createNewGroup', 'deleteGroup']
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

    chooseNode(currNode, callback) {
        currNode = currNode
        const currNodeChildrens = currNode.getChildrensKeys()
        const options = ['== Right here! ==', ...currNodeChildrens]
        console.log('Pick group')
        menuView.chooseOne(options, optionIndex => {
            if (optionIndex === 0) {
                callback(currNode)
            } else {
                const chosenNodeKey = options[optionIndex]
                const chosenNode = currNode.getChildren(chosenNodeKey)
                this.chooseNode(chosenNode, callback)
            }
        })
    }

    createNewGroup(callback) {
        this.chooseNode(this._root, chosenNode => {
            const questions = [{ question: 'Enter group name: ', type: 'string' }]
            menuView.getInput(questions, answers => {
                const groupname = answers[0]

                const newGroup = new Group(groupname)
                const newNode = new Node(newGroup, chosenNode)
                chosenNode.addChildren(groupname, newNode) // TODO: check if key alreadt exists
                preventTwoEntities(chosenNode)
                callback()
            })
        })
    }

    addUserToGroup(callback) {       // TODO: need more validations
        this.chooseNode(this._root, chosenNode => {
            const questions = [
                { question: 'Enter username: ', type: 'string' },
                { question: 'Enter group name: ', type: 'string' }
            ]
            menuView.getInput(questions, answers => {
                const username = answers[0]
                const groupname = answers[1]
                const user = this._users.getUser(username)
                this._groups.addUserToGroup(user, groupname)
                callback()
            })
        })
    }
    removeUserFromGroup(callback) {       // TODO: need more validations
        const questions = [
            { question: 'Enter username: ', type: 'string' },
            { question: 'Enter group name: ', type: 'string' }
        ]
        menuView.getInput(questions, answers => {
            const username = answers[0]
            const groupname = answers[1]
            this._groups.removeUserFromGroup(username, groupname)
            callback()
        })
    }

    deleteGroup(callback) {       // TODO: need more validations
        const questions = [{ question: 'Enter group name: ', type: 'string' }]
        menuView.getInput(questions, answers => {
            const groupname = answers[0]
            try {
                this._groups.deleteGroup(groupname)
            } catch (e) {
                console.log(e.message)
            }
            callback()
        })
    }

    printGroups(callback) {
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
        callback()
    }

    preventTwoEntities(currNode) {
        const nodeChildernsKeys = currNode.getChildrensKeys()
        if (nodeChildernsKeys.length) {
            const currNodeGroup = currNode.getData()
            const currGroupUsers = currNode.getUsers()
            if (currGroupUsers.length) {
                let othersGroup
                if (nodeChildernsKeys.indexOf('others')) {
                    othersGroup = currNode.getChildren('others')
                } else {
                    othersGroup = new Group('others')
                    currNode.addChildren(new Node(othersGroup))
                }
                othersGroup.addUsers(...currGroupUsers)
                currNodeGroup.removeAllUsers()
            }
        }
    }
}

module.exports = GroupsController
