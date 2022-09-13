const display = document.querySelector('.display')
const controlButtons = document.querySelector('.controls').children
const allSymbols = ['+', '-', 'X', '÷', 'C', '%', '=', 'CE']


let firstValue = ''
let secondValue = ''
let symbol = ''
let result = ''

const calculate = () => {
    firstValue = parseFloat(firstValue)
    secondValue = parseFloat(secondValue)

    if(symbol === '+') result = firstValue + secondValue
    if(symbol === '-') result = firstValue - secondValue
    if(symbol === '÷') result = firstValue / secondValue
    if(symbol === 'X') result = firstValue * secondValue
    if(symbol === '%') result = firstValue % secondValue

    display.innerText = result
    firstValue = result
    secondValue = ''
}

for (let button of controlButtons) {
    button.addEventListener('click', () => {
        const { innerText: btnvalue } = button
        const btnValueIsSymbol = allSymbols.includes(btnvalue)

        if (!secondValue && btnvalue === '=') return null

        if(firstValue === btnValueIsSymbol) return null 
        
        if(btnvalue === "C") {
            firstValue = secondValue = symbol
            return display.innerText = ''
        }


        if(firstValue && btnValueIsSymbol ) {
            secondValue && calculate()
            symbol = btnvalue
        }

        if (btnvalue === 'CE') {
            firstValue = secondValue = symbol
            return display.innerText.toString().slice(0, -1)
        }


        else if (!symbol) firstValue += btnvalue

        else if(symbol) secondValue += btnvalue

        if (btnvalue !== '=') display.innerText += btnvalue
    })
}


















