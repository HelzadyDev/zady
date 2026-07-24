import { AuditLogEvent, type DMChannel, type GuildMember, type NonThreadGuildBasedChannel } from "discord.js";
import { resolveGuildMember } from "../utils/resolveGuildMember";

export type ExtendedChannelDeleteEvent = [channel: NonThreadGuildBasedChannel, executor: GuildMember];

export async function extendedChannelDelete(channel: DMChannel | NonThreadGuildBasedChannel) {
    if (channel.isDMBased()) return;

    const { guild } = channel;
    const logs = await guild.fetchAuditLogs({ type: AuditLogEvent.ChannelDelete }).catch(() => null);
    const entry = logs?.entries.find((item) => item.targetId === channel.id);
    const executorId = entry?.executorId;
    if (!executorId) return;

    const executor = await resolveGuildMember(guild, executorId);
    if (!executor) return;

    guild.client.emit("extendedChannelDelete", channel, executor);
    guild.client.emit("guildChannelDelete", channel, executor);
}
