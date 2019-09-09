import * as React from "react";
import Login from "../auth/login";
import Form from "../form/form";
import Stream from "../stream/stream";

const Home = () => {

    const token = localStorage.getItem('token');
    const streamerId = localStorage.getItem('streamerId');

    const [loggedIn] = React.useState(!!token);
    const [streamerExist, setStreamerExist] = React.useState(!!streamerId);


    return (
        <React.Fragment>
            {!loggedIn && <Login/>}
            {loggedIn && !streamerExist && <Form setStreamerExist={setStreamerExist}/>}
            {loggedIn && streamerExist && <Stream/>}
        </React.Fragment>
    );

};

export default Home;