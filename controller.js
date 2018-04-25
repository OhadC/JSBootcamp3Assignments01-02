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

}

function getListOfUsers() {

}

function createNewgroup() {

}

function deleteGroup() {

}

function printGroups() {

}

function addUserToGroup() {

}

function removeUserToGroup() {

}

function printGroupsAndUsers() {

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
            function: getListOfUsers
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
            function: removeUserToGroup
        }
    ]
}

function getMenuQuestion(menu) {
    return menu.reduce((prevStr, choice, index) => {
        return prevStr + '[' + (index + 1) + '] ' + choice.name + '\n'
    }, '')
}

function questionCallback(answer, prevMenu) {
    let nextFunction
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
