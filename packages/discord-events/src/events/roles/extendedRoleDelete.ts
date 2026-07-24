import { AuditLogEvent, type GuildMember, type Role } from "discord.js";
import { resolveGuildMember } from "../utils/resolveGuildMember";

export type ExtendedRoleDeleteEvent = [role: Role, executor: GuildMember];

export async function extendedRoleDelete(role: Role) {
    const { guild } = role;
    const logs = await guild.fetchAuditLogs({ type: AuditLogEvent.RoleDelete }).catch(() => null);
    const entry = logs?.entries.find((item) => item.targetId === role.id);
    const executorId = entry?.executorId;
    if (!executorId) return;

    const executor = await resolveGuildMember(guild, executorId);
    if (!executor) return;

    guild.client.emit("extendedRoleDelete", role, executor);
}
