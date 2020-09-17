import React from "react";
import ProdApp from "./ProdApp";
import JobApp from "./JobApp";
import NavButtons from "./NavButtons";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App(){
    return (
        <Router>
            <div>
                <NavButtons />
                <Switch>
                    <Route path="/" exact component={ProdApp}/>
                    <Route path="/applications" component={JobApp}/>
                </Switch>
            </div>
        </Router>
    )
}

export default App;