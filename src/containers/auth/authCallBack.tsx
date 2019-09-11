import * as React from 'react';
import queryString from 'query-string'
import { Redirect } from 'react-router-dom'
import { CLIENT_ID } from "../../utils/constants";

/**
 * This container is used to handle twitch auth callback.
 *   1) Store Twitch Token in localstorage.
 *   2) CALL User info API to get user data and also store that info into localstorage.
 */
class AuthCallBack extends React.PureComponent<any, any> {

    constructor(props: any) {
        super(props);
        let value = window.location.href as any;
        value = value.replace('#', '?'); // URL parameters started with # but queryString lib works only if param
        // starts with ?
        value = queryString.parseUrl(value) as any;
        localStorage.setItem('token', value.query.access_token);
        this.fetchUserInfo();
    }

    fetchUserInfo = async () => {
        const fullUrl = 'https://api.twitch.tv/kraken/user';

        const token = localStorage.getItem('token');
        const headers = {
            'Accept': 'application/vnd.twitchtv.v5+json',
            'Client-ID': CLIENT_ID,
            'Authorization': `OAuth ${token}`,
        };

        fetch(fullUrl, {
            headers,
            method: 'GET',
            mode: 'cors',
        }).then(response => response.json())
            .then(data => localStorage.setItem('user', `${JSON.stringify(data)}`));
    };

    render() {
        return <Redirect to='/'/>
    }
}

export default AuthCallBack;