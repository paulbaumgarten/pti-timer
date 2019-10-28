/* jshint strict:global */
/* jshint noempty:false */
/* jshint undef:true */
/* jshint browser:true */
/* jshint -W033 */
/* jshint -W069 */
/* global Howl, console */

'use strict';

// 5 minute intervals from 08:00 to 19:00
var alarms = []
for (var i=(8*60*60); i<=(19*60*60); i=i+300) {
    alarms.push(i);
}

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

