import { AuditLogEvent, Client, type Guild, type GuildMember, type Role } from "discord.js";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { extendedRoleUpdate } from "../src/events/roles/extendedRoleUpdate";

describe("extendedRoleUpdate", () => {
    let client: Client;
    let guild: Guild;
    let executor: GuildMember;
    let oldRole: Role;
    let newRole: Role;
    let fetchAuditLogs: ReturnType<typeof vi.fn>;
    let fetchMember: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        client = new Client({ intents: [] });
        vi.spyOn(client, "emit");

        executor = { id: "executor-1" } as GuildMember;
        fetchAuditLogs = vi.fn();
        fetchMember = vi.fn();

        guild = {
            client,
            fetchAuditLogs,
            members: {
                cache: new Map<string, GuildMember>(),
                fetch: fetchMember,
            },
        } as unknown as Guild;

        oldRole = { id: "role-1", guild } as Role;
        newRole = { id: "role-1", guild } as Role;
    });

    it("consulta o audit log de update de cargo e emite o evento", async () => {
        fetchAuditLogs.mockResolvedValue({
            entries: [
                {
                    targetId: newRole.id,
                    executorId: executor.id,
                },
            ],
        });
        fetchMember.mockResolvedValue(executor);

        await extendedRoleUpdate(oldRole, newRole);

        expect(fetchAuditLogs).toHaveBeenCalledWith({ type: AuditLogEvent.RoleUpdate });
        expect(client.emit).toHaveBeenCalledWith("extendedRoleUpdate", oldRole, newRole, executor);
    });

    it("nao emite quando nao encontra o executor", async () => {
        fetchAuditLogs.mockResolvedValue({
            entries: [
                {
                    targetId: newRole.id,
                    executorId: executor.id,
                },
            ],
        });
        fetchMember.mockResolvedValue(null);

        await extendedRoleUpdate(oldRole, newRole);

        expect(client.emit).not.toHaveBeenCalled();
    });
});
