import settings from "../../settings";
import { RED } from "../../utils/formatting";

register("chat", () => {
    if (settings.bloodAlerts) {
        Client.scheduleTask(1, () => {
            Client.showTitle(`${RED}BLOOD CLEARED`, "", 0, 40, 20);
            World.playSound("note.pling", 1, 2);
            if (settings.bloodAlertsParty) ChatLib.command("pc Blood Cleared!");
        })
    }
}).setCriteria("[BOSS] The Watcher: You have proven yourself. You may pass.")