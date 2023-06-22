import React, {useState, useEffect} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "../../../node_modules/axios/index";
import Card from "../../Components/Card/Card";
import { nav_routes } from "../../routes";

import "./Login-Signup.css";

function Login() {
    const navigate = useNavigate();
    const [responseContent, setResponseContent] = useState();

    const loginHandler = async (event) => {
        event.preventDefault();

        //Set payload info
        const email = event.target.elements.email.value;
        const password = event.target.elements.password.value;

        axios.post(process.env.REACT_APP_API_ROOT + process.env.REACT_APP_API_ACCOUNT_LOGIN,
            {
                email,
                password
            })
            .then((response: AxiosResponse<any>) => {
                //If response is successfull, register the user in the local storage
                const user = response.data;
                localStorage.setItem("user", JSON.stringify(user));
                console.log(user);

                setResponseContent(
                    <div>
                        <h5>Login successful!</h5> 
                    </div>
                );

                //Refresh the page
                navigate(0);
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
                        <h1>Login</h1>
                        <form className="default-form" onSubmit={loginHandler}>
                            
                            <label>Email:</label>
                            <input type="email" id="email" name="email" required />


                            <label>Password:</label>
                            <input type="password" id="password" name="password" required />        
 
                            <button className="btn btn-secondary">Submit</button>
                        </form>

                        <h4>Not registered yet? Create an account</h4>
                        <NavLink to={nav_routes.SIGNUP}>
                            Sign Up
                        </NavLink>

                    </div>
                </div>
            </div>
            

            {responseContent}

            
        </Card>
    );

}

export default Login;