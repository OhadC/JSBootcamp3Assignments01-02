const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
const ChatController = new (require('./controllers/chat-controller'))()

module.exports = function initMenu() {
    addOptionsToMenu()
    runMenu()
}

function addOptionsToMenu() {
    menu['exit'] = {
        title: 'Exit',
        function: () => rl.close()
    }
    for (const menuName in menu) {
        if (menuName === 'main') {
            menu[menuName].options.push('exit')
        } else if ('options' in menu[menuName]) {
            menu[menuName].options.push('main')
        }
    }
}

function runMenu(currMenuName) {
    const currMenu = menu[currMenuName || 'main']
    console.log(currMenu.title)
    rl.question(createMenuQuestion(currMenu), answer => {
        answer = +answer
        if (!answer || answer <= 0 || answer > currMenu.options.length) {
            console.log('Wrong input! Try again:')
            runMenu(currMenuName)
        } else {
            const selectdMenu = currMenu.options[answer - 1]
            const selectdMenuItem = menu[selectdMenu]

            if ('options' in selectdMenuItem) {
                runMenu(selectdMenu)
            } else {
                console.log(selectdMenuItem.title)
                selectdMenuItem.function(runMenu)
            }
        }
    })
}

function createMenuQuestion(currMenu) {
    return currMenu.options.reduce((prevStr, option, index) => {
        return prevStr + '[' + (index + 1) + '] ' + menu[option].title + '\n'
    }, '')
}

const menu = {
    main: {
        title: 'Main menu',
        options: ['users', 'groups', 'usersToGroups']
    },
    users: {
        title: 'Users',
        options: ['createOrDeleteUser', 'printUsers']
    },
    createOrDeleteUser: {
        title: 'Create / delete users',
        options: ['createNewUser', 'deleteUser']
    },
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
    printUsers: {
        title: 'Get a list of users in the system (list of usernames)',
        function: printUsers
    },
    createNewUser: {
        title: 'Create user',
        function: createNewUser
    },
    deleteUser: {
        title: 'Delete user',
        function: deleteUser
    },
    printGroups: {
        title: 'Get a list of groups in the system',
        function: printGroups
    },
    createNewgroup: {
        title: 'Create group',
        function: createNewgroup
    },
    deleteGroup: {
        title: 'Delete group',
        function: deleteGroup
    },
    printGroupsAndUsers: {
        title: 'Get a list of groups and users under each group',
        function: printGroupsAndUsers
    },
    addUserToGroup: {
        title: 'Add user to group',
        function: addUserToGroup
    },
    removeUserFromGroup: {
        title: 'Remove user from group',
        function: removeUserFromGroup
    }
}

function createNewUser(callback) {
    rl.question('Enter Username: ', (username) => {
        rl.question('Enter Password: ', (password) => {
            rl.question('Enter Age: ', (age) => {
                try {
                    ChatController.createNewUser(username, password, age)
                } catch (e) {
                    console.log(e.message)
                }
                callback()
            })
        })
    })
}

function deleteUser(callback) {
    rl.question('Enter Username: ', (username) => {
        try {
            ChatController.deleteUser(username)
        } catch (e) {
            console.log(e.message)
        }
        callback()
    })
}

function printUsers(callback) {
    ChatController.printUsers()
    callback()
}

function createNewgroup(callback) {
    rl.question('Enter group name: ', (groupname) => {
        try {
            ChatController.createNewgroup(groupname)
        } catch (e) {
            console.log(e.message)
        }
        callback()
    })
}

function deleteGroup(callback) {
    rl.question('Enter group name: ', (groupname) => {
        try {
            ChatController.deleteGroup(groupname)
        } catch (e) {
            console.log(e.message)
        }
        callback()
    })
}

function printGroups(callback) {
    ChatController.printGroups()
    callback()
}

function addUserToGroup(callback) {
    rl.question('Enter username: ', (username) => {
        rl.question('Enter group name: ', (groupname) => {
            try {
                ChatController.addUserToGroup(username, groupname)
            } catch (e) {
                console.log(e.message)
            }
            callback()
        })
    })
}

function removeUserFromGroup(callback) {
    rl.question('Enter username: ', (username) => {
        rl.question('Enter group name: ', (groupname) => {
            try {
                ChatController.removeUserFromGroup(username, groupname)
            } catch (e) {
                console.log(e.message)
            }
            callback()
        })
    })
}

function printGroupsAndUsers(callback) {
    ChatController.printGroupsAndUsers()
    callback()
}
