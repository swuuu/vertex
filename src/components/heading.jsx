import React, {useState} from "react";

// setting variables
const name = localStorage.getItem("name") ? localStorage.getItem("name") : "";
document.getElementById("currentName").innerHTML = name;


document.getElementById("saveSettings").addEventListener("click", saveSettings);
function saveSettings() {
    // name 
    const name = document.getElementById("name").value;
    localStorage.setItem("name", name);
} 



// creating the title of the site
let today = new Date();
let hour = today.getHours();
let backgroundClass;

function generateTitle(name, hour) {
    let greeting;
    if (hour >= 4 && hour < 12) {
        backgroundClass = "morning-background";
        greeting  = "Good morning, " + name;
        return greeting;
    } else if (hour >= 12 && hour < 18) {
        backgroundClass = "afternoon-background";
        greeting = "Good afternoon, " + name;
        return greeting;
    } else if (hour >= 18 && hour < 22){
        backgroundClass = "evening-background";
        greeting = "Good evening, " + name;
        return greeting;
    } else {
        backgroundClass = "night-background";
        greeting = "Good evening, " + name;
        return greeting;
    }
}

document.getElementById("title").innerHTML = generateTitle(name, hour);

// adjusting the background color depending on the time of the day
const body = document.getElementsByTagName("body")[0];
body.className = backgroundClass;