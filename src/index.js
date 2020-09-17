import React from "react";
import ReactDom from "react-dom";
import App from "./components/App";
import Greetings from "./components/Greetings";

// setting variables
const name = localStorage.getItem("name") ? localStorage.getItem("name") : "";
document.getElementById("currentName").innerHTML = `Name: ${name}`;


document.getElementById("saveSettings").addEventListener("click", saveSettings);
function saveSettings() {
    // name 
    const name = document.getElementById("name").value;
    document.getElementById("currentName").innerHTML = `Name: ${name}`;
    localStorage.setItem("name", name);
} 


// Greetings render the title and updates the background color
// App is the main body
/* 
Main parents/child components:
Greetings
App 
|---NavButtons
|---JobApp
|---ProdApp
    |---Time
    |---TaskApp
*/

ReactDom.render(<Greetings />, document.getElementById("title"));
ReactDom.render(<App />, document.getElementById("root"));
