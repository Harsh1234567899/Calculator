class Calculator {
    constructor(previousOperandTextElement,currentOperandTextElement){
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
    }


clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
}

delete() {
    this.currentOperand = this.currentOperand.toString().slice(0,-1)
}

appendNumber(number) {
    const nonDeccimal = this.currentOperand.replace('.','').length // remove '.' from counting in number for give length
    if (number === '.' && this.currentOperand.includes('.')) return
    if (nonDeccimal >= 12 && number != '.') return
    this.currentOperand = this.currentOperand.toString() + number.toString()
}

chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== ''){
        this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
}

compute(){
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current))return
    switch(this.operation){
        case '+':
            computation = prev + current
            break
        case '-':
            computation = prev - current
            break
        case '*':
            computation = prev * current
            break
        case '/':
            if (current === 0){
                alert("not divisoin by zero '0'")
            }
            else{
            computation = prev / current
            break
            }
        case '%':
            computation  = (prev / current) * 100;
            break
        default:
            return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
}

getDishplayNumber(number){
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)){
        integerDisplay = ''
    } else {
        integerDisplay = integerDigits.toLocaleString('en', {
            maximumFractionDigits : 0
        })
    }
    if (decimalDigits != null){
        return `${integerDisplay}.${decimalDigits}`
    }
    else{
        return integerDisplay
    }
}

// updateDisplay(){ // error of not soving a operator on dishplay
//     this.currentOperandTextElement.innerText = this.currentOperand
//     this.previousOperandTextElement.innerText = this.previousOperand + this.operation
// }
updateDisplay() { //chat gpt solve error of not dishplay operator
    this.currentOperandTextElement.innerText = this.getDishplayNumber(this.currentOperand)
    if (this.operation != null) {
        this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
    } else {
        this.previousOperandTextElement.innerText = this.previousOperand;
    }
}

persentage() { 
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
        case '*':
            this.currentOperand = (prev * current) / 100;
            this.previousOperand = ''
            this.operation = undefined
            break;
        case '/':
            this.currentOperand = (prev / current) * 100;
            this.previousOperand = ''
            this.operation = undefined
            break;
        default:
            alert("Percentage operation is only valid for multiplication or division.");
            return;
    }
}

}
const numberButton = document.querySelectorAll('[data-number]')
const operationButton = document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const persentage = document.querySelector('[data-persentage]') // add by me
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement)

numberButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

persentage.addEventListener('click', button => {
    calculator.persentage()
    calculator.updateDisplay()
})