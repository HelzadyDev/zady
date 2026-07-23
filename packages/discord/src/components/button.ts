import { ButtonBuilder, ButtonStyle, type APIMessageComponentEmoji } from "discord.js";

interface BaseButtonOptions {
    label?: string;
    emoji?: string | APIMessageComponentEmoji;
    disabled?: boolean;
}

interface ButtonOptions extends BaseButtonOptions {
    customId: string;
    style?: Exclude<ButtonStyle, ButtonStyle.Link>;
}

/**
 * Cria um `ButtonBuilder` comum (não-link) de forma mais direta.
 * @example
 * ```ts
 * const button = createButton({ customId: "confirm", label: "Confirmar", style: ButtonStyle.Success });
 * ```
 */
export function createButton(options: ButtonOptions): ButtonBuilder {
    const { customId, style = ButtonStyle.Secondary, label, emoji, disabled } = options;

    const button = new ButtonBuilder().setCustomId(customId).setStyle(style);

    if (label) button.setLabel(label);
    if (emoji) button.setEmoji(emoji);
    if (typeof disabled === "boolean") button.setDisabled(disabled);

    return button;
}

interface LinkButtonOptions extends BaseButtonOptions {
    url: string;
}

/**
 * Cria um `ButtonBuilder` do tipo Link, já com a `style` e a `url` configuradas.
 * @example
 * ```ts
 * const row = createRow(
 *   createLinkButton({ label: "Github", url: "https://github.com/HelzadyDev" }),
 * );
 * interaction.reply({ components: [row] });
 * ```
 */
export function createLinkButton(options: LinkButtonOptions): ButtonBuilder {
    const { url, label, emoji, disabled } = options;

    const button = new ButtonBuilder().setStyle(ButtonStyle.Link).setURL(url);

    if (label) button.setLabel(label);
    if (emoji) button.setEmoji(emoji);
    if (typeof disabled === "boolean") button.setDisabled(disabled);

    return button;
}