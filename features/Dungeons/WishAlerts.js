import settings from "../../settings";
import { RED } from "../../utils/formatting";
import { pogData } from "../../utils/pogData";

let isM7Healer = false;

register("chat", () => {
    Client.scheduleTask(20, () => {
        if (!pogData.skyblockArea.includes("Catacombs")) return;
        const dungeonClass = TabList?.getNames()?.map(a => a.removeFormatting())?.join(", ")?.match(new RegExp(`${Player?.getName()} \\((\\w+)`));
        if (dungeonClass) isM7Healer = dungeonClass[1] == "Healer";
    })
}).setCriteria("[NPC] Mort: Here, I found this map when I first entered the dungeon.")

register("chat", () => {
    if (settings.wishAlerts && isM7Healer) {
        Client.scheduleTask(1, () => {
            Client.showTitle(`${RED}WISH`, "", 0, 40, 20);
            World.playSound("note.pling", 1, 2);
        })
    }
}).setCriteria("⚠ Maxor is enraged! ⚠")

register("chat", () => {
    if (settings.wishAlerts && isM7Healer) Client.scheduleTask(1, () => Client.showTitle(`${RED}WISH`, "", 0, 40, 20));
}).setCriteria("The Core entrance is opening!")