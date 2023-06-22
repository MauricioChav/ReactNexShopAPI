import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Card from "../Components/Card/Card";
import { nav_routes } from "../routes";
//import { Button } from "@mui/material";

function Home() {
    const navigate = useNavigate();

    return (
        <Card className="text-center">
            <h1 className="page-title">NexShop</h1>
            <h4 className="page-subtitle">The Nexus for all your needs!</h4>
            <p>Interested in using our API? Learn more:</p>
            <a href={process.env.REACT_APP_API_DOCUMENTATION}>Nexus API Official App</a>
        </Card>
    );

}

export default Home;