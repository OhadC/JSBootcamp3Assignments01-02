(function init() {

    const readline = require('readline')
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    const db = {
        users: new (require('./db/users'))(),
        groups: new (require('./db/groups'))()
    }
    const menu = require('./menu')
    addReturnToMainOption(menu)

    showMenu()

    function showMenu(menuName) {
        const currMenu = menu[menuName || 'main']

        rl.question(createMenuQuestion(currMenu), (answer) => {
            questionCallback(answer, currMenu)
        })
    }

    function createMenuQuestion(menu) {
        return menu.reduce((prevStr, choice, index) => {
            return prevStr + '[' + (index + 1) + '] ' + choice.name + '\n'
        }, '')
    }

    function questionCallback(answer, prevMenu) {
        answer = +answer
        if (!!answer && answer > 0 && answer <= prevMenu.length) {
            const selectdChoice = prevMenu[answer - 1]
            console.log(selectdChoice.name)
            if (selectdChoice['menu']) {
                showMenu(selectdChoice.menu)
            } else {
                selectdChoice.function(showMenu, rl, db)
            }
        } else {
            console.log('Wrong input! Try again:')
            showMenu()
        }
    }

    function addReturnToMainOption(menu){
        for (let menuName in menu) {
            if (menuName !== 'main') {
                menu[menuName].push({
                    name: 'Return to Main',
                    menu: 'main'
                })
            }
        }
    }
})()
