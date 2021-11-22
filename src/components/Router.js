import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Auth from "../router/Auth";
import Home from "../router/Home";
const AppRouter= () => {
    const [isLoggIn, setIsLoggedIn] = useState(false);
    return(
        <Router>
            <Routes>
                {isLoggIn ? (
                    <Route exact path="/" element={<Home/>} />
                ) : (
                    <Route exact path="/" element={<Auth/>} />
                )}
            </Routes>
        </Router>
    )

}

export default AppRouter;