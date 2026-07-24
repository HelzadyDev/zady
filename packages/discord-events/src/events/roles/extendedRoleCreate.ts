import { AuditLogEvent, type ClientEvents, type GuildMember, type Role } from "discord.js";
import { resolveGuildMember } from "../utils/resolveGuildMember";

export type ExtendedRoleCreateEvent = [role: Role, executor: GuildMember];

export async function extendedRoleCreate([auditLogEntry, guild]: ClientEvents["guildAuditLogEntryCreate"]) {
    const { action, executorId, target, targetType } = auditLogEntry;

    if (action !== AuditLogEvent.RoleCreate) return;
    if (targetType !== "Role") return;
    if (!executorId) return;

    const executor = await resolveGuildMember(guild, executorId);
    if (!executor) return;

    guild.client.emit("extendedRoleCreate", target as Role, executor);
}
