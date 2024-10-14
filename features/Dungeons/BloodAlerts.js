import settings from "../../settings";
import { RED } from "../../utils/formatting";

register('chat', () => {
    if (settings.bloodAlerts) {
        setTimeout(() => {
            Client.showTitle(`${RED}BLOOD CLEARED`, '', 0, 40, 20);
            World.playSound('note.pling', 1, 2);
            if (settings.bloodAlertsParty) ChatLib.command('pc Blood Cleared!');
        }, 10)
    }
}).setCriteria("[BOSS] The Watcher: You have proven yourself. You may pass.")