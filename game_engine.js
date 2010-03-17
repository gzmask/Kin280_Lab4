//browsers dections -- sorry IE 6 folks, you are excluded
var browser=navigator.appName;
var b_version=navigator.appVersion;
var version=parseFloat(b_version);


//gobal variables 
var timer;
var isLeft = null;
var isIE = false;
if (browser == "Microsoft Internet Explorer" ) {
	isIE = true;
}
var trial_num;
var second_num;
var rtList = [];
var nextBn;

//scenes control flags
var scene1 = true;
var scene2 = false; //set trials, delays
var scene3 = false; //testing
var scene4 = false; //compatible test result
var scene5 = false; //set trials, delays
var scene6 = false; //testing
var scene7 = false; //incompatible test result

window.onload = init;

function init() {  
	drawScene1();
}  


function drawScene4() {
	if (!scene4) {
		return;
	}

	//calculates the average reaction time
	var sumRt = 0;
	for (rt in rtList) {
		sumRt += rtList[rt];
	}	
	var avgRt = sumRt / rtList.length;
	
	document.getElementById("statistic").style.display = "block";
	document.getElementById("result_note").innerHTML = "Your compatible visual reaction time is " + rtList +", your average compatible reaction time is "  + avgRt.toFixed(0);
	document.getElementById("next_bn").style.display = "inline";

	//event for next page
	if (nextBn.addEventListener) {
	  nextBn.addEventListener('click', end_scene4, false); 
	} else if (nextBn.attachEvent) {
	  nextBn.attachEvent('onclick', end_scene4);
	}
}

function end_scene4(evt) {
	nextBn = document.getElementById("next_bn");
	if (nextBn.removeEventListener) {
		nextBn.removeEventListener('click', end_scene4, false);
	} else if ( nextBn.detachEvent) {
		nextBn.detachEvent('onclick', end_scene4);
	} 

	document.getElementById("statistic").style.display = "none";
	scene4 = false;
	scene5 = true;
	rtList = [];
	drawScene5();
}

function dotStop(e) {
	if (!e) e = window.event;
	if (scene3 && trial_num != 0 && e.keyCode == 70) {
		if (isLeft == null) {
			trial_num -= 1;
			if (trial_num > 0) {
				document.getElementById("ready_note").innerHTML = "Too earily! 3 second punishment. Press the spacebar to begin.";  
			} else {
				document.getElementById("ready_note").innerHTML = "Too earily! 3 second punishment. Tests done, please press the spacebar to see results.";  
			}
			document.getElementById("left_circle").src = "circle_white.png";
			timer = 3000;
			rtList.push(timer);
			document.getElementById("ready_note").innerHTML += " " + timer;
			document.onkeydown = dotStart;

		} else if (isLeft == true) {
			trial_num -= 1;
			if (trial_num > 0) {
				document.getElementById("ready_note").innerHTML = "You got it! Press the spacebar to next trial.";  
			} else {
				document.getElementById("ready_note").innerHTML = "Tests done! Please press the spacebar to see results.";  
			}
			document.getElementById("left_circle").src = "circle_red.png";
			var now = new Date();
			timer = now.getTime() - timer;
			rtList.push(timer);
			document.getElementById("ready_note").innerHTML += " " + timer;
			document.onkeydown = dotStart;
		} else {
			trial_num -= 1;
			if (trial_num > 0) {
				document.getElementById("ready_note").innerHTML = "Wrong finger! 3 second punishment. Press the spacebar to begin.";  
			} else {
				document.getElementById("ready_note").innerHTML = "Wrong finger! 3 second punishment. Tests done, please press the spacebar to see results.";  
			}
			document.getElementById("left_circle").src = "circle_white.png";
			timer = 3000;
			rtList.push(timer);
			document.getElementById("ready_note").innerHTML += " " + timer;
			document.onkeydown = dotStart;
		}
	}

	if (scene3 && trial_num != 0 && e.keyCode == 74) {
		if (isLeft == null) {
			trial_num -= 1;
			if (trial_num > 0) {
				document.getElementById("ready_note").innerHTML = "Too earily! 3 second punishment. Press the spacebar to begin.";  
			} else {
				document.getElementById("ready_note").innerHTML = "Too earily! 3 second punishment. Tests done, please press the spacebar to see results.";  
			}
			document.getElementById("right_circle").src = "circle_white.png";
			timer = 3000;
			rtList.push(timer);
			document.getElementById("ready_note").innerHTML += " " + timer;
			document.onkeydown = dotStart;

		} else if (isLeft == false) {
			trial_num -= 1;
			if (trial_num > 0) {
				document.getElementById("ready_note").innerHTML = "You got it! Press the spacebar to next trial.";  
			} else {
				document.getElementById("ready_note").innerHTML = "Tests done! Please press the spacebar to see results.";  
			}
			document.getElementById("right_circle").src = "circle_red.png";
			var now = new Date();
			timer = now.getTime() - timer;
			rtList.push(timer);
			document.getElementById("ready_note").innerHTML += " " + timer;
			document.onkeydown = dotStart;
		} else {
			trial_num -= 1;
			if (trial_num > 0) {
				document.getElementById("ready_note").innerHTML = "Wrong finger! 3 second punishment. Press the spacebar to begin.";  
			} else {
				document.getElementById("ready_note").innerHTML = "Wrong finger! 3 second punishment. Tests done, please press the spacebar to see results.";  
			}
			document.getElementById("right_circle").src = "circle_white.png";
			timer = 3000;
			rtList.push(timer);
			document.getElementById("ready_note").innerHTML += " " + timer;
			document.onkeydown = dotStart;

		}
	}
}

