import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "../../../node_modules/axios/index";

import { nav_routes } from "../../routes";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

function DeleteDialog(props) {
    const navigate = useNavigate();
    const route = useParams();
    const [responseContent, setResponseContent] = useState(<div></div>);
    const loggedUser = JSON.parse(localStorage.getItem("user"));

    const [openDeleteMenu, setOpenDeleteMenu] = useState(false);

    //Delete dialog
    const handleOpenDeleteDialog = () => {
        setOpenDeleteMenu(true);
        console.log(openDeleteMenu);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteMenu(false);
        console.log(openDeleteMenu);
    };

    const deleteClientHandler = async (event) => {
        event.preventDefault();

        console.log("ID " + props.id);
        //Set the parameters
        var params = {};

        if (props.resourceName == "address") {
            params = { client_id: props.id };
        } else {
            params = { id: props.id };
        }

        console.log("Delete " + props.resourceName);
        axios.delete(process.env.REACT_APP_API_ROOT + props.route,
            {
                params,
                headers: { Authorization: 'Bearer ' + loggedUser.token }
            })
            .then((response: AxiosResponse<any>) => {
                //If response is successfull, fill with the info
                const clientData = response.data;
                //console.log(clientData);

                setResponseContent(
                    <div>
                        <h5>Client Deleted successfully!</h5>
                    </div>
                );

                //Redirect page or refresh
                if (props.resourceName == "address") {
                    navigate(0);
                } else {
                    navigate(nav_routes.CLIENT_SEARCH);
                }
                
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


    return (
        <>
            <Dialog
                open={openDeleteMenu}
                onClose={handleCloseDeleteDialog}
                aria-labelledby="delete-dialog-title"
                aria-describedby="delete-dialog-description"
            >
                <DialogTitle id="delete-dialog-title">
                    Do you want to delete the {props.resourceName} with the id "{props.id}" ?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-dialog-description">
                        Deleting the {props.resourceName} will permanently remove it from the database.
                        {props.resourceName == "client" && "This will also remove the asociated address if there is one."}
                        <br></br> Do you wish to continue?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button
                        className="btn btn-danger"
                        onClick={deleteClientHandler}
                        autoFocus
                    >
                        Delete
                    </button>
                    <button className="btn btn-warning" onClick={handleCloseDeleteDialog}>
                        Cancel
                    </button>
                </DialogActions>
            </Dialog>

            <button className="btn btn-danger float-left" onClick={handleOpenDeleteDialog}>Delete {props.resourceName}</button>

            {responseContent}
        </>
    );

}

export default DeleteDialog;