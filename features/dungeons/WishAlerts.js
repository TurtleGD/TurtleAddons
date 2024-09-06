import settings from "../../settings";
import { RED } from "../../utils/formatting";
import { getArea } from "../../utils/functions";

let isM7Healer = false;

register('worldLoad', () => {
    if (settings.wishAlerts) Client.showTitle(' ', ' ', 0, 0, 1); // Might fix first title not appearing
})

register("chat", () => {
    setTimeout(() => {
        if (!getArea().includes('M7')) return;
        const dungeonClass = TabList?.getNames()?.map(a => a.removeFormatting())?.join(", ")?.match(new RegExp(`${Player?.getName()} \\((\\w+)`));
        if (dungeonClass) isM7Healer = dungeonClass[1] == 'Healer'
    }, 1000);
}).setCriteria("[NPC] Mort: Here, I found this map when I first entered the dungeon.")

register("chat", () => {
    if (settings.wishAlerts && isM7Healer) {
        setTimeout(() => {
            Client.showTitle(`${RED}WISH`, '', 0, 40, 20);
            World.playSound('note.pling', 1, 2);
        }, 10)
    }v
}).setCriteria("⚠ Maxor is enraged! ⚠")

register("chat", () => {
    if (settings.wishAlerts && isM7Healer) setTimeout(() => Client.showTitle(`${RED}WISH`, '', 0, 40, 20), 50);
}).setCriteria("The Core entrance is opening!")