function dotStart(e) {
	if (!e) e = window.event;
	document.getElementById("right_circle").src = "circle_white.png";
	document.getElementById("left_circle").src = "circle_white.png";
	isLeft = null;
	if (trial_num != 0 && e.keyCode == 32) {
		document.getElementById("ready_note").innerHTML = "";
		//register key code for F and J
		document.onkeydown = dotStop;
		//wait random seconds then turn cirle to green
		var timeOut = Number(second_num) + (Math.random() * 4 - 2);
		window.setTimeout(green_on,timeOut*1000,true);
	}

	if (trial_num < 1 && e.keyCode == 32)
	{
		scene3 = false;
		scene4 = true;
		document.getElementById("left_circle").style.display = "none";
		document.getElementById("right_circle").style.display = "none";
		document.getElementById("ready_note").style.display = "none";
		document.onkeydown = null;
		drawScene4();
	}
}

function green_on() {
	if (Math.random() > 0.5) {
		document.getElementById("left_circle").src = "circle_green.png";
		var now = new Date();
		timer = now.getTime();
		isLeft = true;
	} else {
		document.getElementById("right_circle").src = "circle_green.png";
		var now = new Date();
		timer = now.getTime();
		isLeft = false;
	}
}

function drawScene3() {
	if (!scene3) {
		return;
	}
	document.getElementById("left_circle").style.display = "inline";	
	document.getElementById("right_circle").style.display = "inline";	
}

function drawScene2() {
	if (!scene2) {
		return;
	}	

	var preText = document.getElementById("preview_text");
	var preFkey = document.getElementById("preview_f_key");
	var preJkey = document.getElementById("preview_j_key");
	var preCircle = document.getElementById("preview_circle");
	var settings = document.getElementById("settings");
	nextBn = document.getElementById("next_bn");
	
	preText.style.display = "block";
	preFkey.style.display = "inline";
	preJkey.style.display = "inline";
	preCircle.style.display = "inline";
	settings.style.display = "block";

	//event for next page
	if (nextBn.addEventListener) {
	  nextBn.addEventListener('click', end_scene2, false); 
	} else if (nextBn.attachEvent) {
	  nextBn.attachEvent('onclick', end_scene2);
	}
}

function end_scene2(evt) {
	var preText = document.getElementById("preview_text");
	var preFkey = document.getElementById("preview_f_key");
	var preJkey = document.getElementById("preview_j_key");
	var preCircle = document.getElementById("preview_circle");
	var settings = document.getElementById("settings");
	nextBn = document.getElementById("next_bn");
	if (nextBn.removeEventListener) {
		nextBn.removeEventListener('click', end_scene2, false);
	} else if (nextBn.detachEvent) {
		nextBn.detachEvent('onclick', end_scene2);
	}
	document.getElementById("ready_note").style.display = "inline";
	document.getElementById("ready_note").innerHTML = "Please place your left index finger on the F key and right index finger on the J key and then press the spacebar to begin.";  
	preText.style.display = "none";
	preFkey.style.display = "none";
	preJkey.style.display = "none";
	preCircle.style.display = "none";
	settings.style.display = "none";
	nextBn.style.display = "none";
	trial_num = document.getElementById("number_of_trials").value;
	second_num = document.getElementById("number_of_seconds").value;
	scene2 = false;
	scene3 = true;
	drawScene3();
	document.onkeydown = dotStart;
}
	

function drawScene1() {
	if (!scene1) {
		return;
	}
	nextBn = document.getElementById("next_bn");
	var titleText = document.getElementById("title_text");
	var contentText = document.getElementById("content_text");

	titleText.style.display = "block";
	contentText.style.display = "block";
 	nextBn.style.display = "inline";

	//event for next page
	if (nextBn.addEventListener) {
	  nextBn.addEventListener('click', end_scene1, false); 
	} else if (nextBn.attachEvent) {
	  nextBn.attachEvent('onclick', end_scene1);
	}
}

