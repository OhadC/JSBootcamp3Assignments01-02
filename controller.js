const readline = require('readline')
const db = require('./db')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function createNewUser() {
    rl.question('Enter Username: \n', (uesrname) => {
        rl.question('Enter Password: \n', (password) => {
            rl.question('Enter Age: \n', (age) => {
                db.users.createUser(uesrname, password, age)
                controller()
            })
        })
    })
}

function deleteUser() {
    rl.question('Enter Username: \n', (uesrname) => {
        db.users.deleteUser(uesrname)
        controller()
    })
}

function printUsers() {
    const users = db.users.users
    for (let user of users) {
        console.log(user.name)
    }
    controller()
}

function createNewgroup() {
    rl.question('Enter group name: \n', (groupName) => {
        db.groups.createGroup(groupName)
        controller()
    })
}

function deleteGroup() {
    rl.question('Enter group name: \n', (groupName) => {
        db.groups.deleteGroup(groupName)
        controller()
    })
}

function printGroups() {
    const groups = db.groups.groups
    for (let group of groups) {
        console.log(group.name)
    }
    controller()
}

function addUserToGroup() {
    rl.question('Enter username: \n', (username) => {
        rl.question('Enter group name: \n', (groupName) => {
            db.groups.addUserToGroup(groupName, username)
            controller()
        })
    })
}

function removeUserFromGroup() {
    rl.question('Enter username: \n', (username) => {
        rl.question('Enter group name: \n', (groupName) => {
            db.groups.removeUserFromGroup(groupName, username)
            controller()
        })
    })
}

function printGroupsAndUsers() {
    const groups = db.groups.groups
    for (let group in groups) {
        console.log(group.name)
        for (let user in group.users) {
            console.log('/t', user.name, '(' + user.age + ')')
        }
    }
    controller()
}

const menus = {
    main: [
        {
            name: 'Users',
            menu: 'users'
        }, {
            name: 'Groups',
            menu: 'groups'
        }, {
            name: 'Users to Groups association',
            menu: 'usersToGroups'
        }
    ],
    users: [
        {
            name: 'Create / delete users',
            menu: 'createOrDeleteUser'
        }, {
            name: 'Get a list of users in the system (list of usernames)',
            function: printUsers
        }
    ],
    createOrDeleteUser: [
        {
            name: 'Create user',
            function: createNewUser
        }, {
            name: 'Delete user',
            function: deleteUser
        }
    ],
    groups: [
        {
            name: 'Create / delete groups',
            menu: 'createOrDeleteGroups'
        }, {
            name: 'Get a list of groups in the system',
            function: printGroups
        }
    ],
    createOrDeleteGroups: [
        {
            name: 'Create group',
            function: createNewgroup
        }, {
            name: 'Delete group',
            function: deleteGroup
        }
    ],
    usersToGroups: [
        {
            name: 'Add / remove user to / from group',
            menu: 'addOrRemoveFromGroup'
        }, {
            name: 'Get a list of groups and users under each group',
            function: printGroupsAndUsers
        }
    ],
    addOrRemoveFromGroup: [
        {
            name: 'Add user to group',
            function: addUserToGroup
        }, {
            name: 'Remove user to group',
            function: removeUserFromGroup
        }
    ]
}

function getMenuQuestion(menu) {
    return menu.reduce((prevStr, choice, index) => {
        return prevStr + '[' + (index + 1) + '] ' + choice.name + '\n'
    }, '')
}

function questionCallback(answer, prevMenu) {
    let nextFunction = function () {
        rl.question(getMenuQuestion(prevMenu), (answer) => {
            questionCallback(answer, prevMenu)
        })
    }
    if (!!+answer && +answer > 0 && +answer <= prevMenu.length) {
        const selectdChoice = prevMenu[+answer - 1]
        console.log(selectdChoice.name)
        if (selectdChoice['menu']) {
            const currMenu = menus[selectdChoice.menu]
            nextFunction = function () {
                rl.question(getMenuQuestion(currMenu), (answer) => {
                    questionCallback(answer, currMenu)
                })
            }
        } else {
            nextFunction = selectdChoice.function
        }
    }
    nextFunction()
}

function controller() {
    const currMenu = menus['main']

    rl.question(getMenuQuestion(currMenu), (answer) => {
        questionCallback(answer, currMenu)
    })
}

module.exports = controller