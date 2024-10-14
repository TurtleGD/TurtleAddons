import settings from "../../settings";
import { getArea } from "../../utils/functions";

register("chat", (message) => {
    if (message.includes('reconnect')) return;

    const name = message.removeFormatting().split(' ')[0];
    const deathMessage = settings.deathMessage.replace('[name]', () => {
        if (name == 'You') return Player.getName();
        else return name;
    })
    if (settings.deathMessage.length > 0 && getArea().includes('Catacombs')) ChatLib.command(`pc ${deathMessage}`);
}).setCriteria('&r&c ☠ ${message}')