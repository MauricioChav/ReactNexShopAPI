import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams ,useLocation } from "react-router-dom";
import Card from "../../Components/Card/Card";
import { nav_routes } from "../../routes";
import ClientEditor from "../../Components/ClientEditor/ClientEditor";


function CreateClient() {
    const navigate = useNavigate();
    const route = useParams();
    const [content, setContent] = useState();
    const loggedUser = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {

        //Check if the user is logged in
        if (localStorage.getItem("user") !== null) {

            setContent(
                <ClientEditor />
            );
            
        } else {
            //The user is not logged in
            setContent(
                <div>
                    <h3>You need to be logged-in to be able to use this endpoint</h3>
                    <NavLink to={nav_routes.LOGIN} className="btn btn-primary">
                        Login
                    </NavLink>
                </div>
            );

        }
    }, []);

    return (
        <Card classname="text-center">
            <h1>Create new client</h1>
            {content}
        </Card>
    );

}

export default CreateClient;