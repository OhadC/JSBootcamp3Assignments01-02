"use strict";

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

    const { runMenu, menu } = require('./menu')
    addOptionsToMenu(menu, rl, db)

    runMenu(menu, rl, db)

    function addOptionsToMenu(menu, rl, db) {
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
})()
