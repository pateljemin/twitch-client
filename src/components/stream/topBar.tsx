import * as React from 'react';
import { AppBar, IconButton, Toolbar, Tooltip, Typography } from "@material-ui/core";
import { PowerSettingsNew, Chat, EventAvailable, Edit } from '@material-ui/icons';
import { SideBarType } from "./stream";

const TopBar = (props: any) => {
    const token = localStorage.getItem('token');
    const streamerId = localStorage.getItem('streamerId');

    const logout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };

    const changeStreamer = () => {
        localStorage.removeItem('streamerId');
        window.location.reload();
    };

    const setChatSideBar = () => {
        props.setSideBarType(SideBarType.CHAT);
    };

    const setEventsSideBar = () => {
        props.setSideBarType(SideBarType.EVENTS);
    };

    return (
        <React.Fragment>
            <AppBar position="static" style={{ backgroundColor: '#6441a5' }}>
                <Toolbar>
                    {props.sideBarType === SideBarType.EVENTS && <Tooltip title={'Chat'}>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={setChatSideBar}>
                            <Chat/>
                        </IconButton>
                    </Tooltip>}
                    {props.sideBarType === SideBarType.CHAT && <Tooltip title={'Recent Events'}>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={setEventsSideBar}>
                            <EventAvailable/>
                        </IconButton>
                    </Tooltip>}
                    <Tooltip title={'Change Streamer'}>
                        <IconButton onClick={changeStreamer} edge="start" color="inherit" aria-label="menu">
                            <Edit/>
                        </IconButton>
                    </Tooltip>
                    <Typography variant="h6">
                        {streamerId}
                    </Typography>
                    {token && (
                        <div style={{ position: 'fixed', right: '10px' }}>
                            <Tooltip title={'Logout'}>
                                <IconButton
                                    aria-label="Logout"
                                    color="inherit"
                                    onClick={logout}
                                >
                                    <PowerSettingsNew/>
                                </IconButton>
                            </Tooltip>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );

};

export default TopBar;