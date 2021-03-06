import { MESSAGE_RECEIVED, EVENT_RECEIVED, MESSAGE_SENT } from "./actionType";

export const initialState = {
    messages: [],
    events: []
};

/**
 * Reducer which is used to maintain store data. On each action it will update the store. It just maintain latest
 * 100 chat messages to avoid browser crash. It also just maintain recent 10 events as per document.
 * @param state : Current state.
 * @param action : Action wil payload.
 */
const reducer = (state = initialState, action: any) => {

    console.log(`[chat] in reducer : ${JSON.stringify(action)}`);

    switch (action.type) {
        case MESSAGE_RECEIVED:
            if (state.messages.length >= 100) {
                const subMessages = state.messages.slice(state.messages.length - 100, state.messages.length);
                return {
                    ...state,
                    messages: [...subMessages, action.payload.message]
                };
            }
            return {
                ...state,
                messages: [...state.messages, action.payload.message]
            };
        case MESSAGE_SENT:
            return {
                ...state,
                messages: [...state.messages, action.payload.message]
            };
        case EVENT_RECEIVED:
            if (state.events.length >= 10) {
                const subEvents = state.events.slice(state.events.length - 10, state.events.length);
                return {
                    ...state,
                    events: [...subEvents, action.payload.event]
                };
            }
            return {
                ...state,
                events: [...state.events, action.payload.event]
            };
        default:
            return state;
    }
};

export default reducer;
