


function updateTime() {
	let time = new Date;
	let meridian;
	let hours;
	let minutes;
	let seconds;
	//set hours
	if (time.getHours() > 12){
		hours = (time.getHours()-12).toString();
		meridian = "PM";
	} else {
		hours = time.getHours().toString();
		meridian = "AM";
	}

	//set minutes
	if (time.getMinutes()<10) {
		minutes = "0" + time.getMinutes().toString();
	} else {
		minutes = time.getMinutes().toString();
	}

	// set seconds
	if (time.getSeconds()<10) {
		seconds = "0" + time.getSeconds().toString();
	} else {
		seconds = time.getSeconds().toString();
	}

	let now = hours + ":" + minutes + ":" + seconds + " " + meridian;

	document.getElementById("clock").innerHTML = now;
	}


setInterval(updateTime, 1000);


/*(while(true){
	setTimeout(updateTime);
};*/

/*let i = 0;

function count() {
	do {
		i++;
		document.getElementById("clock").innerHTML = i;
	} while (i<1e3);

	if (i<1e4){
		setTimeout(count);
	}
}

count();
*/