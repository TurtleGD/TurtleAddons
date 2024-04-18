import settings from "../../settings";
import { RED } from "../../utils/formatting";
import { getArea } from "../../utils/functions";

register('worldLoad', () => {
    if (settings.wishAlerts) Client.showTitle(' ', ' ', 0, 0, 1); // Might fix first title not appearing
})

register("chat", (message) => {
    if (settings.wishAlerts) {
        if (!getArea().includes('M7')) return;
        const dungeonClass = TabList?.getNames()?.map(a => a.removeFormatting())?.join(", ")?.match(new RegExp(`${Player?.getName()} \\((\\w+)`));
        if (dungeonClass && dungeonClass[1] != 'Healer') return;

        if (message == '⚠ Maxor is enraged! ⚠') {
            setTimeout(() => {
                Client.showTitle(`${RED}WISH`, '', 0, 40, 20);
                World.playSound('note.pling', 1, 2);
            }, 10)
        }

        if (message == 'The Core entrance is opening!') setTimeout(() => Client.showTitle(`${RED}WISH`, '', 0, 40, 20), 50);
    }
}).setCriteria("${message}")