import settings from "../../settings";
import { RED } from "../../utils/formatting";

register('worldLoad', () => {
    if (settings.bloodAlerts) Client.showTitle(' ', ' ', 0, 0, 1); // Might fix first title not appearing
})

register('chat', () => {
    if (settings.bloodAlerts) {
        setTimeout(() => {
            Client.showTitle(`${RED}BLOOD CLEARED`, '', 0, 40, 20);
            World.playSound('note.pling', 1, 2);
            if (settings.bloodAlertsParty) ChatLib.command('pc Blood Cleared!');
        }, 10)
    }
}).setCriteria("[BOSS] The Watcher: You have proven yourself. You may pass.")