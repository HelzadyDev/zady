import { Client } from "discord.js";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { guildMemberConnect } from "../src/events/members/guildMemberConnect";
import { guildMemberDisconnect } from "../src/events/members/guildMemberDisconnect";

describe("eventos de voz", () => {
    let client: Client;

    beforeEach(() => {
        client = new Client({ intents: [] });
        vi.spyOn(client, "emit");
    });

    it("dispara guildMemberConnect apenas em entrada real", () => {
        const member = { id: "member-1" };
        const channel = { id: "voice-1", name: "Geral" };

        guildMemberConnect(
            {
                channelId: null,
            } as never,
            {
                channelId: channel.id,
                channel,
                member,
                client,
            } as never,
        );

        expect(client.emit).toHaveBeenCalledWith("guildMemberConnect", member, channel);
    });

    it("nao dispara guildMemberConnect quando o membro apenas troca de sala", () => {
        const member = { id: "member-1" };

        guildMemberConnect(
            {
                channelId: "voice-1",
            } as never,
            {
                channelId: "voice-2",
                channel: { id: "voice-2" },
                member,
                client,
            } as never,
        );

        expect(client.emit).not.toHaveBeenCalled();
    });

    it("dispara guildMemberDisconnect apenas em saida real", () => {
        const member = { id: "member-1" };
        const channel = { id: "voice-1", name: "Geral" };

        guildMemberDisconnect(
            {
                channelId: channel.id,
                channel,
            } as never,
            {
                channelId: null,
                channel: null,
                member,
                client,
            } as never,
        );

        expect(client.emit).toHaveBeenCalledWith("guildMemberDisconnect", member, channel);
    });

    it("nao dispara guildMemberDisconnect quando o membro apenas troca de sala", () => {
        const member = { id: "member-1" };

        guildMemberDisconnect(
            {
                channelId: "voice-1",
                channel: { id: "voice-1" },
            } as never,
            {
                channelId: "voice-2",
                channel: { id: "voice-2" },
                member,
                client,
            } as never,
        );

        expect(client.emit).not.toHaveBeenCalled();
    });
});
