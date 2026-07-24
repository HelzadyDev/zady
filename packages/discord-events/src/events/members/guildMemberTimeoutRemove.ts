import { AuditLogEvent, type ClientEvents, type GuildMember } from "discord.js";
import { resolveGuildMember } from "../utils/resolveGuildMember";

export type GuildMemberTimeoutRemoveEvent = [
    member: GuildMember,
    executor: GuildMember,
];

export async function guildMemberTimeoutRemove([auditLogEntry, guild]: ClientEvents["guildAuditLogEntryCreate"]) {
    const { action, changes, targetId, targetType, executorId } = auditLogEntry;
    const timeoutChange = changes?.find((change) => change.key === "communication_disabled_until");

    if (action !== AuditLogEvent.MemberUpdate) return;
    if (targetType !== "User") return;
    if (!targetId || !executorId) return;
    if (typeof timeoutChange?.old !== "string") return;
    if (typeof timeoutChange.new !== "undefined") return;

    const member = await resolveGuildMember(guild, targetId);
    const executor = await resolveGuildMember(guild, executorId);
    if (!member || !executor) return;

    guild.client.emit("guildMemberTimeoutRemove", member, executor);
}
