import * as React from 'react';
import TopBar from "./topBar";
import ChatBox from "./chatBox";
import EventsList from "./event";
import { CHAT_CLIENT, connect } from "./realtimeEvent";

export enum SideBarType {
    CHAT,
    EVENTS
}

const Stream = (props: any) => {

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