import { AuditLogEvent, type ClientEvents, type Guild, type GuildMember, type User } from "discord.js";
import { resolveGuildMember } from "../utils/resolveGuildMember";

export type UserKickEvent = [
    user: User,
    executor: GuildMember,
    reason: string | null,
    guild: Guild,
];

export async function userKick([auditLogEntry, guild]: ClientEvents["guildAuditLogEntryCreate"]) {
    const { action, executorId, reason, target, targetType } = auditLogEntry;

    if (action !== AuditLogEvent.MemberKick) return;
    if (targetType !== "User") return;
    if (!executorId) return;

    const executor = await resolveGuildMember(guild, executorId);
    if (!executor) return;

    guild.client.emit("userKick", target as User, executor, reason ?? null, guild);
}
