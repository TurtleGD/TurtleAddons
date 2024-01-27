import settings from "../settings";
import { request } from "../../axios";

function sendWebhook(message) {
    let webhookMessage = settings.webhookMessage;

    if (settings.webhookMessage == 'chat') webhookMessage = message;
    if (settings.webhookCoords) webhookMessage += ` | x: ${Math.round(Player.getX())}, y: ${Math.round(Player.getY())}, z: ${Math.round(Player.getZ())}`;
    webhookMessage += ` ${settings.webhookPing}`

    request({
        url: settings.webhookLink,
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "User-Agent": "Mozilla/5.0"
        },
        body: {
            "username": settings.webhookName,
            "avatar_url": settings.webhookPfp,
            "content": webhookMessage
        }
    });
}

register("chat", (message) => {
    if (settings.discordWebhook == true && message.includes(settings.webhookMatch)) {
        if (settings.webhookNonPlayer == true && message.includes(':')) return;
        else sendWebhook(message);
    }
}).setCriteria("${message}");
