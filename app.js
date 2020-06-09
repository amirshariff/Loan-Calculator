// Listen to submit
const submit = document
	.querySelector('#loan-form')
    .addEventListener('submit', function (e) {

        //grab loader elemnt and set style to block
        document.querySelector('#loading').style.display = 'block'
        
        //grab the results element and style it to none
        document.querySelector('#results').style.display = 'none'
        
        //setTimeout to run calculation in 2 seconds
        setTimeout(calculateResults, 2000)
        e.preventDefault()
    });

//calculate results by using the function in eventlistenr
function calculateResults(e) {
	//grab all the elements your gonna use, start with the individual inputs in the form within the function

	const amount = document.querySelector('#amount');
	const interest = document.querySelector('#interest');
	const years = document.querySelector('#years');
	const monthlyPayment = document.querySelector('#monthly-payment');
	const totalPayment = document.querySelector('#total-payment');
	const totalInterest = document.querySelector('#total-interest');


	//place form inputs into a variables and turn it into a float
	const principal = parseFloat(amount.value);
	//interest amount is divided by 100 to get the rate then divided by 12 to get monthly payments
	const calculatedInterest = parseFloat(interest.value) / 100 / 12;
	//then calculate how long the payment plan is by times it by 12
	const calculatedYears = parseFloat(years.value) / 12;

	//calculate monthly payment by using math object with pow method(pow takes to arguemtns)

	const formula = Math.pow(1 + calculatedInterest, calculatedYears);
	const final = (principal * formula * calculatedInterest) / (formula - 1);
	//if statement to set result values. or show error
    if (isFinite(final)) {
        monthlyPayment.value = final.toFixed(2);
		totalPayment.value = (final * calculatedYears).toFixed(2);
        totalInterest.value = (final * calculatedYears - principal).toFixed(2);
        
        //pass the results and loader to show in the if statement
        document.querySelector('#loading').style.display = 'none'
        document.querySelector('#results').style.display = 'block'
	}
	//create error function
    else {
        
        
        showError('Please enter your values');
	}
}

function showError(text) {
    //when there is an error hide the results and set to none and loader to error handling
    document.querySelector('#results').style.display = 'none'
    document.querySelector('#loading').style.display = 'none'
	//create a div
	const error = document.createElement('div');
	//give div classs name of 'alert alert-danger'
	error.className = 'alert alert-danger';
	//create a texnode and append it to div passing it error argument
	text = document.createTextNode(text);
	error.appendChild(text);

	//grab card element and set to variable
	const card = document.querySelector('.card');
	//grab heading and set to variable
	const heading = document.querySelector('.heading');
	//choose where you want to place the error by calling insertBefore on parent node which take what your inserting and before said element.
	card.insertBefore(error, heading);
    //clear error after a set amount of time. setTimeout(function, length)
	setTimeout(clearError, 2000);
}

//create function to clear error by grabing elemt and remving it.
function clearError() {
    let x = document.querySelector('.alert').remove();
}



