import React from "react";
import {Link} from "react-router-dom";

function NavButtons() {
    return (
        <div className="nav-buttons">
            <Link to="/">
                <button type="button" className="btn right-button"><i className="fas fa-list-alt"></i></button>
            </Link>
            <Link to="/applications">
                <button type="button" className="btn right-button"><i className="fas fa-table"></i></button>
            </Link>
        </div>
    )
}

export default NavButtons