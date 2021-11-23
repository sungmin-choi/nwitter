import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Auth from "../router/Auth";
import Home from "../router/Home";
import Profile from "../router/Profile";
import Navigation from "./Navigation";
const AppRouter= ({isLoggedIn}) => {
    return(
        <Router>
            {isLoggedIn && <Navigation/>}
            <Routes>
                {isLoggedIn ? (
                    <Route exact path="/" element={<Home/>} />
                ) : (
                    <Route exact path="/" element={<Auth/>} />
                )}
                 <Route exact path="/profile" element={<Profile/>} />
            </Routes>
        </Router>
    )

}

export default AppRouter;