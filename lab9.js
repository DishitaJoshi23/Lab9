let form = document.querySelector('form');
form.addEventListener('submit', e => {
    e.preventDefault();
    let output = document.querySelector('output');
    let firstNum = document.querySelector('#first-num').value;
    let secondNum = document.querySelector('#second-num').value;
    let operator = document.querySelector('#operator').value;
    
    //step 3
    try {
    if (firstNum === '' || secondNum === '') {
        throw new ValidationError("Both fields are required.");
    }
    if (isNaN(firstNum) || isNaN(secondNum)) {
        throw new ValidationError("Inputs must be valid numbers.");
    }
    if (operator === '/' && Number(secondNum) === 0) {
        throw new DivisionByZeroError("Cannot divide by zero.");
    }

    output.innerHTML = eval(`${firstNum} ${operator} ${secondNum}`);

    } catch (err) {
    if (err instanceof ValidationError) {
        output.innerHTML = `Validation Error: ${err.message}`;
        console.error(`[${err.name}]`, err.message);
    } else if (err instanceof DivisionByZeroError) {
        output.innerHTML = `Math Error: ${err.message}`;
        console.error(`[${err.name}]`, err.message);
    } else {
        output.innerHTML = `Unexpected Error: ${err.message}`;
        console.error("Unexpected error:", err);
    }
    } finally {
    console.log("Calculator evaluation attempt finished.");
    }
});


let errorBtns = Array.from(document.querySelectorAll('#error-btns > button'));


// Step 4
class ValidationError extends Error {
    constructor(message) {
      super(message);
      this.name = "ValidationError";
    }
  }
  
  class DivisionByZeroError extends Error {
    constructor(message) {
      super(message);
      this.name = "DivisionByZeroError";
    }
  }
  
  // Step 2
  function getCalcState() {
    return {
      firstNum: document.querySelector('#first-num').value,
      operator: document.querySelector('#operator').value,
      secondNum: document.querySelector('#second-num').value,
      result: document.querySelector('output').innerHTML,
    };
  }
  
  // Console Log
  errorBtns[0].addEventListener('click', () => {
    console.log("Calculator state:", getCalcState());
  });
  
  // Console Error
  errorBtns[1].addEventListener('click', () => {
    console.error("Calculator state at error:", getCalcState());
  });
  
  // Console Count
  errorBtns[2].addEventListener('click', () => {
    console.count("Console Count Button");
  });
  
  // Console Warn
  errorBtns[3].addEventListener('click', () => {
    console.warn("Calculator state warning:", getCalcState());
  });
  
  // Console Assert — asserts the result is a number
  errorBtns[4].addEventListener('click', () => {
    let result = document.querySelector('output').innerHTML;
    console.assert(!isNaN(result) && result !== '', "Result is not a valid number:", getCalcState());
  });
  
  // Console Clear
  errorBtns[5].addEventListener('click', () => {
    console.clear();
  });
  
  // Console Dir — inspects the output element
  errorBtns[6].addEventListener('click', () => {
    console.dir(document.querySelector('output'));
  });
  
  // Console dirxml — shows the form markup
  errorBtns[7].addEventListener('click', () => {
    console.dirxml(document.querySelector('form'));
  });
  
  // Console Group Start
  errorBtns[8].addEventListener('click', () => {
    let state = getCalcState();
    console.group("Calculator Inputs");
    console.log("First number:", state.firstNum);
    console.log("Operator:", state.operator);
    console.log("Second number:", state.secondNum);
    console.log("Result:", state.result);
  });
  
  // Console Group End
  errorBtns[9].addEventListener('click', () => {
    console.groupEnd();
  });
  
  // Console Table - shows the calc state as a table
  errorBtns[10].addEventListener('click', () => {
    let state = getCalcState();
    console.table([
      { field: "First Number",  value: state.firstNum  },
      { field: "Operator",      value: state.operator  },
      { field: "Second Number", value: state.secondNum },
      { field: "Result",        value: state.result    },
    ]);
  });
  
  // Start Timer
  errorBtns[11].addEventListener('click', () => {
    console.time("calcTimer");
    console.log("Timer started — click 'End Timer' to stop it.");
  });
  
  // End Timer
  errorBtns[12].addEventListener('click', () => {
    console.timeEnd("calcTimer");
  });
  
  // Console Trace
  errorBtns[13].addEventListener('click', () => {
    function logCalcState() {
      console.trace("Trace from calculator state read:");
    }
    function readState() {
      logCalcState();
    }
    readState();
  });
  
  // Step 5
  
  window.onerror = function(message, source, lineno, colno, error) {
    console.log('%c[Global Error Caught via window.onerror]', 'color: red; font-weight: bold;');
    console.log(`Message : ${message}`);
    console.log(`Source  : ${source}`);
    console.log(`Line    : ${lineno}, Column: ${colno}`);
    console.log('Error   :', error);
    return true;
  };
  
  window.addEventListener('error', (event) => {
    console.log('%c[Global Error Caught via addEventListener]', 'color: orange; font-weight: bold;');
    console.log('Event:', event);
  });
  
  // Trigger a Global Error
  errorBtns[14].addEventListener('click', () => {
    undefinedFunctionThatDoesNotExist();
  });