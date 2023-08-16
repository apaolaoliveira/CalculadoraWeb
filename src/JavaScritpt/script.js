class Calculator {
    
    keys = document.querySelectorAll('.key');
    displayInput = document.querySelector('.display .input');
    displayOutput = document.querySelector('.display .output');
    input = "";
    
    constructor(){
        this.AddClickListeners();
    }

    AddClickListeners(){
        this.keys.forEach(key =>{
            key.addEventListener('click', () => this.ManageKeyClick(key.dataset.key));
        });
    }

    ManageKeyClick(value){
        switch(value){

            case "backspace":
                this.input = this.input.slice(0, -1);
                this.UpdateDisplay();
                break;

            case "brackets":
                this.ToggleBrackets();
                break;

            case "clear":
                this.ClearInput();
                break;

            case "=":
                this.CalculateResult();
                break;           
            
            default:
                this.ManageNumberOrOperator(value);
        }
    }

    ManageNumberOrOperator(value){
        if(this.ValidateInput(value)){
            this.input += value;
            this.UpdateDisplay();
        }
    }

    UpdateDisplay(){
        this.displayInput.innerHTML = this.CleanInput(this.input);
        this.displayOutput.innerHTML = "";
    }

    CalculateResult(){
        const prepareInput = this.PrepareInput(this.input);

        try{
            const result = eval(prepareInput);
            this.displayOutput.innerHTML = this.CleanOutput(result);
            this.displayInput.innerHTML += ' <span class="operator"> = ';
        } catch (error){
            return;
        }
    }

    PrepareInput(input) {
        return input.replace(/%/g, '/100');
    }

    ClearInput(){
        this.input = "";
        this.UpdateDisplay();
    }

    CleanInput(input) {
        return input.replace(/(\*|\/|\+|-)/g, match => {
            return match === "*" ? "x" : match === "/" ? "÷" : match;
        })
        .replace(/%/g, '<span class="percent">%</span>')
        .replace(/([x÷+\-])/g, ' <span class="operator">$1</span> ')
        .replace(/\(/g, '<span class="brackets">(</span>')
        .replace(/\)/g, '<span class="brackets">)</span>');
    }

    ValidateInput(value){
        const lastInput = this.input.slice(-1);
        const operators = ["+", "-", "*", "/"];

        if (value === "." && lastInput === ".") {
            return false;
        }

        if (operators.includes(value) && operators.includes(lastInput)) {
            return false;
        }

        return true;
    }

    CleanOutput(output) {
        return output.toLocaleString(); // Format the number based on regional settings
    }

    ToggleBrackets() {
        if (this.input.includes("(")) {
            this.input += ")";
        } else {
            this.input += "(";
        }
        this.UpdateDisplay();
    }
}

window.addEventListener('load', () => new Calculator());