function end_scene1(evt) {
	nextBn = document.getElementById("next_bn");
	if (nextBn.removeEventListener) {
		nextBn.removeEventListener('click', end_scene1, false);
	} else if ( nextBn.detachEvent) {
		nextBn.detachEvent('onclick', end_scene1);
	} 
	var titleText = document.getElementById("title_text");
	var contentText = document.getElementById("content_text");

	//titleText.style.display = "none";
	contentText.style.display = "none";
 	//nextBn.style.display = "none";
	//contentText.innerHTML = "";
	contentText.style.backgroundColor = "transparent";
	scene1 = false;
	scene2 = true;
	drawScene2();
}

function drawScene5() {
	if (!scene5) {
		return;
	}	

	var preText = document.getElementById("preview_text_in");
	var preFkey = document.getElementById("preview_f_key_in");
	var preJkey = document.getElementById("preview_j_key_in");
	var preCircle = document.getElementById("preview_circle_in");
	var settings = document.getElementById("settings");
	nextBn = document.getElementById("next_bn");
	
	preText.style.display = "block";
	preFkey.style.display = "inline";
	preJkey.style.display = "inline";
	preCircle.style.display = "inline";
	settings.style.display = "block";

	//event for next page
	if (nextBn.addEventListener) {
	  nextBn.addEventListener('click', end_scene5, false); 
	} else if (nextBn.attachEvent) {
	  nextBn.attachEvent('onclick', end_scene5);
	}
}

function end_scene5(evt) {
	var preText = document.getElementById("preview_text_in");
	var preFkey = document.getElementById("preview_f_key_in");
	var preJkey = document.getElementById("preview_j_key_in");
	var preCircle = document.getElementById("preview_circle_in");
	var settings = document.getElementById("settings");
	nextBn = document.getElementById("next_bn");
	if (nextBn.removeEventListener) {
		nextBn.removeEventListener('click', end_scene5, false);
	} else if (nextBn.detachEvent) {
		nextBn.detachEvent('onclick', end_scene5);
	}
	document.getElementById("ready_note").style.display = "inline";
	document.getElementById("ready_note").innerHTML = "Please place your left index finger on the F key and right index finger on the J key and then press the spacebar to begin.";  
	preText.style.display = "none";
	preFkey.style.display = "none";
	preJkey.style.display = "none";
	preCircle.style.display = "none";
	settings.style.display = "none";
	nextBn.style.display = "none";
	trial_num = document.getElementById("number_of_trials").value;
	second_num = document.getElementById("number_of_seconds").value;
	scene5 = false;
	scene6 = true;
	drawScene6();
	document.onkeydown = dotStart_in;
}

function drawScene6() {
	if (!scene6) {
		return;
	}
	document.getElementById("left_circle").style.display = "inline";	
	document.getElementById("right_circle").style.display = "inline";	
}

function dotStart_in(e) {
	if (!e) e = window.event;
	document.getElementById("right_circle").src = "circle_white.png";
	document.getElementById("left_circle").src = "circle_white.png";
	isLeft = null;
	if (trial_num != 0 && e.keyCode == 32) {
		document.getElementById("ready_note").innerHTML = "";
		//register key code for F and J
		document.onkeydown = dotStop_in;
		//wait random seconds then turn cirle to green
		var timeOut = Number(second_num) + (Math.random() * 4 - 2);
		window.setTimeout(green_on_in,timeOut*1000,true);
	}

	if (trial_num < 1 && e.keyCode == 32)
	{
		scene6 = false;
		scene7 = true;
		document.getElementById("left_circle").style.display = "none";
		document.getElementById("right_circle").style.display = "none";
		document.getElementById("ready_note").style.display = "none";
		document.onkeydown = null;
		drawScene7();
	}
}

