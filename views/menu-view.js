const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

module.exports = class menuView {

    static printMenu(currMenu, menuObj, handleInput) {
        const currentMenuObj = menuObj[currMenu]
        console.log(currentMenuObj.title)
        rl.question(menuView.createMenuQuestion(currMenu, menuObj), handleInput)
    }

    static createMenuQuestion(currMenu, menuObj) {
        const currentMenuObj = menuObj[currMenu]
        return currentMenuObj.options.reduce((prevStr, option, index) => {
            return prevStr + '[' + (index + 1) + '] ' + menuObj[option].title + '\n'
        }, '')
    }

    static getInput(questionsArray, callback, answers){
        answers = answers || []
        rl.question(questionsArray.shift(), checkIfDone)

        function checkIfDone(answer){
            answers.push(answer)

            if(questionsArray.length){
                menuView.getInput(questionsArray, callback, answers)
            } else {
                callback(answers)
            }
        }
    }
}
