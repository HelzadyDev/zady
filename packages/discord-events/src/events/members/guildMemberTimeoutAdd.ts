import { AuditLogEvent, type ClientEvents, type GuildMember, type User } from "discord.js";
import { resolveGuildMember } from "../utils/resolveGuildMember";

export type GuildMemberTimeoutAddEvent = [
    member: GuildMember,
    executor: GuildMember,
    expireAt: Date,
    reason: string | null,
];

export async function guildMemberTimeoutAdd([auditLogEntry, guild]: ClientEvents["guildAuditLogEntryCreate"]) {
    const { action, changes, target, targetType, executorId, reason } = auditLogEntry;
    const timeoutChange = changes?.find((change) => change.key === "communication_disabled_until");

    if (action !== AuditLogEvent.MemberUpdate) return;
    if (targetType !== "User") return;
    if (!executorId) return;
    if (typeof timeoutChange?.new !== "string") return;

    const member = await resolveGuildMember(guild, (target as User).id);
    const executor = await resolveGuildMember(guild, executorId);
    if (!member || !executor) return;

    guild.client.emit("guildMemberTimeoutAdd", member, executor, new Date(timeoutChange.new), reason ?? null);
}
