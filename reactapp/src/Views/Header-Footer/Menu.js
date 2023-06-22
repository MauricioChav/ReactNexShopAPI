import React, {useState, useEffect} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { nav_routes } from "../../routes";

import "./Header-Footer.css"

function Menu() {
    const navigate = useNavigate();
    const [userContent, setUserContent] = useState(<div></div>);

    const logoutHandler = () => {
        //Delete the user from the localStorage
        localStorage.removeItem("user");

        //Refresh the page
        navigate(0);
    }

    useEffect(() => {
        if (localStorage.getItem("user") !== null) {
            const userName = JSON.parse(localStorage.getItem("user")).userName;

            setUserContent(
                <div className="login-box">
                    <p className="nav-link">{userName}</p>
                    <button className="btn btn-danger" onClick={logoutHandler}>Logout</button>
                </div>
            );

        } else {
            setUserContent(
                <NavLink to={nav_routes.LOGIN} className="btn btn-primary">
                    Login
                </NavLink>  
            );
        }

    }, [navigate]);

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <NavLink to={nav_routes.HOME} className="navbar-brand">NexShop</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarsExample04">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="http://example.com" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Clients</a>
                        <div className="dropdown-menu" aria-labelledby="dropdown04">
                            <NavLink to={nav_routes.CLIENT_ALL} className="dropdown-item">All Clients</NavLink>
                            <NavLink to={nav_routes.CLIENT_SEARCH} className="dropdown-item">Client search</NavLink>
                            <NavLink to={nav_routes.CLIENT_CREATE} className="dropdown-item">Create</NavLink>
                        </div>
                    </li>
                    
                </ul>
                {userContent}  
               
            </div>
        </nav>
    );

}

export default Menu;