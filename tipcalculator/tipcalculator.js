//let formData = document.getElementById('submitButton');

function calculate(input){
	//document.getElementById('output').innerHTML = form1;
	//console.log(form1.bill.value);
	let bill = input.bill.value;
	let service = input.service.value;
	let split = input.split.value;
	console.log(service);


	split = 1/split;

	console.log(split);

	let tip;

	//figure out how much to tip
	switch (service) {
		case '1':
			tip = .2;
			break;
		case '2':
			tip = .15;
			break;
		case '3':
			tip = .1;
			break;
		case '4':
			tip = .05;
			break;
	}
	console.log(tip);

	let finalTip = bill * tip * split;

	document.getElementById('output').innerHTML = "$" + finalTip.toFixed(2);

}