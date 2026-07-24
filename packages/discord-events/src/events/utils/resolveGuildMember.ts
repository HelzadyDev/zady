import type { Guild, GuildMember } from "discord.js";

export async function resolveGuildMember(guild: Guild, memberId: string): Promise<GuildMember | null> {
    const cached = guild.members.cache.get(memberId);
    if (cached) return cached;

    return guild.members.fetch(memberId).catch(() => null);
}
