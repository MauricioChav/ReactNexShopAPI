import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "../../../node_modules/axios/index";
import moment from "moment";
import { nav_routes } from "../../routes";


function ClientEditor(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const [responseContent, setResponseContent] = useState();

    const loggedUser = JSON.parse(localStorage.getItem("user"));

    const submitClientHandler = async (event) => {
        event.preventDefault();

        //Set payload info
        const firstName = event.target.elements.firstName.value;
        const lastName = event.target.elements.lastName.value;
        const email = event.target.elements.email.value;
        const birthday = event.target.elements.birthday.value;

        if (props.clientData != undefined) {
            //Send edit request

            //Set client id
            const id = props.clientData.id;

            axios.patch(process.env.REACT_APP_API_ROOT + process.env.REACT_APP_API_CLIENT_UPDATE,
                {
                    id,
                    firstName,
                    lastName,
                    email,
                    birthday
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + loggedUser.token
                    }
                })
                .then((response: AxiosResponse<any>) => {
                    //Response is successfull
                    //console.log(createdUser);

                    setResponseContent(
                        <div>
                            <h5>User Updated successfully!</h5>
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
            axios.post(process.env.REACT_APP_API_ROOT + process.env.REACT_APP_API_CLIENT_CREATE,
                {
                    firstName,
                    lastName,
                    email,
                    birthday
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + loggedUser.token
                    }
                })
                .then((response: AxiosResponse<any>) => {
                    //Response is successfull
                    const createdUser = response.data;
                    //console.log(createdUser);

                    setResponseContent(
                        <div>
                            <h5>User Created successfully!</h5>
                        </div>
                    );

                    //Redirect to the detail page of the created content
                    navigate(nav_routes.CLIENT_DETAIL + createdUser.id);
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
                <form className="default-form" onSubmit={submitClientHandler}>
                    {props.clientData != undefined &&
                        <div>
                            <label>Id:</label>
                            <input type="number" id="id" name="id" readOnly defaultValue={props.clientData.id} />
                        </div>
                    }

                    <label>First Name:</label>
                    <input type="text" id="firstName" name="firstName" required defaultValue={props.clientData != undefined ? props.clientData.firstName : ""} />

                    <label>Last Name:</label>
                    <input type="text" id="lastName" name="lastName" required defaultValue={props.clientData != undefined ? props.clientData.lastName : ""} />

                    <label>Email:</label>
                    <input type="email" id="email" name="email" required defaultValue={props.clientData != undefined ? props.clientData.email : ""} />

                    <label>Birthday:</label>
                    <input type="date" id="birthday" name="birthday" required defaultValue={props.clientData != undefined ? moment(props.clientData.birthday).format("YYYY-MM-DD") : ""} />

                    <button className="btn btn-primary float-left">{props.clientData != undefined ? "Update" : "Submit"}</button>
                </form>
            </div>

            <div>
                {responseContent}
            </div>
            
        </div>
    );

}

export default ClientEditor;