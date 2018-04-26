const readline = require('readline')
const db = {
    users: new (require('./db/users'))(),
    groups: new (require('./db/groups'))()
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function createNewUser() {
    rl.question('Enter Username: \n', (username) => {
        rl.question('Enter Password: \n', (password) => {
            rl.question('Enter Age: \n', (age) => {
                db.users.createUser(username, password, age)
                showMenu()
            })
        })
    })
}

function deleteUser() {
    rl.question('Enter Username: \n', (username) => {
        if (db.users.deleteUser(username)) {
            db.groups.removeUserFromAllGroups(username)
        }
        showMenu()
    })
}

function printUsers() {
    const users = db.users.getAllUsers()
    users.map(user => console.log(user.name))
    showMenu()
}

function createNewgroup() {
    rl.question('Enter group name: \n', (groupName) => {
        db.groups.createGroup(groupName)
        showMenu()
    })
}

function deleteGroup() {
    rl.question('Enter group name: \n', (groupName) => {
        db.groups.deleteGroup(groupName)
        showMenu()
    })
}

function printGroups() {
    const groups = db.groups.getAllGroups()
    groups.map(group => {
        console.log(group.name)
    })
    showMenu()
}

function addUserToGroup() {
    rl.question('Enter username: \n', (username) => {
        rl.question('Enter group name: \n', (groupName) => {
            const user = db.users.getUser(username)
            if (user) {
                db.groups.addUserToGroup(groupName, user)
            }
            showMenu()
        })
    })
}

function removeUserFromGroup() {
    rl.question('Enter username: \n', (username) => {
        rl.question('Enter group name: \n', (groupName) => {
            db.groups.removeUserFromGroup(groupName, username)
            showMenu()
        })
    })
}

function printGroupsAndUsers() {
    const groups = db.groups.getAllGroups()
    groups.map(group => {
        console.log(group.name)
        const groupUsers = group.getAllUsers()
        groupUsers.map(user => console.log('\t', user.name, '(' + user.age + ')'))
    })
    showMenu()
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

function createMenuQuestion(menu) {
    return menu.reduce((prevStr, choice, index) => {
        return prevStr + '[' + (index + 1) + '] ' + choice.name + '\n'
    }, '')
}

function questionCallback(answer, prevMenu) {
    let nextFunction
    answer = +answer
    if (!!answer && answer > 0 && answer <= prevMenu.length) {
        const selectdChoice = prevMenu[answer - 1]
        console.log(selectdChoice.name)
        if (selectdChoice['menu']) {
            nextFunction = () => showMenu(selectdChoice.menu)
        } else {
            nextFunction = selectdChoice.function
        }
    } else {
        console.log('Wrong input! Try again:')
        nextFunction = showMenu
    }
    nextFunction()
}

function showMenu(menuName) {
    const currMenu = menus[menuName || 'main']

    rl.question(createMenuQuestion(currMenu), (answer) => {
        questionCallback(answer, currMenu)
    })
}

module.exports = { showMenu }