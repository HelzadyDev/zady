import { AuditLogEvent, type ClientEvents, type Guild, type GuildMember, type User } from "discord.js";
import { resolveGuildMember } from "../utils/resolveGuildMember";

export type UserBanRemoveEvent = [
    user: User,
    executor: GuildMember,
    guild: Guild,
];

export async function userBanRemove([auditLogEntry, guild]: ClientEvents["guildAuditLogEntryCreate"]) {
    const { action, executorId, target, targetType } = auditLogEntry;

    if (action !== AuditLogEvent.MemberBanRemove) return;
    if (targetType !== "User") return;
    if (!executorId) return;

    const executor = await resolveGuildMember(guild, executorId);
    if (!executor) return;

    guild.client.emit("userBanRemove", target as User, executor, guild);
}
