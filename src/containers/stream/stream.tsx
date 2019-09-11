import * as React from 'react';
import TopBar from "./topBar";
import ChatBox from "./chatBox";
import EventsList from "./event";
import { CHAT_CLIENT, connect } from "./realtimeEvent";

/**
 * Type of sidebar: Chats or Recent Events.
 */
export enum SideBarType {
    CHAT,
    EVENTS
}

/**
 * Stream Page:  1) Show Live Stream 2) Show Chat 3) Show Events.
 * @constructor
 */
const Stream = () => {

    const streamerId = localStorage.getItem('streamerId');
    const [sideBarType, setSideBarType] = React.useState(SideBarType.CHAT);
    if (streamerId && !CHAT_CLIENT) {
        connect();
    }

    return (
        <React.Fragment>
            <TopBar setSideBarType={setSideBarType} sideBarType={sideBarType}/>
            <div style={{ display: 'flex' }}>
                <div>
                    <iframe
                        title={`${streamerId}`}
                        src={`https://player.twitch.tv/?channel=${streamerId}&muted=true`}
                        frameBorder='0'
                        scrolling='no'
                        allowFullScreen={true}
                        style={{ width: '1000px', height: '705px' }}
                    >
                    </iframe>
                </div>
                <div>
                    {sideBarType === SideBarType.CHAT && <ChatBox/>}
                    {sideBarType === SideBarType.EVENTS && <EventsList/>}
                </div>
            </div>
        </React.Fragment>
    );
};

export default Stream;