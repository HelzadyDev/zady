import { AuditLogEvent, type GuildMember, type Role } from "discord.js";
import { resolveGuildMember } from "../utils/resolveGuildMember";

export type ExtendedRoleUpdateEvent = [
    oldRole: Role,
    newRole: Role,
    executor: GuildMember,
];

export async function extendedRoleUpdate(oldRole: Role, newRole: Role) {
    const { guild } = newRole;
    const logs = await guild.fetchAuditLogs({ type: AuditLogEvent.RoleUpdate }).catch(() => null);
    const entry = logs?.entries.find((item) => item.targetId === newRole.id);
    const executorId = entry?.executorId;
    if (!executorId) return;

    const executor = await resolveGuildMember(guild, executorId);
    if (!executor) return;

    guild.client.emit("extendedRoleUpdate", oldRole, newRole, executor);
}
