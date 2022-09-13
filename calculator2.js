
class Calculator {
    constructor (prevOperatorElement, currentOperatorElement) {
        this.prevOperatorElement = prevOperatorElement
        this.currentOperatorElement = currentOperatorElement
        this.clear()
    }

    clear() {
        this.currentOperator = ''
        this.prevOperator= ''
        this.evaluate = undefined
    }

    delete() {
        this.currentOperator = this.currentOperator.toString().slice(0, -1)
    }

    appendNumber(no) {
        if(no === '.' && this.currentOperator.includes('.')) return
        this.currentOperator = this.currentOperator.toString() + no.toString()
    }

    operation(evaluate) {
        if(this.currentOperator === '') return
        if(this.currentOperator !== '') {
            this.calculate
        }
        this.evaluate = evaluate
        this.prevOperator = this.currentOperator
        this.currentOperator = ''
    }

    calculate() {
        let calc
        const prev = parseFloat(this.prevOperator)
        const current = parseFloat(this.currentOperator)
        if(isNaN(prev) || isNaN(current)) return
        switch (this.evaluate) {
            case '-':
                calc = prev - current
                break
            case '+':
                calc = prev + current
                break
            case '/':
                calc = prev / current
                break
            case 'X':
                calc = prev * current
                break
            default:
                return
        }
        this.currentOperator = calc
        this.evaluate = undefined
        this.prevOperator = ''
    }

    displayNum(no) {
        const number = no.toString()
        const integers = parseFloat(number.split('.')[0])
        const decimals = number.split('.')[1]
        let integerResult
        if(isNaN(integers)) {
            integerResult = ''
        } else {
            integerResult = integers.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if(decimals !== null) {
            return `${integers}.${decimals}`
        } else {
            return integers
        }
    }

    updateResult() {
        this.currentOperatorElement.innerText = this.displayNum(this.currentOperator) 
        if(this.evaluate !== null) {
            this.prevOperatorElement.innerText= `${this.displayNum(this.prevOperator)} ${this.evaluate}`
        } else {
            this.prevOperatorElement.innerText = ''
        }
    }
}

const numericKeys = document.querySelectorAll('[numeric]')
const operationals = document.querySelectorAll('[operationals]')
const equalsBtn = document.querySelector('[equals]')
const delBtn = document.querySelector('[del]')
const clearBtn = document.querySelector('[clr]')
const prevOperatorElement = document.querySelector('[prev]')
const currentOperatorElement = document.querySelector('[current]')

const calculator = new Calculator(prevOperatorElement, currentOperatorElement) 

numericKeys.forEach(button => {
    button.addEventListener('click', () => {
        console.log(5);
        calculator.appendNumber(button.innerText)
        calculator.updateResult()
    })
})

operationals.forEach(button => {
    button.addEventListener('click', () => {
        calculator.operation(button.innerText)
        calculator.updateResult()
    })
})

equalsBtn.addEventListener('click', () => {
    calculator.calculate()
    calculator.updateResult()
})

clearBtn.addEventListener('click', ()  => {
    calculator.clear()
    calculator.updateResult()
})

delBtn.addEventListener('click', () => {
    calculator.delete()
    calculator.updateResult()
})



















