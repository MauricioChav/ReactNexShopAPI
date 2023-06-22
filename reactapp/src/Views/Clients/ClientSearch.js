import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "../../../node_modules/axios/index";
import Card from "../../Components/Card/Card";
import { nav_routes } from "../../routes";


function ClientSearch() {
    const navigate = useNavigate();
    const [hasSearched, setHasSearched] = useState(false);
    const [searchId, setSearchId] = useState(null);
    const [responseContent, setResponseContent] = useState();

    const searchClientHandler = async (event) => {
        event.preventDefault();

        //Activate search
        setHasSearched(true);

        //Update the searchId
        const newSearchId = event.target.elements.searchId.value;
        setSearchId(newSearchId);

    }

    useEffect(() => {
        if (hasSearched) {
            axios.get(process.env.REACT_APP_API_ROOT + process.env.REACT_APP_API_CLIENT_EXISTSBYID, { params: { id: searchId } })
                .then((response: AxiosResponse<any>) => {
                    
                    const clientExists = response.data;
                    //console.log(clientExists);

                    //If the client exists, redirect to the detail page
                    if (clientExists) {

                        navigate(nav_routes.CLIENT_DETAIL + searchId)

                    } else {
                        setResponseContent(
                            <div>
                                <h5>Error</h5>
                                <h5>Status code: 404</h5>
                                <h5>The client with the id "{searchId}" does not exist</h5>
                            </div>
                        );
                    }

                })
                .catch((error) => {
                    if (error.response) {
                        const clientError = error.response;
                        //console.log(clientError.data);

                        setResponseContent(
                            <div>
                                <h5>{clientError.data.title}</h5>
                                <h5>Status code: {clientError.data.status}</h5>
                                <h5>{clientError.data.detail}</h5>
                            </div>
                        );
                    }

                });
        }

    }, [searchId]);

    return (
        <Card classname="text-center">
            <h1>Client Information</h1>
            <h4>Please introduce a client id to search for</h4>

            <form className="clientId-form" onSubmit={searchClientHandler}>
                <input type="number" id="searchId" name="searchId" required />
                <button className="btn btn-secondary">Search</button>
            </form>

            {responseContent}

        </Card>
    );

}

export default ClientSearch;