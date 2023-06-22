import React from 'react';
import axios, { AxiosResponse } from '../node_modules/axios/index';
import { Route, Routes } from 'react-router-dom';
import Home from './Views/Home';
import GetAllClients from './Views/Clients/GetAllClients';
import Menu from './Views/Header-Footer/Menu';
import Login from './Views/Login-Signup/Login';

import { nav_routes } from './routes';

import "./App.css";
import CreateClient from './Views/Clients/CreateClient';
import ClientSearch from './Views/Clients/ClientSearch';
import ClientDetail from './Views/Clients/ClientDetail';
import NotFound from './Views/NotFound/NotFound';
import Signup from './Views/Login-Signup/SignUp';


function App() {

    return (
        <div className="body-div">
            <Menu/>
            <div className="content">
                <Routes>
                    <Route exact path={nav_routes.HOME} element={<Home />} />
                    <Route exact path={nav_routes.LOGIN} element={<Login />} />
                    <Route exact path={nav_routes.SIGNUP} element={<Signup />} />
                    <Route exact path={nav_routes.CLIENT_ALL} element={<GetAllClients />} />
                    <Route exact path={nav_routes.CLIENT_SEARCH} element={<ClientSearch />} />
                    <Route exact path={nav_routes.CLIENT_DETAIL + ":id/"} element={<ClientDetail />} />
                    <Route exact path={nav_routes.CLIENT_CREATE} element={<CreateClient />} />
                    <Route exact path={"*"} element={<NotFound />} />
                </Routes>
            </div>
        </div>
        
    );
}

export default App;