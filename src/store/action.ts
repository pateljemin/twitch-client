import { EVENT_RECEIVED, MESSAGE_RECEIVED, MESSAGE_SENT } from "./actionType";

export const messageReceived = (message: any) => {
    return {
        type: MESSAGE_RECEIVED,
        payload: {
            message
        }
    }
};

export const messageSent = (message: any) => {
    return {
        type: MESSAGE_SENT,
        payload: {
            message
        }
    }
};

export const eventReceived = (event: any) => {
    return {
        type: EVENT_RECEIVED,
        payload: {
            event
        }
    }
};