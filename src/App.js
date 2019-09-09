import React from 'react';
import './App.css';
import Home from './components/home/home';
import { BrowserRouter as Router, Route} from "react-router-dom";
import AuthCallBack from "./components/auth/authCallBack";

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