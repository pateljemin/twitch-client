import TwitchClient from 'twitch';
import ChatClient from 'twitch-chat-client';
import { CLIENT_ID, SECRET } from "../../utils/constants";
import randomColor from "randomcolor";
import { eventReceived, messageReceived } from "../../store/action";
import { store } from '../../index';

export let events = [] as any;

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
        } else if (message === '!dice') {
            // const diceRoll = Math.floor(Math.random() * 6) + 1;
            //chatClient.say(channel, `@${user} rolled a ${diceRoll}`)
        }
        const color = randomColor();
        store.dispatch(messageReceived({
            message, user: `<span style="font-weight: bold;color: ${color}">${user}</span>`
        }));
        console.log(`[chat] channel:${channel} user:${user} message:${message}`);
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

    /*chatClient.onPrivmsg((channel: any, user: any, message: any) => {
        if (message === '!ping') {
            chatClient.say(channel, 'Pong!');
        } else if (message === '!dice') {
            const diceRoll = Math.floor(Math.random() * 6) + 1;
            chatClient.say(channel, `@${user} rolled a ${diceRoll}`)
        }
        console.log(`[chat] ${channel} ${user} ${message}`);
    });*/
    /*chatClient.onSub((channel: any, user: any) => {
        events.push(`Thanks to @${user} for subscribing to the channel!`);
        chatClient.say(channel, `Thanks to @${user} for subscribing to the channel!`);
        console.log(`Thanks to @${user} for subscribing to the channel!`);
    });
    chatClient.onResub((channel: any, user: any, subInfo: any) => {
        events.push(`Thanks to @${user} for subscribing to the channel for a total of ${subInfo.months} months!`);
        chatClient.say(channel, `Thanks to @${user} for subscribing to the channel for a total of ${subInfo.months} months!`);
        console.log(`Thanks to @${user} for subscribing to the channel for a total of ${subInfo.months} months!`);
    });
    chatClient.onSubGift((channel: any, user: any, subInfo: any) => {
        events.push(`Thanks to ${subInfo.gifter} for gifting a subscription to ${user}!`);
        chatClient.say(channel, `Thanks to ${subInfo.gifter} for gifting a subscription to ${user}!`);
        console.log(`Thanks to @${user} for subscribing to the channel for a total of ${subInfo.months} months!`);
    });*/
    return chatClient;
};

export let CHAT_CLIENT: any = undefined;
export const connect = async () => {
    CHAT_CLIENT = await getChatClient();
};