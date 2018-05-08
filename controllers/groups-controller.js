const CompositeGroups = require('../models/composite-group')
const menuView = require('../views/menu-view')

class GroupsController {
    constructor(root, users, usersController) {
        this._root = root
        this._users = users

        usersController.on('userDeleted', this._root.removeUserFromAllGroups.bind(this._root))

        this._menu = {
            groups: {
                title: 'Groups',
                options: ['createNewGroup', 'deleteGroup', 'searchByGroupName', 'flatteningTree']
            },
            usersToGroups: {
                title: 'Users to Groups association',
                options: ['addUserToGroup', 'removeUserFromGroup', 'printGroupsAndUsers', 'searchByUser']
            },
            createNewGroup: {
                title: 'Create group',
                function: this.createNewGroup.bind(this)
            },
            deleteGroup: {
                title: 'Delete group',
                function: this.deleteGroup.bind(this)
            },
            searchByGroupName: {
                title: 'Search by group name',
                function: this.searchByGroupName.bind(this)
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
            },
            searchByUser: {
                title: 'Search by user name',
                function: this.searchByUser.bind(this)
            },
            flatteningTree: {
                title: 'Flattening tree',
                function: this.flatteningTree.bind(this)
            }
        }
    }

    getMenu() {
        return this._menu
    }

    chooseGroup(currGroup, callback) {
        const currGroupGroupsKeys = currGroup.getGroupsKeys()
        if (!currGroupGroupsKeys.length) {
            console.log('Picked group:', currGroup.getName())
            callback(currGroup)
        } else {
            const options = [
                '== Right here! (' + currGroup.getName() + ') ==',
                ...currGroupGroupsKeys
            ]
            console.log('Pick a group:')
            menuView.chooseOne(options, optionIndex => {
                if (optionIndex === 0) {
                    console.log('Picked group:', currGroup.getName())
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
                if (!chosenGroup.addGroup(newGroup)) {
                    console.log('Group with that name already exists')
                } else {
                    this.preventTwoEntities(chosenGroup)
                }
                callback()
            })
        })
    }
    addUserToGroup(callback) {
        this.chooseGroup(this._root, chosenGroup => {
            const questions = [{ question: 'Enter username: ', type: 'string' }]
            menuView.getInput(questions, answers => {
                const username = answers[0]

                const user = this._users.getUser(username)
                if (!user) {
                    console.log('No user with that name')
                } else if (!chosenGroup.addUser(user)) {
                    console.log('User already in that group')
                } else {
                    this.preventTwoEntities(chosenGroup)
                }
                callback()
            })
        })
    }
    removeUserFromGroup(callback) {
        this.chooseGroup(this._root, chosenGroup => {
            const questions = [{ question: 'Enter username: ', type: 'string' }]
            menuView.getInput(questions, answers => {
                const username = answers[0]

                if (!chosenGroup.removeUser(username)) {
                    console.log('No user with that name in the chosen group')
                }
                callback()
            })
        })
    }
    deleteGroup(callback) {
        this.chooseGroup(this._root, chosenGroup => {
            const chosenGroupParent = chosenGroup.getParent()
            if (!chosenGroupParent) {
                console.log('There is no groups (you can\'t delete the root)')
            } else {
                const chosenGroupName = chosenGroup.getName()
                chosenGroupParent.removeGroup(chosenGroupName)
            }
            callback()
        })
    }
    searchByUser(callback) {
        const questions = [{ question: 'Enter Username: ', type: 'string' }]
        menuView.getInput(questions, answers => {
            const username = answers[0]

            const results = this._root.search(group => group.isContainUser(username))
            const paths = results.map(group => group.getPath())
            paths.forEach(path => {
                const toString = path.reduce((prev, currGroup) => prev + ' > ' + currGroup.getName(), '')
                console.log(toString)
            })
            callback()
        })
    }
    searchByGroupName(callback) {
        const questions = [{ question: 'Enter Group name: ', type: 'string' }]
        menuView.getInput(questions, answers => {
            const groupname = answers[0]

            const results = this._root.search(group => group.getName() === groupname)
            const paths = results.map(group => group.getPath())
            paths.forEach(path => {
                const toString = path.reduce((prev, currGroup) => prev + ' > ' + currGroup.getName(), '')
                console.log(toString)
            })
            callback()
        })
    }
    flatteningTree(callback) {
        this._root.flattening()
        callback()
    }
    printGroupsAndUsers(callback) {
        this._root.updateUsersCount()
        printGroup(this._root, 0)

        callback()

        function printGroup(currGroup, level) {
            console.log(levelToString(level) + currGroup)
            currGroup.getUsers().forEach(user => console.log(levelToString(level + 1) + user))
            currGroup.getGroups().forEach(group => printGroup(group, level + 1))
        }
        function levelToString(level) {
            let str = ''
            if (level > 0) {
                if (level > 1) {
                    str += '| '.repeat(level - 1)
                }
                str += '|-'
            }
            return str
        }
    }

    preventTwoEntities(currGroup) {
        const groupGroupsKeys = currGroup.getGroupsKeys()
        if (groupGroupsKeys.length) {
            const currGroupUsers = currGroup.getUsers()
            if (currGroupUsers.length) {
                let othersGroup = currGroup.getGroup('others')
                if (!othersGroup) {
                    othersGroup = new CompositeGroups('others', currGroup)
                    currGroup.addGroup(othersGroup)
                }
                othersGroup.addUsers(currGroupUsers)
                currGroup.removeAllUsers()
                console.log('User/s moved to group "others"')
            }
        }
    }
}

module.exports = GroupsController
