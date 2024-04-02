import settings from "../../settings";
import { getArea } from "../../utils/functions";

register("chat", (message) => {
    if (message.startsWith(' ☠')) {
        const regex = /^ ☠ (.+?)\b/;
        const match = message.match(regex);
    
        const deathMessage = settings.deathMessage.replace('{name}', () => {
            if (match[1] == 'You') return Player.getName();
            else return match[1];
        })

        if (settings.deathMessage.length > 0 && getArea().includes('Catacombs')) ChatLib.command(`pc ${deathMessage}`);
    }
}).setCriteria("${message}")