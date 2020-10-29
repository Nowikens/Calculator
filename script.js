const container = document.querySelector('#container');
const display = document.querySelector('#display');
const buttons = container.querySelectorAll('button');


buttons.forEach(button => button.addEventListener('click', (event) =>{
	
	dispatcher(event);
}));

// Calculation object with two operands (numbers) and two operators (+-/*=)
calculation = {
	operand: '',
	operand2: '',
	operator: '',
	operator2: ''
}




// Dispatcher decides where to send the event
function dispatcher(event){
	
	if (event.target.id === "dot"){
		calculation['operand'] += '.'
		display.textContent = calculation['operand']
		return;
	}
	
	// Operands triggers when number is pressed
	if (event.target.classList.contains("operand")){
		let operand = parseFloat(event.target.firstChild.nodeValue);
		handleOperand(operand);
		return;
		

	// Operators triggers when +-*/= is pressed
	}else if (event.target.classList.contains("operator")){
		let operator = event.target;
		handleOperator(operator.firstChild.nodeValue);
		return;
	
	// Inverse the number
	}else if (event.target.id === "inverse"){
		inverse();

	}else if (event.target.id === "backspace"){
		backspace();
		
	// Clear the display and calculation object	
	}else if (event.target.id === "clear"){
		clear();
	}

}

// Handles clicking a number depending on actual calculation object attributes
function handleOperand(operand){
	
	// Clearing display before writing a second number, and only then (e.g. 1+)
	if ((calculation['operand'] && calculation['operator']) && !calculation['operand2']){
		display.textContent = '';
	}
	
	// Prevent user from tying too long numbers
	if (display.textContent.length >= 20){
		return
	}
	
	
	// Triggers when calculation has first number and first operator (e.g. 1+)
	// Writing second number on the display and into calculation object
	if (calculation['operand'] && calculation['operator']){
		calculation['operand2'] += operand;
		display.textContent += operand;
		
	// Triggers when calculation object has no first number (e.g. 1)
	// Writing first number on the display and into calculation object
	}else {
		display.textContent += operand;
		calculation['operand'] += operand;
	}
}


// Handles clicking an operator depending on actual calculation object attributes
function handleOperator(operator){

	// Prevent user from trying to pass '=' as first operator (e.g. 1=)
	if (calculation['operator'] == "="){
		calculation['operator'] = '';	
	}
	
	
	// Triggers when there are two numbers and first operator (e.g. 1+1)
	// Call operate function which get result and displays it
	if (calculation['operand'] && calculation['operator'] && calculation['operand2']){
		calculation['operator2'] = operator
		
		operate()
	
	// Triggers when there are one number and first operator (e.g 1+)
	// Changing the actual operator 
	}else if (calculation['operand'] && calculation['operator']){
		calculation['operator'] = operator;
	
	// Triggers when there is one number (e.g. 1)
	// Setting operator
	// This and above case could be in one line but are divided for clarity
	}else if (calculation['operand']){
		calculation['operator'] = operator;
	}
}



// Deals with different operators cases
function operate(){
	
	// Triggers when second operator is '='
	// Call giveResult function which actually calculates formula
	// Write result into display
	// Set first number/operand as result for further calculations
	// Clear the rest of calculation object
	if (calculation['operator2'] == '='){
		let result = giveResult();
		display.textContent = result;
		
		calculation['operand'] = parseFloat(result);
		calculation['operand2'] = '';
		calculation['operator'] = '';
		calculation['operator2'] = '';

	// Same as above, but when second operator is other than '=' give result
	// and set first operator as second operator
	// Clear the rest
	}else{
		let result = giveResult()
		display.textContent = result;
		
		calculation['operand'] = result
		calculation['operand2'] = ''
		calculation['operator'] = calculation['operator2'];
		calculation['operator2'] = '';
	}
}


// Calculate the equasion based on the first operator
function giveResult(){

	if (calculation['operator'] == "+"){
		let result = parseFloat(calculation['operand']) + parseFloat(calculation['operand2']);
		return Math.round((result + Number.EPSILON) * 100) / 100;
	
	}else if (calculation['operator'] == "-"){
		let result = parseFloat(calculation['operand']) - parseFloat(calculation['operand2']);
		return Math.round((result + Number.EPSILON) * 100) / 100;
	
	}else if (calculation['operator'] == "*"){
		let result = parseFloat(calculation['operand']) * parseFloat(calculation['operand2']);
		return Math.round((result + Number.EPSILON) * 100) / 100;
	
	}else if (calculation['operator'] == "/"){
		
		// Dividing by 0 case
		if (calculation['operand2'] == "0"){
			return "XD";
		}
		let result = parseFloat(calculation['operand']) / parseFloat(calculation['operand2']);
		return Math.round((result + Number.EPSILON) * 100) / 100;
	}
}





// Inverse the number bot in calculation object and display
function inverse(){
	
	let inverted =	calculation['operand'] = -(calculation['operand']);
	display.textContent = inverted;
	
}


// Backspace last digit and write it to diplay
function backspace(){
	
	let stringed = calculation['operand'].toString()
	calculation['operand'] = stringed.substr(0, stringed.length-1)
	display.textContent = calculation['operand']
}

// Clear display and whole calculation
function clear(){

	display.textContent = '';
	calculation['operand'] = '';
	calculation['operand2'] = '';
	calculation['operator'] = '';
	calculation['operator2'] = '';
}

















