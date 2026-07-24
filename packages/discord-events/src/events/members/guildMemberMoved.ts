import { AuditLogEvent, type GuildMember, type VoiceBasedChannel, type VoiceState } from "discord.js";
import { resolveGuildMember } from "../utils/resolveGuildMember";

export type GuildMemberMovedEvent = [
    member: GuildMember,
    executor: GuildMember,
    oldChannel: VoiceBasedChannel,
    newChannel: VoiceBasedChannel,
];

export async function guildMemberMoved(oldState: VoiceState, newState: VoiceState) {
    if (!newState.member) return;
    if (!oldState.channel || !newState.channel) return;
    if (oldState.channelId === newState.channelId) return;

    const { guild, member, client } = newState;
    const logs = await guild.fetchAuditLogs({ type: AuditLogEvent.MemberMove }).catch(() => null);
    const entry = logs?.entries.find((item) => item.targetId === member.id);
    const executorId = entry?.executorId;
    if (!executorId) return;

    const executor = await resolveGuildMember(guild, executorId);
    if (!executor) return;

    client.emit("guildMemberMoved", member, executor, oldState.channel, newState.channel);
}
