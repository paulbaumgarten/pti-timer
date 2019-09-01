/* jshint strict:global */
/* jshint noempty:false */
/* jshint undef:true */
/* jshint browser:true */
/* jshint -W033 */
/* jshint -W069 */
/* global Howl, console */

'use strict';

// 5 minute intervals from 08:30 to 17:00
var alarms = [30600,
30900,
31200,
31500,
31800,
32100,
32400,
32700,
33000,
33300,
33600,
33900,
34200,
34500,
34800,
35100,
35400,
35700,
36000,
36300,
36600,
36900,
37200,
37500,
37800,
38100,
38400,
38700,
39000,
39300,
39600,
39900,
40200,
40500,
40800,
41100,
41400,
41700,
42000,
42300,
42600,
42900,
43200,
43500,
43800,
44100,
44400,
44700,
45000,
45300,
45600,
45900,
46200,
46500,
46800,
47100,
47400,
47700,
48000,
48300,
48600,
48900,
49200,
49500,
49800,
50100,
50400,
50700,
51000,
51300,
51600,
51900,
52200,
52500,
52800,
53100,
53400,
53700,
54000,
54300,
54600,
54900,
55200,
55500,
55800,
56100,
56400,
56700,
57000,
57300,
57600,
57900,
58200,
58500,
58800,
59100,
59400,
59700,
60000,
60300,
60600,
60900,
61200
];

var stopForTheDay = alarms[ alarms.length-1 ]-1;
var currentAlarm = alarms[0];
var currentAlarmKey = 0;
var prevAlarm = alarms[0];
var prevAlarmKey = 0;
var secondsUntilAlarm = 0;
var chime=false;

function pad( n ) {
	var s = n.toString();
	while (s.length < 2) {
	   s = "0" + s;
	}
	return(s);
}

function getTimeNowObject() {
	var now = new Date();
	var res = {};
	res.year = now.getFullYear();
	res.month = now.getMonth() + 1;
	res.day = now.getDate();
	res.hour = now.getHours();
	res.minute = now.getMinutes();
	res.second = now.getSeconds();
	res.secondsOfDay = res.second + res.minute*60 + res.hour*3600;
	return (res);
}

function display() {
	var sCountDownTime = Math.floor(Number(secondsUntilAlarm/60)) + ":" + pad(Math.floor(Number(secondsUntilAlarm%60)));
	var sAlarmTime = Math.floor(Number(prevAlarm/3600)) + ":" + pad(Math.floor(Number((prevAlarm%3600)/60))) + ":" + pad(Math.floor(Number(prevAlarm%60)));
	var now = getTimeNowObject();
	var sTimeNow = now.hour + ":" + pad(now.minute) + ":" + pad(now.second);
	document.getElementById("timer").innerHTML = sCountDownTime;
	document.getElementById("currenttime").innerHTML = sTimeNow;
	document.getElementById("currentsession").innerHTML = sAlarmTime;
}

function interval() {
	var now = getTimeNowObject();
    if (now.secondsOfDay < stopForTheDay) {
        if (now.secondsOfDay > currentAlarm) {
           prevAlarmKey = currentAlarmKey;
           prevAlarm = alarms[prevAlarmKey];
		   currentAlarmKey++;
		   currentAlarm = alarms[currentAlarmKey];
        }
        // How many seconds until the next alarm is due?
        secondsUntilAlarm = currentAlarm - now.secondsOfDay;
        // Set background color
        if (secondsUntilAlarm < 30) {
        	if (! chime) {
				playSound("alert.mp3");
				chime=true;
        	}
			document.body.style.backgroundColor = "red";
        } else {
			document.body.style.backgroundColor = "black";
			chime=false;
        }
		display();
    } else {
        // Stop for the day
        document.body.style.backgroundColor = "black";
		secondsUntilAlarm = 0;
		currentAlarmKey = 0;
		currentAlarm = alarms[0];
		display();
    }
}

function playSound( soundFile ) {
	console.log("Playing sound: "+soundFile);
    var sound = new Howl({ src: [ soundFile ] });
    sound.play();
}

function checkSize() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    var elements, i;
    if (w > h) {
        elements = document.getElementsByClassName("infovertical");
        for (i=0; i<elements.length; i++) {
            elements[i].className = "info";
        }
        elements = document.getElementsByClassName("labelvertical");
        for (i=0; i<elements.length; i++) {
            elements[i].className = "label";
        }
    } else {
        elements = document.getElementsByClassName("info");
        for (i=0; i<elements.length; i++) {
            elements[i].className = "infovertical";
        }
        elements = document.getElementsByClassName("label");
        for (i=0; i<elements.length; i++) {
            elements[i].className = "labelvertical";
        }
    }
}

function myapp() {
   document.documentElement.style.overflow = 'hidden';
   setInterval( interval, 40 );
   checkSize();
   window.onresize = checkSize;
   window.addEventListener("orientationchange", checkSize);   
}

window.onload = myapp;

