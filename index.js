const display = document.getElementById('butn');
const buttons = document.querySelectorAll('.box button');
const reset = document.getElementById('bx17');
const equals = document.getElementById('bx18');

let firstOperand = "";  // Renamed for clarity
let operator = "";
let currentInput = "";  // Renamed for clarity

// Update display function to show the current operation
function updateDisplay() {
    if (firstOperand && operator && currentInput) {
        display.value = `${firstOperand} ${operator} ${currentInput}`;
    } else if (firstOperand) {
        display.value = `${firstOperand}`;
    } else {
        display.value = currentInput;
    }
}

// Add event listeners to all buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === 'Del') {
            // Handle 'Del' button to delete last character
            currentInput = currentInput.slice(0, -1);
            updateDisplay();

        } else if (value === 'Reset') {
            // Handle 'Reset' button to clear all inputs
            firstOperand = "";
            operator = "";
            currentInput = "";
            updateDisplay();

        } else if (['+', 'x', '-', '/'].includes(value)) {
            // Handle operator buttons
            if (currentInput) {
                firstOperand = currentInput;
                currentInput = "";
            }
            operator = value === 'x' ? '*' : value; // Convert 'x' to '*' for eval
            updateDisplay();

        } else if (value === '=') {
            // Handle '=' button to calculate the result
            if ( operator && currentInput) {
                try {
                    const result = eval(`${firstOperand} ${operator} ${currentInput}`);
                    display.value = result;
                    //firstOperand = result;
                    operator = "";
                    currentInput = "";
                } catch (error) {
                    display.value = 'error'; // Handle any errors
                }
            }

        } else {
            // Handle numeric and decimal button clicks
            currentInput += value;
            updateDisplay();
        }
    });
});
