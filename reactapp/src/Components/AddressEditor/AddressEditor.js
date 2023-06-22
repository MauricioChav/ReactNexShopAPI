import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "../../../node_modules/axios/index";
import moment from "moment";
import { nav_routes } from "../../routes";


function AddressEditor(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const [responseContent, setResponseContent] = useState();

    const loggedUser = JSON.parse(localStorage.getItem("user"));

    const submitAddressHandler = async (event) => {
        event.preventDefault();

        //Set payload info
        const country = event.target.elements.country.value;
        const state = event.target.elements.state.value;
        const city = event.target.elements.city.value;
        const street = event.target.elements.street.value;
        const zipCode = event.target.elements.zipCode.value;

        //Set client id
        const clientId = props.clientId;

        if (props.clientAddressData != undefined) {
            //Send edit request

            axios.patch(process.env.REACT_APP_API_ROOT + process.env.REACT_APP_API_ADDRESS_UPDATE,
                {
                    clientId,
                    country,
                    state,
                    city,
                    street,
                    zipCode
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + loggedUser.token
                    }
                })
                .then((response: AxiosResponse<any>) => {
                    //Response is successfull

                    setResponseContent(
                        <div>
                            <h5>User Address Updated successfully!</h5>
                        </div>
                    );

                    //Refresh the page
                    navigate(0);
                })
                .catch((error) => {
                    if (error.response) {
                        const clientError = error.response;
                        console.log(clientError);

                        if (clientError.status == 401) {
                            localStorage.removeItem("user");

                            setResponseContent(
                                <div>
                                    <h5>Unauthorized</h5>
                                </div>
                            );

                            //Refresh the page
                            navigate(0);

                        } else {
                            setResponseContent(
                                <div>
                                    <h5>{clientError.data.title}</h5>
                                    <h5>Status code: {clientError.data.status}</h5>
                                    <h5>{clientError.data.detail}</h5>
                                </div>
                            );
                        }


                    }

                });

        } else {
            //Send create request
            axios.post(process.env.REACT_APP_API_ROOT + process.env.REACT_APP_API_ADDRESS_CREATE,
                {
                    clientId,
                    country,
                    state,
                    city,
                    street,
                    zipCode
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + loggedUser.token
                    }
                })
                .then((response: AxiosResponse<any>) => {
                    //Response is successfull
                    //const createdAddress = response.data;
                    //console.log(createdAddress);

                    setResponseContent(
                        <div>
                            <h5>User Created successfully!</h5>
                        </div>
                    );

                    //Redirect to the detail page of the created content
                    navigate(0);
                })
                .catch((error) => {
                    if (error.response) {
                        const clientError = error.response;
                        console.log(clientError);

                        if (clientError.status == 401) {
                            localStorage.removeItem("user");

                            setResponseContent(
                                <div>
                                    <h5>Unauthorized</h5>
                                </div>
                            );

                            //Refresh the page
                            navigate(0);

                        } else {
                            setResponseContent(
                                <div>
                                    <h5>{clientError.data.title}</h5>
                                    <h5>Status code: {clientError.data.status}</h5>
                                    <h5>{clientError.data.detail}</h5>
                                </div>
                            );
                        }


                    }

                });
        }


    }

    return (
        <div>
            <div>
                <form className="default-form" onSubmit={submitAddressHandler} >

                    <label> Country:</label >
                    <input type="text" id="country" name="country" required defaultValue={props.clientAddressData != undefined ? props.clientAddressData.country : ""} />

                    <label>State:</label>
                    <input type="text" id="state" name="state" required defaultValue={props.clientAddressData != undefined ? props.clientAddressData.state : ""} />

                    <label>City:</label>
                    <input type="text" id="city" name="city" required defaultValue={props.clientAddressData != undefined ? props.clientAddressData.city : ""} />

                    <label>Street:</label>
                    <input type="text" id="street" name="street" required defaultValue={props.clientAddressData != undefined ? props.clientAddressData.street : ""} />

                    <label>Zip Code:</label>
                    <input type="number" id="zipCode" name="zipCode" required defaultValue={props.clientAddressData != undefined ? props.clientAddressData.zipCode : ""} />

                    <button className="btn btn-primary float-left">{props.clientAddressData != undefined ? "Update" : "Add"}</button>
                </form>
            </div>

            <div>
                {responseContent}
            </div>

        </div>
    );

}

export default AddressEditor;

    