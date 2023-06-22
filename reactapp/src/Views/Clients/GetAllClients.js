import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "../../../node_modules/axios/index";
import Card from "../../Components/Card/Card";
import ClientBoxArray from "../../Components/ClientBox/ClientBoxArray";
import { nav_routes } from "../../routes";


function GetAllClients() {
    const navigate = useNavigate();
    const [response, setResponse] = useState([{}]);

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_ROOT + process.env.REACT_APP_API_CLIENT_GETALL)
            .then((response: AxiosResponse<any>) => {
                //console.log(response.data);
                setResponse(response.data);
            })
    }, []);

    return (
        <Card classname="text-center">
            <h1>All Clients Information</h1>
            <ClientBoxArray array={response} />
            <NavLink to={nav_routes.HOME}>
                Back to Home
            </NavLink>
        </Card>
    );

}

export default GetAllClients;