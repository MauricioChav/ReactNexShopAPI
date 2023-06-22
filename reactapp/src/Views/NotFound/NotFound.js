import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Card from "../../Components/Card/Card";
import { nav_routes } from "../../routes";


function NotFound() {
    const navigate = useNavigate();

    return (
        <Card classname="text-center">
            <h1>The Page you are trying to access doesn't exist</h1>
            <NavLink to={nav_routes.HOME}>
                Back to Home
            </NavLink>
        </Card>
    );

}

export default NotFound;