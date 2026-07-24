import type { Message, Webhook } from "discord.js";

export type WebhookMessageCreateEvent = [message: Message<true>, webhook: Webhook];

export async function webhookMessageCreate(message: Message) {
    if (!message.inGuild()) return;
    if (!message.webhookId) return;

    const webhook = await message.fetchWebhook().catch(() => null);
    if (!webhook) return;

    message.client.emit("webhookMessageCreate", message, webhook);
}
