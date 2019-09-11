import React from 'react';
import Home from './containers/home/home';
import { BrowserRouter as Router, Route} from "react-router-dom";
import AuthCallBack from "./containers/auth/authCallBack";

function App() {
    return (
        <React.Fragment>
            <Router>
                <Route exact={true} path='/' component={Home}/>
                <Route exact={true} path='/twitch/auth/callback' component={AuthCallBack}/>
            </Router>
        </React.Fragment>
    );
}

export default App;