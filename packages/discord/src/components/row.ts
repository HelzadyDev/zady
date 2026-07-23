import { ActionRowBuilder, type AnyComponentBuilder } from "discord.js";

/**
 * Cria uma 'ActionRowBuilder" já preenchida com os componentes informados.
 * Aceita botões ou um único select menu (limite imposto pela própria API do discord).
 * 
 * @example
 * ```ts
 * Const row = createRow(
 *      new ButtonBuilder({ customID: "confirm", label: "Confirmar" });
 *      new ButtonBuilder({ customID: "cancel", label: "Cancelar" });
 * );
 * 
 * interaction.reply({ components: [row] });
 * ```
 */
export function createRow<T extends AnyComponentBuilder> (...components: T[]): ActionRowBuilder<T>{
    return new ActionRowBuilder<T>().addComponents(...components)
}