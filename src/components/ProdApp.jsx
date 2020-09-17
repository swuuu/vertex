import React from "react";
import Time from "./Time";
import TaskApp from "./TaskApp";

function ProdApp() {
     return (
        <div className="container-fluid">
            <div className="row">
                <div id="col-left" className="time col-lg-4"><Time /></div>
                <div id="col-right" className="to-do col-lg-8"><TaskApp /></div>
            </div>
        </div>
     )
}

export default ProdApp;