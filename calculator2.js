class Calculator {
  constructor(prevOperatorElement, currentOperatorElement) {
    this.prevOperatorElement = prevOperatorElement;
    this.currentOperatorElement = currentOperatorElement;
    this.clear();
  }

  clear() {
    this.currentOperator = 0;
    this.prevOperator = 0;
    history = []
    this.operation = undefined;
  }

  delete() {
    this.currentOperator = this.currentOperator.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === "." && this.currentOperator.includes(".")) return;
    this.currentOperator = this.currentOperator.toString() + number.toString();
  }

  newOperation(operation) {
    if (this.currentOperator === "") return;
    if (this.prevOperator !== "")
    {
      this.compute();
    }

    if (history !== ['']){
      this.currentOperator = history[0]
    }

    this.operation = operation;
    this.prevOperator = this.currentOperator;
    this.currentOperator = "";
  }

  compute() {
    let calc;
    const prev = parseFloat(this.prevOperator);
    const current = parseFloat(this.currentOperator);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "-":
        calc = prev - current;
        break;
      case "+":
        calc = prev + current;
        break;
      case "/":
        calc = prev / current;
        break;
      case "X":
        calc = prev * current;
        break;
      default:
        return;
    }
    this.currentOperator = calc;
    history.push(this.currentOperator)
    this.operation = undefined;
    this.prevOperator = "";
  }

  displayNum(number) {
    const stringfynumber = number.toString();
    const integers = parseFloat(stringfynumber.split(".")[0]);
    const decimals = stringfynumber.split(".")[1];
    let integerResult;
    if (isNaN(integers)) {
      integerResult = "";
    } else {
      integerResult = integers.toLocaleString("en", {
        maximumFractionDigits: 0
      });
    }
    if (decimals != null) {
      return `${integerResult}.${decimals}`;
    } else {
      return integerResult;
    }
  }

  updateResult() {
    this.currentOperatorElement.innerText = this.displayNum(
      this.currentOperator
    );
    if (this.operation != null) {
      this.prevOperatorElement.innerText = `${this.displayNum(
        this.prevOperator
      )} ${this.operation}`;
    } else {
      this.prevOperatorElement.innerText = "";
    }
  }
}

const numericKeys = document.querySelectorAll("[numeric]");
const operationals = document.querySelectorAll("[operationals]");
const equalsBtn = document.querySelector("[equals]");
const delBtn = document.querySelector("[del]");
const clearBtn = document.querySelector("[clr]");
const prevOperatorElement = document.querySelector("[prev]");
const currentOperatorElement = document.querySelector("[current]");
let history = []


const calculator = new Calculator(prevOperatorElement, currentOperatorElement);

numericKeys.forEach(button => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateResult();
  });
});

operationals.forEach(button => {
  button.addEventListener("click", () => {
    calculator.newOperation(button.innerText);
    calculator.updateResult();
  });
});

equalsBtn.addEventListener("click", () => {
  calculator.compute();
  calculator.updateResult();
});

clearBtn.addEventListener("click", () => {
  calculator.clear();
  calculator.updateResult();
});

delBtn.addEventListener("click", () => {
  calculator.delete();
  calculator.updateResult();
});
