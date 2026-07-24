import { type GuildMember, type VoiceBasedChannel, type VoiceState } from "discord.js";

export type GuildMemberDisconnectEvent = [
    member: GuildMember,
    channel: VoiceBasedChannel,
];

export function guildMemberDisconnect(oldState: VoiceState, newState: VoiceState) {
    if (!newState.member) return;
    if (oldState.channel === null) return;
    if (newState.channelId !== null) return;

    newState.client.emit("guildMemberDisconnect", newState.member, oldState.channel);
}
