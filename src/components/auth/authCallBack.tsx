import * as React from 'react';
import queryString from 'query-string'
import { Redirect } from 'react-router-dom'
import { CLIENT_ID } from "../../utils/constants";

class AuthCallBack extends React.PureComponent<any, any> {

    constructor(props: any) {
        super(props);
        let value = window.location.href as any;
        value = value.replace('#', '?');
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