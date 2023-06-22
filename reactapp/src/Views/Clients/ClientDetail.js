import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "../../../node_modules/axios/index";
import AddressEditor from "../../Components/AddressEditor/AddressEditor";
import Card from "../../Components/Card/Card";
import ClientBox from "../../Components/ClientBox/ClientBox";
import ClientEditor from "../../Components/ClientEditor/ClientEditor";
import DeleteDialog from "../../Components/DeleteDialog/DeleteDialog";
import { nav_routes } from "../../routes";

import "./Clients.css"

function ClientDetail() {
    const navigate = useNavigate();
    const route = useParams();
    const [responseContent, setResponseContent] = useState(<div></div>);
    const loggedUser = JSON.parse(localStorage.getItem("user"));

    //Client Editor
    const [clientEditor, setClientEditor] = useState(false);
    const [clientEditorContent, setClientEditorContent] = useState(<div></div>);

    //Address Editor
    const [addressEditor, setAddressEditor] = useState(false);
    const [addressEditorContent, setAddressEditorContent] = useState(<div></div>);

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_ROOT + process.env.REACT_APP_API_CLIENT_GETBYID, { params: { id: route.id } })
            .then((response: AxiosResponse<any>) => {
                //If response is successfull, fill with the info
                const clientData = response.data;
                //console.log(clientData);

                setResponseContent(
                    <div>
                        <ClientBox content={clientData} />
                        {loggedUser != null &&
                            <>
                            <button className="btn btn-primary float-left" onClick={ClientEditorHandler}>Edit</button>
                            <button className="btn btn-secondary float-left" onClick={AddressEditorHandler}>{clientData.address != undefined ? "Edit " : "Add "}Client Address</button>
                                <DeleteDialog id={clientData.id} resourceName="client" route={process.env.REACT_APP_API_CLIENT_DELETE} />
                            </>
                        }
                        
                    </div>
                );

                setClientEditorContent(
                    <div>
                        <ClientEditor clientData={clientData} />
                        <button className="btn btn-danger float-left" onClick={ClientEditorHandler}>Cancel</button> 
                    </div>
                );

                setAddressEditorContent(
                    <div>
                        <h1>{clientData.address != undefined ? "Edit " : "Add "}Client Address</h1>
                        <AddressEditor clientId={route.id} clientAddressData={clientData.address} />

                        <DeleteDialog id={clientData.id} resourceName="address" route={process.env.REACT_APP_API_ADDRESS_DELETE} />

                        <button className="btn btn-warning float-left" onClick={AddressEditorHandler}>Cancel</button> 
                    </div>
                    
                );
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

        
    }, []);

    //Client Editor Handler
    const ClientEditorHandler = () => {

        setClientEditor(current => !current);

    }

    //Address Menu Handler
    const AddressEditorHandler = () => {

        setAddressEditor(current => !current);

    }

    return (
        <Card classname="text-center">

            <div className={`response-div ${clientEditor || addressEditor ? "closed" : ""}`}>
                <div className="row">
                    <div className="col-6">
                        <h1>Client Information</h1></div>
                    <div className="col-6">
                        <NavLink to={nav_routes.CLIENT_SEARCH} className="btn btn-primary float-right">
                            Back to Client Search 
                        </NavLink>
                    </div>
                    
                </div>
                
                {responseContent}

            </div>

            <div className={`client-editor-div ${!clientEditor ? "closed" : ""}`}>
                <h1>Client Edit</h1>
                {clientEditorContent}
            </div>

            <div className={`address-editor-div ${!addressEditor ? "closed" : ""}`}>
                {addressEditorContent}
            </div>

            
        </Card>
    );

}

export default ClientDetail;