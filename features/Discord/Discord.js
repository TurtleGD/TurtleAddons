import settings from "../../settings";
import { request } from "../../../axios";
import { AQUA, GRAY, RESET } from "../../utils/formatting";

function sendWebhook(message) {
    let webhookName = settings.webhookName == "" ? "TurtleAddons" : settings.webhookName;
    let webhookPfp = settings.webhookPfp == "" ? `https://www.mc-heads.net/avatar/${Player.getName()}` : settings.webhookPfp;
    let webhookMessage = settings.webhookMessage;

    if (settings.webhookCoords) webhookMessage += ` | x: ${Math.round(Player.getX())}, y: ${Math.round(Player.getY())}, z: ${Math.round(Player.getZ())}`;
    if (settings.webhookTimestamp) webhookMessage += ` (<t:${Math.round(new Date().getTime() / 1000)}:t>)`;

    request({
        url: settings.webhookLink,
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "User-Agent": "Mozilla/5.0"
        },
        body: {
            "username": webhookName,
            "avatar_url": webhookPfp,
            "content": `${webhookMessage.replace("[message]", message)}`
        }
    })
}

register("chat", (message) => {
    if (settings.discordWebhook && new RegExp(settings.webhookRegex).test(message)) {
        if (settings.webhookNonPlayer && message.includes(':')) return;
        else if (settings.webhookLink == '') ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${RESET}No webhook URL set.`);
        else sendWebhook(message);
    }
}).setCriteria("${message}");