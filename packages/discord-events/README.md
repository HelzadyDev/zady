# Zady Discord Events

Instale com

```bash
npm install @zady/discord-events
pnpm add @zady/discord-events
yarn add @zady/discord-events
```

`@zady/discord-events` adiciona eventos estendidos ao `discord.js` para cenários comuns de bots, como moderação, salas de voz, webhooks, cargos e canais.

## Setup

```ts
import { Client, GatewayIntentBits } from "discord.js";
import { initDiscordEvents } from "@zady/discord-events";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.MessageContent,
    ],
});

initDiscordEvents(client);
```

## Uso

Depois da inicialização, os eventos podem ser consumidos com `client.on(...)`, como qualquer evento nativo:

```ts
client.on("guildMemberMoved", (member, executor, oldChannel, newChannel) => {
    console.log(`${member.displayName} foi movido por ${executor.displayName}`);
    console.log(`${oldChannel.name} -> ${newChannel.name}`);
});
```

## Eventos

| Evento | Parâmetros | Descrição |
| --- | --- | --- |
| `webhookMessageCreate` | `message`, `webhook` | Dispara quando uma mensagem criada por webhook aparece no servidor. |
| `guildMemberConnect` | `member`, `voiceChannel` | Dispara quando um membro entra em um canal de voz. |
| `guildMemberDisconnect` | `member`, `voiceChannel` | Dispara quando um membro sai de um canal de voz. |
| `guildMemberMoved` | `member`, `executor`, `oldVoiceChannel`, `newVoiceChannel` | Dispara quando um membro é movido por alguém entre canais de voz. |
| `guildMemberTimeoutAdd` | `member`, `executor`, `expireAt`, `reason` | Dispara quando um timeout é aplicado. |
| `guildMemberTimeoutRemove` | `member`, `executor` | Dispara quando um timeout é removido. |
| `userKick` | `user`, `executor`, `reason`, `guild` | Dispara quando um usuário é expulso do servidor. |
| `userBanAdd` | `user`, `executor`, `reason`, `guild` | Dispara quando um usuário é banido. |
| `userBanRemove` | `user`, `executor`, `guild` | Dispara quando um banimento é removido. |
| `extendedRoleCreate` | `role`, `executor` | Dispara quando um cargo é criado. |
| `extendedRoleDelete` | `role`, `executor` | Dispara quando um cargo é excluído. |
| `extendedRoleUpdate` | `oldRole`, `newRole`, `executor` | Dispara quando um cargo é atualizado. |
| `extendedChannelDelete` | `channel`, `executor` | Dispara quando um canal do servidor é excluído. |
| `guildChannelDelete` | `channel`, `executor` | Alias compatível para `extendedChannelDelete`. |

## Diferenças da implementação original

- `guildMemberConnect` só dispara em entrada real, não em troca de sala.
- `guildMemberDisconnect` só dispara em saída real, não em troca de sala.
- `extendedRoleUpdate` consulta `RoleUpdate`, não `RoleDelete`.
- A resolução do executor tenta cache e `guild.members.fetch(...)`, reduzindo falsos negativos.
