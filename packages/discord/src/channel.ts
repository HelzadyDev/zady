import { ChannelType, type Guild, type GuildBasedChannel } from "discord.js";

const CHANNEL_URL_REGEX = /channels\/(\d+)\/(\d+)/;

interface ChannelUrlInfo {
    guildId?: string;
    channelId?: string;
}

/**
 * Extrai o `guildId` e o `channelId` de uma url de canal do Discord.
 * Se a url não seguir o padrão esperado, retorna um objeto vazio.
 * @example
 * ```ts
 * const url = "https://discord.com/channels/537817462272557057/832829213651763210";
 * const { guildId, channelId } = getChannelUrlInfo(url);
 * console.log(guildId);   // 537817462272557057
 * console.log(channelId); // 832829213651763210
 * ```
 */
export function getChannelUrlInfo(url: string): ChannelUrlInfo {
    const match = url.match(CHANNEL_URL_REGEX);
    if (!match) return {};

    const [, guildId, channelId] = match;
    return { guildId, channelId };
}

interface FindChannelOptions {
    type?: ChannelType;
}

/**
 * Busca canais no cache de uma guild de forma tipada.
 * Por padrão procura canais do tipo `GuildText`, mas isso pode ser alterado via `options.type`.
 * @example
 * ```ts
 * function run(interaction: ChatInputCommandInteraction<"cached">) {
 *   const { guild } = interaction;
 *   const channel = findChannel(guild).byId("832829213651763210");
 *   channel; // TextChannel | undefined
 * }
 * ```
 */
export function findChannel(guild: Guild) {
    return {
        byId<T extends GuildBasedChannel = GuildBasedChannel>(
            id: string,
            options: FindChannelOptions = {}
        ): T | undefined {
            const { type = ChannelType.GuildText } = options;
            const channel = guild.channels.cache.get(id);
            if (!channel || channel.type !== type) return undefined;
            return channel as T;
        },
        byName<T extends GuildBasedChannel = GuildBasedChannel>(
            name: string,
            options: FindChannelOptions = {}
        ): T | undefined {
            const { type = ChannelType.GuildText } = options;
            const channel = guild.channels.cache.find(
                (channel) => channel.name === name && channel.type === type
            );
            return channel as T | undefined;
        }
    };
}