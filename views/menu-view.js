const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

module.exports = class menuView {

    static chooseOne(options, callback) {
        const optionsLength = options.length - 1
        const question = optionsToQuestion()
        chooseOneInternal()

        function optionsToQuestion() {
            return options.reduce((prevStr, option, index) => {
                return prevStr + '[' + (index + 1) + '] ' + option + '\n'
            }, '')
        }
        function chooseOneInternal() {
            rl.question(question, answer => {
                const optionIndex = +answer - 1
                if (isNaN(optionIndex) || optionIndex < 0 || optionIndex > optionsLength) {
                    console.log('Wrong input! Try again:')
                    chooseOneInternal()
                } else {
                    callback(optionIndex)
                }
            })
        }
    }

    static getInput(questions, callback) { // questions: [{question: string, answerType: 'string'/'number'}]
        const answers = []
        const questionsLength = questions.length
        let currQuestionIndex = 0
        ask()

        function ask() {
            const currQuestionObj = questions[currQuestionIndex]
            rl.question(currQuestionObj.question, answer => {
                if (!validateInput(questions[currQuestionIndex], answer)) {
                    console.log('Wrong input! Try again:')
                    ask()
                } else {
                    currQuestionIndex++
                    answers.push(answer)
                    if (currQuestionIndex < questionsLength) {
                        ask()
                    } else {
                        callback(answers)
                    }
                }
            })
        }
        function validateInput(question, answer) {
            const answerType = question['type']
            if(!question['type']) return true
            switch (answerType) {
                case 'string':
                    return !!answer.trim()
                case 'number':
                    return !isNaN(+answer)
                default:
                    return true
            }
        }
    }
}
