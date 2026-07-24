import { type Client } from "discord.js";
import { extendedChannelDelete, type ExtendedChannelDeleteEvent } from "./events/channels/extendedChannelDelete";
import { guildMemberConnect, type GuildMemberConnectEvent } from "./events/members/guildMemberConnect";
import { guildMemberDisconnect, type GuildMemberDisconnectEvent } from "./events/members/guildMemberDisconnect";
import { guildMemberMoved, type GuildMemberMovedEvent } from "./events/members/guildMemberMoved";
import { guildMemberTimeoutAdd, type GuildMemberTimeoutAddEvent } from "./events/members/guildMemberTimeoutAdd";
import { guildMemberTimeoutRemove, type GuildMemberTimeoutRemoveEvent } from "./events/members/guildMemberTimeoutRemove";
import { webhookMessageCreate, type WebhookMessageCreateEvent } from "./events/messages/webhookMessageCreate";
import { extendedRoleCreate, type ExtendedRoleCreateEvent } from "./events/roles/extendedRoleCreate";
import { extendedRoleDelete, type ExtendedRoleDeleteEvent } from "./events/roles/extendedRoleDelete";
import { extendedRoleUpdate, type ExtendedRoleUpdateEvent } from "./events/roles/extendedRoleUpdate";
import { userBanAdd, type UserBanAddEvent } from "./events/users/userBanAdd";
import { userBanRemove, type UserBanRemoveEvent } from "./events/users/userBanRemove";
import { userKick, type UserKickEvent } from "./events/users/userKick";

const initializedClients = new WeakSet<Client>();

export function initDiscordEvents(client: Client) {
    if (initializedClients.has(client)) return client;
    initializedClients.add(client);

    client.on("guildAuditLogEntryCreate", (...args) => {
        extendedRoleCreate(args);
        userBanAdd(args);
        userBanRemove(args);
        userKick(args);
        guildMemberTimeoutAdd(args);
        guildMemberTimeoutRemove(args);
    });

    client.on("roleDelete", (role) => {
        void extendedRoleDelete(role);
    });

    client.on("roleUpdate", (oldRole, newRole) => {
        void extendedRoleUpdate(oldRole, newRole);
    });

    client.on("channelDelete", (channel) => {
        void extendedChannelDelete(channel);
    });

    client.on("voiceStateUpdate", (oldState, newState) => {
        guildMemberConnect(oldState, newState);
        guildMemberDisconnect(oldState, newState);
        void guildMemberMoved(oldState, newState);
    });

    client.on("messageCreate", (message) => {
        void webhookMessageCreate(message);
    });

    return client;
}

interface ZadyDiscordEvents {
    extendedChannelDelete: ExtendedChannelDeleteEvent;
    guildChannelDelete: ExtendedChannelDeleteEvent;
    extendedRoleCreate: ExtendedRoleCreateEvent;
    extendedRoleDelete: ExtendedRoleDeleteEvent;
    extendedRoleUpdate: ExtendedRoleUpdateEvent;
    guildMemberConnect: GuildMemberConnectEvent;
    guildMemberDisconnect: GuildMemberDisconnectEvent;
    guildMemberMoved: GuildMemberMovedEvent;
    guildMemberTimeoutAdd: GuildMemberTimeoutAddEvent;
    guildMemberTimeoutRemove: GuildMemberTimeoutRemoveEvent;
    webhookMessageCreate: WebhookMessageCreateEvent;
    userBanAdd: UserBanAddEvent;
    userBanRemove: UserBanRemoveEvent;
    userKick: UserKickEvent;
}

declare module "discord.js" {
    interface ClientEvents extends ZadyDiscordEvents {}
}
