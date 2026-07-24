import { type GuildMember, type VoiceBasedChannel, type VoiceState } from "discord.js";

export type GuildMemberConnectEvent = [
    member: GuildMember,
    channel: VoiceBasedChannel,
];

export function guildMemberConnect(oldState: VoiceState, newState: VoiceState) {
    if (!newState.member) return;
    if (oldState.channelId !== null) return;
    if (newState.channel === null) return;

    newState.client.emit("guildMemberConnect", newState.member, newState.channel);
}
