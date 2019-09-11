import TwitchClient from 'twitch';
import ChatClient from 'twitch-chat-client';
import { CLIENT_ID, SECRET } from "../../utils/constants";
import randomColor from "randomcolor";
import { eventReceived, messageReceived } from "../../store/action";
import { store } from '../../index';

export let events = [] as any;

/**
 * This is the main core file of the application.
 * 1) It listen for chat messages, Subscription Event, Re-Subscription Event, Gift Event. Once it receive the signal it
 * send corresponding store action. This action will update the store with reducer.
 * 2) On Store update it will re render the component and UI will be updated.
 */
export const getChatClient = async () => {
    const channelId = localStorage.getItem('streamerId');
    if (!channelId) {
        return;
    }
    const clientId = CLIENT_ID;
    const clientSecret = SECRET;
    const refreshToken = localStorage.getItem('refreshToken');
    const expiryTimestamp = localStorage.getItem('expiryTimestamp');
    const accessToken = localStorage.getItem('token');
    const tokenData = {
        refreshToken: refreshToken ? refreshToken : null,
        expiryTimestamp: expiryTimestamp ? expiryTimestamp : null,
        clientSecret,
        accessToken: accessToken ? accessToken : null
    } as any;
    const twitchClient = await TwitchClient.withCredentials(clientId, tokenData.accessToken, undefined, {
        clientSecret,
        refreshToken: tokenData.refreshToken,
        expiry: tokenData.expiryTimestamp === null ? null : new Date(tokenData.expiryTimestamp),
        onRefresh: async ({ accessToken, refreshToken, expiryDate }) => {
            const expiryTimestamp = expiryDate === null ? null : expiryDate.getTime();
            localStorage.setItem('token', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('expiryTimestamp', `${expiryTimestamp}`);
        }
    });

    const chatClient = await ChatClient.forTwitchClient(twitchClient);

    await chatClient.connect();
    await chatClient.waitForRegistration();
    await chatClient.join(channelId);

    chatClient.onPrivmsg((channel: any, user: any, message: any) => {
        if (message === '!ping') {
            chatClient.say(channel, 'Pong!');
        }
        const color = randomColor({ luminosity: 'dark' });
        store.dispatch(messageReceived({
            message, user: `<span style="font-weight: bold;color: ${color}">${user}</span>`
        }));
    });
    chatClient.onSub((channel: any, user: any) => {
        store.dispatch(eventReceived(`Thanks to @${user} for subscribing to the channel!`));
    });
    chatClient.onResub((channel: any, user: any, subInfo: any) => {
        store.dispatch(eventReceived(`Thanks to @${user} for subscribing to the channel for a total of ${subInfo.months} months!`));
    });
    chatClient.onSubGift((channel: any, user: any, subInfo: any) => {
        store.dispatch(eventReceived(`Thanks to ${subInfo.gifter} for gifting a subscription to ${user}!`));
    });
    return chatClient;
};

export let CHAT_CLIENT: any = undefined;
export const connect = async () => {
    CHAT_CLIENT = await getChatClient();
};