import * as React from 'react';
import { CLIENT_ID, REDIRECT_URL, SCOPE } from "../../utils/constants";
import twitch from '../../assets/twitch.png';
import './login.scss';

/**
 * Login page : Shows Twitch Login Button : Perform Twitch Auth on button click.
 * @constructor
 */
const Login = () => {

   const authUrl = () => {

        return 'https://api.twitch.tv/kraken/oauth2/authorize' +
            '?response_type=token' +
            '&client_id=' + CLIENT_ID +
            '&redirect_uri=' + REDIRECT_URL +
            '&scope=' + SCOPE;
    };

    return (
        <div className={'login-container'}>
            <img src={twitch} alt={'Twitch'}/>
            <div className={'label'}>Welcome to StreamLab Twitch Connector</div>
            <a href={authUrl()} className={'login-button'}>
                Login with twitch.tv
            </a>
        </div>
    );
};

export default Login;