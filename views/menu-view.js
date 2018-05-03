const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

module.exports = class MenuView {

    printMenu(currMenu, menuObj, handleInput) {
        const currentMenuObj = menuObj[currMenu]
        console.log(currentMenuObj.title)
        rl.question(this.createMenuQuestion(currMenu, menuObj), handleInput)
    }

    createMenuQuestion(currMenu, menuObj) {
        const currentMenuObj = menuObj[currMenu]
        return currentMenuObj.options.reduce((prevStr, option, index) => {
            return prevStr + '[' + (index + 1) + '] ' + menuObj[option].title + '\n'
        }, '')
    }
}