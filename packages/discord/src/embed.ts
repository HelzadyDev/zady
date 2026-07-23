import {
    EmbedBuilder,
    type ColorResolvable,
    type EmbedAuthorOptions,
    type EmbedFooterOptions,
    type GuildMember,
    type User
} from "discord.js";

interface EmbedImageOptions {
    url: string;
    width?: number;
    height?: number;
}

interface EmbedFieldOptions {
    name: string;
    value: string;
    inline?: boolean;
}

interface CreateEmbedOptions {
    title?: string;
    description?: string;
    url?: string;
    color?: ColorResolvable;
    author?: EmbedAuthorOptions;
    thumbnail?: string;
    image?: string | EmbedImageOptions;
    footer?: EmbedFooterOptions;
    timestamp?: boolean | Date | number;
    fields?: EmbedFieldOptions[];
}

/**
 * Cria um `EmbedBuilder` já preenchido a partir de um único objeto de opções,
 * aceitando `image`/`thumbnail` tanto como string quanto como objeto detalhado.
 * @example
 * ```ts
 * const embed = createEmbed({
 *   title: "Bem-vindo!",
 *   description: "Seja bem-vindo ao servidor.",
 *   thumbnail: "https://github.com/HelzadyDev.png",
 *   image: { url: guild.iconURL() ?? "", width: 400, height: 100 },
 * });
 * ```
 */
export function createEmbed(options: CreateEmbedOptions): EmbedBuilder {
    const { title, description, url, color, author, thumbnail, image, footer, timestamp, fields } = options;

    const embed = new EmbedBuilder();

    if (title) embed.setTitle(title);
    if (description) embed.setDescription(description);
    if (url) embed.setURL(url);
    if (color) embed.setColor(color);
    if (author) embed.setAuthor(author);
    if (thumbnail) embed.setThumbnail(thumbnail);
    if (image) embed.setImage(typeof image === "string" ? image : image.url);
    if (footer) embed.setFooter(footer);
    if (timestamp) embed.setTimestamp(timestamp === true ? Date.now() : timestamp);
    if (fields?.length) embed.addFields(fields);

    return embed;
}

type EmbedAuthorSource = User | GuildMember | EmbedAuthorOptions;

/**
 * Monta um objeto `EmbedAuthorOptions` a partir de um `User`, `GuildMember` ou já a partir
 * de um objeto de opções pronto, extraindo automaticamente nome e avatar quando possível.
 * @example
 * ```ts
 * const embed = createEmbed({ author: createEmbedAuthor(interaction.user) });
 * ```
 */
export function createEmbedAuthor(source: EmbedAuthorSource): EmbedAuthorOptions {
    if ("displayAvatarURL" in source) {
        const isMember = "user" in source;
        const name = isMember ? source.displayName : source.username;

        return {
            name,
            iconURL: source.displayAvatarURL()
        };
    }

    return source;
}