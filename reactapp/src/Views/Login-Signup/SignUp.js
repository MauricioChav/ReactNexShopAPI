import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "../../../node_modules/axios/index";
import Card from "../../Components/Card/Card";
import { nav_routes } from "../../routes";

import "./Login-Signup.css";

function Signup() {
    const navigate = useNavigate();
    const [responseContent, setResponseContent] = useState();

    const SignUpHandler = async (event) => {
        event.preventDefault();

        //Set payload info
        const email = event.target.elements.email.value;
        const password = event.target.elements.password.value;
        const password_confirm = event.target.elements.password_confirm.value;

        //Check the passwords are equal
        if (password != password_confirm) {
            return setResponseContent(
                <h5>Both password fields need to be the same</h5>
            );
        }

        axios.post(process.env.REACT_APP_API_ROOT + process.env.REACT_APP_API_ACCOUNT_REGISTER,
            {
                email,
                password
            })
            .then((response: AxiosResponse<any>) => {
                //If response is successfull, redirect to login
                const user = response.data;
                console.log(user);

                setResponseContent(
                    <div>
                        <h5>User Registered successfully!</h5>
                    </div>
                );

                //Redirect to login
                navigate(nav_routes.LOGIN);
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


    useEffect(() => {
        if (localStorage.getItem("user") !== null) {
            navigate(nav_routes.HOME);
        }
    }, []);

    return (
        <Card>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <h1>Sign Up</h1>
                        <form className="default-form" onSubmit={SignUpHandler}>

                            <label>Email:</label>
                            <input type="email" id="email" name="email" required />


                            <label>Password:</label>
                            <input type="password" id="password" name="password" required />

                            <label>Confirm Password:</label>
                            <input type="password" id="password_confirm" name="password_confirm" required />

                            <button className="btn btn-secondary">Submit</button>
                        </form>

                        <h4>Already registered?</h4>
                        <NavLink to={nav_routes.LOGIN}>
                            Login
                        </NavLink>

                    </div>
                </div>
            </div>


            {responseContent}


        </Card>
    );

}

export default Signup;