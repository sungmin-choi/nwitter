import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Auth from "../router/Auth";
import Home from "../router/Home";
import Profile from "../router/Profile";
import Navigation from "./Navigation";
const AppRouter= ({isLoggedIn,userObj,refreshUser}) => {
    return(
        <Router>
            {isLoggedIn && <Navigation userObj={userObj}/>}
            <div
                              style={{
                                maxWidth: 890,
                                width: "100%",
                                margin: "0 auto",
                                marginTop: 80,
                                display: "flex",
                                justifyContent: "center",
                              }}>
            <Routes>
                {isLoggedIn ? (
  

                    <Route exact path="/" element={<Home userObj={userObj}/>} />
                    
                ) : (
                    <Route exact path="/" element={<Auth/>} />
                )}
                 <Route exact path="/profile" element={<Profile refreshUser={refreshUser} userObj={userObj}/>} />
            </Routes>
            </div>
        </Router>
    )

}

export default AppRouter;