<div align="center">

![Zady Discord](https://capsule-render.vercel.app/api?type=waving&color=5865F2&height=120&section=header&text=Zady%20Discord&fontSize=40&fontColor=ffffff)

 [![npm version](https://img.shields.io/npm/v/@zady/discord.svg)](https://www.npmjs.com/package/@zady/discord)

 </div>

# Instale com

```bash
npm install @zady/discord
```
```bash
yarn add @zady/discord
```
```bash
pnpm add @zady/discord
```

Coleção de funções utilitárias para acelerar o desenvolvimento de bots Discord com [discord.js](https://discord.js.org/): componentes (botões, rows, modais), embeds, cores, canais e mais. Já inclui e reexporta tudo o que vem do [`@zady/core`](../core).

> **Peer dependency:** este pacote requer `discord.js@^14.27.0` instalado no seu projeto.

## Cores

```ts
import { hexToRgb } from "@zady/discord";

console.log(hexToRgb("#5865F2")); // [88, 101, 242]
console.log(hexToRgb("fff"));     // [255, 255, 255]
```

## Canais

```ts
import { getChannelUrlInfo, findChannel } from "@zady/discord";
import { ChannelType } from "discord.js";

const url = "https://discord.com/channels/537817462272557057/832829213651763210";
const { guildId, channelId } = getChannelUrlInfo(url);
console.log(guildId);   // 537817462272557057
console.log(channelId); // 832829213651763210

function run(interaction: ChatInputCommandInteraction<"cached">) {
    const { guild } = interaction;

    // Por padrão busca por GuildText
    const channel = findChannel(guild).byId("832829213651763210");

    // Também é possível buscar por nome e/ou tipo
    const voice = findChannel(guild).byName("Sala de reunião", {
        type: ChannelType.GuildVoice,
    });
}
```

## Embeds

```ts
import { createEmbed, createEmbedAuthor } from "@zady/discord";

function run(interaction: ChatInputCommandInteraction) {
    const embed = createEmbed({
        title: "Bem-vindo!",
        description: "Seja bem-vindo ao servidor.",
        color: "#5865F2",
        author: createEmbedAuthor(interaction.user),
        thumbnail: "https://github.com/HelzadyDev.png",
        image: { url: interaction.guild?.iconURL() ?? "" },
        footer: { text: "Zady Discord" },
        timestamp: true,
        fields: [
            { name: "Membros", value: "128", inline: true },
        ],
    });

    interaction.reply({ embeds: [embed] });
}
```

## Componentes

### Row

```ts
import { createRow, createButton } from "@zady/discord";
import { ButtonStyle } from "discord.js";

const row = createRow(
    createButton({ customId: "confirm", label: "Confirmar", style: ButtonStyle.Success }),
    createButton({ customId: "cancel", label: "Cancelar", style: ButtonStyle.Danger }),
);

interaction.reply({ components: [row] });
```

### Button

```ts
import { createButton, createLinkButton, createRow } from "@zady/discord";
import { ButtonStyle } from "discord.js";

const button = createButton({
    customId: "confirm",
    label: "Confirmar",
    style: ButtonStyle.Success,
});

const row = createRow(
    button,
    createLinkButton({ label: "Github", url: "https://github.com/HelzadyDev" }),
);

interaction.reply({ components: [row] });
```

### Modal

```ts
import { createModalInput, createModlaFields, modalFielsToRecord } from "@zady/discord";
import { ModalBuilder, TextInputStyle } from "discord.js";

// Criando um único input
const nameInput = createModalInput({
    customId: "name",
    label: "Nome",
    style: TextInputStyle.Short,
});

// Criando várias rows a partir de um record
const modal = new ModalBuilder({
    customId: "my/modal",
    title: "Meu modal",
    components: createModlaFields({
        name: { label: "Nome" },
        age: { label: "Idade", style: TextInputStyle.Short },
    }),
});

interaction.showModal(modal);

// Ao receber o submit, convertendo os fields em um record simples
function run(interaction: ModalSubmitInteraction) {
    const fields = modalFielsToRecord<"name" | "age">(interaction.fields);

    console.log(fields.name);
    console.log(fields.age);
}
```

## API completa

| Módulo                    | Função                                                              | Descrição                                                                 |
|----------------------------|----------------------------------------------------------------------|----------------------------------------------------------------------------|
| `color.ts`                 | `hexToRgb(hex: string): [number, number, number]`                    | Converte uma cor hex (curta ou longa, com ou sem `#`) em uma tupla RGB      |
| `channel.ts`                | `getChannelUrlInfo(url: string): ChannelUrlInfo`                     | Extrai `guildId` e `channelId` de uma url de canal do Discord              |
| `channel.ts`                | `findChannel(guild: Guild)`                                          | Retorna helpers `.byId()` e `.byName()` para buscar canais tipados no cache |
| `embed.ts`                  | `createEmbed(options: CreateEmbedOptions): EmbedBuilder`             | Cria um `EmbedBuilder` já preenchido a partir de um único objeto de opções |
| `embed.ts`                  | `createEmbedAuthor(source): EmbedAuthorOptions`                      | Monta um `EmbedAuthorOptions` a partir de `User`, `GuildMember` ou objeto  |
| `components/row.ts`        | `createRow(...components): ActionRowBuilder`                         | Cria uma `ActionRowBuilder` já preenchida com os componentes informados    |
| `components/button.ts`     | `createButton(options: ButtonOptions): ButtonBuilder`                 | Cria um `ButtonBuilder` comum (não-link)                                   |
| `components/button.ts`     | `createLinkButton(options: LinkButtonOptions): ButtonBuilder`         | Cria um `ButtonBuilder` do tipo Link já com `style` e `url`                 |
| `components/modal.ts`      | `createModalInput(options: ModalInputOptions): TextInputBuilder`      | Cria um `TextInputBuilder` para uso dentro de um modal                     |
| `components/modal.ts`      | `createModlaFields(fields: ModalFieldsMap): ActionRowBuilder[]`       | Cria várias rows de modal a partir de um record `customId -> options`      |
| `components/modal.ts`      | `modalFielsToRecord(fields: ModalSubmitFields): Record<K, string>`    | Converte os `fields` de um submit de modal em um record `customId -> valor`|

Além disso, tudo o que é exportado por [`@zady/core`](../core) (validação, texto, números etc.) também é reexportado por este pacote.

## LICENSE

### ISC © [Helzady](https://github.com/HelzadyDev)