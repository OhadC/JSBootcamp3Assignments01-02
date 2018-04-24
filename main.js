const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const mainMenu = () => {
    // show options
    rl.question('Your option: ', answer => {
        let nextMenu
        switch (+answer) {
            case 1:
                nextMenu = usersMenu
                break
            case 2:
                nextMenu = groupsMenu
                break
            case 3:
                nextMenu = usersToGroupsMenu
                break
            default:
                nextMenu = mainMenu
                break
        }
        nextMenu()
    })
}

const usersMenu = () => {
}

const groupsMenu = () => {
}

const usersToGroupsMenu = () => {
}
