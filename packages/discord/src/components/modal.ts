import {
  ActionRowBuilder,
  ComponentType,
  TextInputBuilder,
  TextInputStyle,
  type ModalSubmitFields,
} from "discord.js";
import { createRow } from "./row";

interface ModalInputOptions {
  customId: string;
  label: string;
  style?: TextInputStyle;
  placeholder?: string;
  value?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
}

/**
 * Cria um 'TextInputBuilder' de forma mais direta, para ser usado dentro de um modal.
 *
 * @example
 * ```ts
 * const modal = new ModalBuilder({
 *  customId: "may/modal",
 *  title: "My modal",
 *  components: [
 *      createRow(createModal({ customId: "name", label: "Nome", style: TextInputStyle.short })),
 *  ]
 * });
 * interaction.showModal(modal);
 * ```
 */

export function createModalInput(options: ModalInputOptions): TextInputBuilder {
  const {
    customId,
    label,
    style = TextInputStyle.Short,
    placeholder,
    value,
    required,
    minLength,
    maxLength,
  } = options;

  const input = new TextInputBuilder()
    .setCustomId(customId)
    .setLabel(label)
    .setStyle(style);

  if (placeholder) input.setPlaceholder(placeholder);
  if (value) input.setValue(value);
  if (typeof required === "boolean") input.setRequired(required);
  if (typeof minLength === "number") input.setMinLength(minLength);
  if (typeof maxLength === "number") input.setMaxLength(maxLength);

  return input;
}

type ModalFieldsMap = Record<string, Omit<ModalInputOptions, "customId">>;

/**
 * Cria várias rows de modal a partir de um record, onde a chave do objeto vira o `customId` do input.
 * @example
 * ```ts
 * const modal = new ModalBuilder({
 *   customId: "my/modal",
 *   title: "My modal",
 *   components: createModalFields({
 *     name: { label: "Name" },
 *     age: { label: "Age" },
 *   })
 * });
 * interaction.showModal(modal);
 * ```
 */

export function createModlaFields(
  fields: ModalFieldsMap,
): ActionRowBuilder<TextInputBuilder>[] {
  return Object.entries(fields).map(([customId, options]) =>
    createRow(createModalInput({ customId, ...options })),
  );
}

/**
 * Converte os `fields` de um `ModalSubmitInteraction` em um record simples de `customId -> valor`.
 * Aceita um generic de union type para tipar as chaves conhecidas do formulário.
 * @example
 * ```ts
 * function run(interaction: ModalSubmitInteraction) {
 *   const fields = modalFieldsToRecord(interaction.fields);
 *   console.log(fields["my-custom-input-name"]);
 *   console.log(fields.age);
 * }
 * ```
 */
export function modalFielsToRecord<K extends string = string>(
    fields: ModalSubmitFields
): Record<K, string>{
    const record = {} as Record<K, string>;

    for (const [customId, field] of fields.fields) {
        if(field.type !== ComponentType.TextInput) continue;
        record[customId as K] = field.value; 
    }
    return record;
}