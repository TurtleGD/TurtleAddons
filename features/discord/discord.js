import settings from "../../settings";
import { request } from "../../../axios";

function sendWebhook(message) {
    let webhookName = settings.webhookName;
    let webhookPfp = settings.webhookPfp;
    let webhookMessage = settings.webhookMessage;

    if (settings.webhookMessage == 'chat') webhookMessage = message;
    if (settings.webhookCoords) webhookMessage += ` | x: ${Math.round(Player.getX())}, y: ${Math.round(Player.getY())}, z: ${Math.round(Player.getZ())}`;

    if (settings.webhookName == '') webhookName = 'TurtleAddons'
    if (settings.webhookPfp == '') webhookPfp = 'https://cdn.discordapp.com/attachments/1070513025959858267/1209659981142691850/discordblue.png?ex=65e7baa5&is=65d545a5&hm=31919c044bbf082e06a37333ceef681ec62577607831c5448011c2ecde866f09&'
    if (settings.webhookMessage == '') webhookMessage = 'Default Message'

    if (settings.webhookTimestamp) webhookMessage += ` (<t:${Math.round(new Date().getTime() / 1000)}:t>)`

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
