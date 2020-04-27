class CalcController {

    constructor() {

        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this.inicialize();
        this.inicializeButtons();
    }

    inicialize() {

        setInterval(() => {
            this.setDisplayDateTime();
        }, 1000)
    }


    setDisplayDateTime() {

        this.displayDate = this.currentDate.toLocaleDateString(this._locale);
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    addEventListenerAll(element, events, fn) {
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn)
        })
    }

    execButton(value) {

        switch (value) {
            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'soma':
                this.addOperation('+');
                break;
            case 'subtracao':
                this.addOperation('-');
                break;
            case 'divisao':
                this.addOperation('/');
                break;
            case 'multiplicacao':
                this.addOperation('*');
                break;
            case 'porcento':
                this.addOperation('%');
                break;
            case 'igual':
                break;
            case '.':
                this.addOperation('.');
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(value);
                break;
            default:
                this.setError();
                break;
        };
    }


    setError() {
        this.displayCalc = "ERROR";
        this.di
    }
    clearAll() {
        this._operation = [];
    }

    clearEntry() {
        this._operation.pop();
    }

    getLastOperation() {
        return this._operation[this._operation.length - 1];
    }


    setLastOperation(value) {
        this._operation[this._operation.length - 1] = value
    }
    isOperator(value) {
        return (['+', '-', '*', '/', '%'].indexOf(value) > -1);
    }

    pushOperation(value) {
        this._operation.push(value);
        if (this._operation.length > 3) {
            this.calc();
        }
    }

    calc() {
        let last = this._operation.pop();
        let result = eval(this._operation.join(""));
        this._operation = [result, last]
        this.setLastNumberToDisplay();
    }

    setLastNumberToDisplay() {
        let lastNumber;
        for (let i = this._operation.length - 1; i >= 0; i--) {
            if (!this.isOperator(this._operation[i])) {
                lastNumber = this._operation[i]
                break;
            }
        }
        this.displayCalc = lastNumber
    }

    addOperation(value) {
        if (isNaN(this.getLastOperation())) {

            if (this.isOperator(value)) {
                this.setLastOperation(value)
            } else if (isNaN(value)) {
                //tratar
            } else {
                this._operation.push(parseInt(value));
                this.setLastNumberToDisplay();
            }
        } else {

            if (this.isOperator(value)) {
                this.pushOperation(value)
            }
            else if (isNaN(value)) {
                //tratar
            } else {
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(parseInt(newValue));
                this.setLastNumberToDisplay();
            }

        };
        console.log(this._operation)
    }

    inicializeButtons() {

        let buttons = document.querySelectorAll("#buttons >g, #parts >g");

        buttons.forEach((btn, index) => {
            this.addEventListenerAll(btn, 'click drag', e => {

                let textBtn = btn.className.baseVal.replace("btn-", "");
                this.execButton(textBtn)
            });

            this.addEventListenerAll(btn, 'mouseover mouseup mousedown', e => {
                btn.style.cursor = 'pointer'
            });

        });

    }

    get displayCalc() {
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value) {
        this._displayCalcEl.innerHTML = value;
    }

    get displayTime() {
        return this._timeEl.innerHTML;
    }

    set displayTime(value) {
        this._timeEl.innerHTML = value
    }

    get displayDate() {
        return this._dateEl.innerHTML;
    }

    set displayDate(value) {
        this._dateEl.innerHTML = value
    }

    set currentDate(value) {
        this._currentDate = value;
    }

    get currentDate() {
        return new Date();
    }

}