function dotStop_in(e) {
	if (!e) e = window.event;
	if (scene6 && trial_num != 0 && e.keyCode == 70) {
		if (isLeft == null) {
			trial_num -= 1;
			if (trial_num > 0) {
				document.getElementById("ready_note").innerHTML = "Too earily! 3 Second punishment. Press the spacebar to next trial.";  
			} else {
				document.getElementById("ready_note").innerHTML = "Too earily! 3 Second punishment. Tests done, please press the spacebar to see results.";  
			}
			document.getElementById("right_circle").src = "circle_white.png";
			timer = 3000;
			rtList.push(timer);
			document.getElementById("ready_note").innerHTML += " " + timer;
			document.onkeydown = dotStart_in;

		} else if (isLeft == false) {
			trial_num -= 1;
			if (trial_num > 0) {
				document.getElementById("ready_note").innerHTML = "You got it! Press the spacebar to begin.";  
			} else {
				document.getElementById("ready_note").innerHTML = "Tests done! Please press the spacebar to see results.";  
			}
			document.getElementById("right_circle").src = "circle_red.png";
			var now = new Date();
			timer = now.getTime() - timer;
			rtList.push(timer);
			document.getElementById("ready_note").innerHTML += " " + timer;
			document.onkeydown = dotStart_in;
		} else {
			trial_num -= 1;
			if (trial_num > 0) {
				document.getElementById("ready_note").innerHTML = "Wrong finger! 3 Second punishment. Press the spacebar to next trial.";  
			} else {
				document.getElementById("ready_note").innerHTML = "Wrong finger! 3 Second punishment. Tests done, please press the spacebar to see results.";  
			}
			document.getElementById("right_circle").src = "circle_white.png";
			timer = 3000;
			rtList.push(timer);
			document.getElementById("ready_note").innerHTML += " " + timer;
			document.onkeydown = dotStart_in;

		}
	}

	if (scene6 && trial_num != 0 && e.keyCode == 74) {
		if (isLeft == null) {
			trial_num -= 1;
			if (trial_num > 0) {
				document.getElementById("ready_note").innerHTML = "Too earily! 3 Second punishment. Press the spacebar to next trial.";  
			} else {
				document.getElementById("ready_note").innerHTML = "Too earily! 3 Second punishment. Tests done, please press the spacebar to see results.";  
			}
			document.getElementById("left_circle").src = "circle_white.png";
			timer = 3000;
			rtList.push(timer);
			document.getElementById("ready_note").innerHTML += " " + timer;
			document.onkeydown = dotStart_in;

		} else if (isLeft == true) {
			trial_num -= 1;
			if (trial_num > 0) {
				document.getElementById("ready_note").innerHTML = "You got it! Press the spacebar to begin.";  
			} else {
				document.getElementById("ready_note").innerHTML = "Tests done! please press the spacebar to see results.";  
			}
			document.getElementById("left_circle").src = "circle_red.png";
			var now = new Date();
			timer = now.getTime() - timer;
			rtList.push(timer);
			document.getElementById("ready_note").innerHTML += " " + timer;
			document.onkeydown = dotStart_in;
		} else {
			trial_num -= 1;
			if (trial_num > 0) {
				document.getElementById("ready_note").innerHTML = "Wrong finger! 3 Second punishment. Press the spacebar to next trial.";  
			} else {
				document.getElementById("ready_note").innerHTML = "Wrong finger! 3 Second punishment. Tests done, please press the spacebar to see results.";  
			}
			document.getElementById("left_circle").src = "circle_white.png";
			timer = 3000;
			rtList.push(timer);
			document.getElementById("ready_note").innerHTML += " " + timer;
			document.onkeydown = dotStart_in;
		}
	}
}

function green_on_in() {
	if (Math.random() > 0.5) {
		document.getElementById("left_circle").src = "circle_green.png";
		var now = new Date();
		timer = now.getTime();
		isLeft = true;
	} else {
		document.getElementById("right_circle").src = "circle_green.png";
		var now = new Date();
		timer = now.getTime();
		isLeft = false;
	}
}

function drawScene7() {
	if (!scene7) {
		return;
	}

	//calculates the average reaction time
	var sumRt = 0;
	for (rt in rtList) {
		sumRt += rtList[rt];
	}	
	var avgRt = sumRt / rtList.length;
	
	document.getElementById("statistic").style.display = "block";
	document.getElementById("result_note").innerHTML = "Your incompatible visual reaction time is " + rtList +", your average incompatible reaction time is "  + avgRt.toFixed(0);
	document.getElementById("next_bn").style.display = "inline";

	//event for next page
	if (nextBn.addEventListener) {
	  nextBn.addEventListener('click', end_scene7, false); 
	} else if (nextBn.attachEvent) {
	  nextBn.attachEvent('onclick', end_scene7);
	}
}

function end_scene7(evt) {
	nextBn = document.getElementById("next_bn");
	if (nextBn.removeEventListener) {
		nextBn.removeEventListener('click', end_scene7, false);
	} else if ( nextBn.detachEvent) {
		nextBn.detachEvent('onclick', end_scene7);
	} 

	document.getElementById("statistic").style.display = "none";
	document.getElementById("preview_text_in").style.display = "none";
	document.getElementById("left_circle").style.display = "none";
	document.getElementById("right_circle").style.display = "none";
	scene7 = false;
	scene2 = true;
	rtList = [];
	location.reload(false);
	//drawScene2();
}

