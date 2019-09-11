import * as React from "react";
import Login from "../auth/login";
import Form from "../form/form";
import Stream from "../stream/stream";

/**
 * Main container of the application.
 * 1) Check if token is there or not ?
 *    i) Token is available then check for streamer id
 *        I) If streamer id is available then show stream page.
 *        II) If streamer id is not available then show FORM page to take streamer id.
 *   ii) Token is not available then show login page.
 *
 * @constructor
 */
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