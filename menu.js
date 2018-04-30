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
    for (const menuName in menu) {
        if (menuName === 'main') {
            menu[menuName].push({
                title: 'Exit',
                function: () => rl.close()
            })
        } else {
            menu[menuName].push({
                title: 'Return to Main',
                nextMenu: 'main'
            })
        }
    }
}

function runMenu(currMenuName) {
    const currMenu = menu[currMenuName || 'main']
    rl.question(createMenuQuestion(currMenu), answer => {
        answer = +answer
        if (!answer || answer <= 0 || answer > currMenu.length) {
            console.log('Wrong input! Try again:')
            runMenu(currMenuName)
        } else {
            const selectdMenu = currMenu[answer - 1]
            console.log(selectdMenu.title)

            if ('nextMenu' in selectdMenu) {
                runMenu(selectdMenu.nextMenu)
            } else {
                selectdMenu.function(runMenu)
            }
        }
    })
}

function createMenuQuestion(currMenu) {
    return currMenu.reduce((prevStr, choice, index) => {
        return prevStr + '[' + (index + 1) + '] ' + choice.title + '\n'
    }, '')
}

const menu = {
    main: [
        {
            title: 'Users',
            nextMenu: 'users'
        }, {
            title: 'Groups',
            nextMenu: 'groups'
        }, {
            title: 'Users to Groups association',
            nextMenu: 'usersToGroups'
        }
    ],
    users: [
        {
            title: 'Create / delete users',
            nextMenu: 'createOrDeleteUser'
        }, {
            title: 'Get a list of users in the system (list of usernames)',
            function: printUsers
        }
    ],
    createOrDeleteUser: [
        {
            title: 'Create user',
            function: createNewUser
        }, {
            title: 'Delete user',
            function: deleteUser
        }
    ],
    groups: [
        {
            title: 'Create / delete groups',
            nextMenu: 'createOrDeleteGroups'
        }, {
            title: 'Get a list of groups in the system',
            function: printGroups
        }
    ],
    createOrDeleteGroups: [
        {
            title: 'Create group',
            function: createNewgroup
        }, {
            title: 'Delete group',
            function: deleteGroup
        }
    ],
    usersToGroups: [
        {
            title: 'Add / remove user to / from group',
            nextMenu: 'addOrRemoveFromGroup'
        }, {
            title: 'Get a list of groups and users under each group',
            function: printGroupsAndUsers
        }
    ],
    addOrRemoveFromGroup: [
        {
            title: 'Add user to group',
            function: addUserToGroup
        }, {
            title: 'Remove user to group',
            function: removeUserFromGroup
        }
    ]
}

function createNewUser(callback) {
    rl.question('Enter Username: \n', (username) => {
        rl.question('Enter Password: \n', (password) => {
            rl.question('Enter Age: \n', (age) => {
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
    rl.question('Enter Username: \n', (username) => {
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
    rl.question('Enter group name: \n', (groupname) => {
        try {
            ChatController.createNewgroup(groupname)
        } catch (e) {
            console.log(e.message)
        }
        callback()
    })
}

function deleteGroup(callback) {
    rl.question('Enter group name: \n', (groupname) => {
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
}

function addUserToGroup(callback) {
    rl.question('Enter username: \n', (username) => {
        rl.question('Enter group name: \n', (groupname) => {
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
    rl.question('Enter username: \n', (username) => {
        rl.question('Enter group name: \n', (groupName) => {
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
