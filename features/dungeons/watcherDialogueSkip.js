import settings from "../../settings";
import { EntityArmorStand } from "../../utils/entities";
import { RED } from "../../utils/formatting";
import { pling } from "../../utils/sounds";

let shownTitle = false;

register('worldLoad', () => {
    shownTitle = false;
    if (settings.watcherDialogueSkip) Client.showTitle(' ', ' ', 0, 0, 1) // Might fix first title not appearing
})

register('tick', () => {
    if (settings.watcherDialogueSkip && !shownTitle) {
        const watcher = World.getAllEntitiesOfType(EntityArmorStand).find(stand => stand.getName().removeFormatting().includes('The Watcher'))
        let bloodMobs = 0;

        if (watcher) {
            World.getAllEntitiesOfType(EntityArmorStand).forEach(stand => {
                if (stand.getName().removeFormatting().includes('❤') && watcher.distanceTo(stand) < 10) bloodMobs += 1
            })
        }

        if (bloodMobs >= 4) {
            Client.showTitle(`${RED}KILL NOW`, '', 0, 20, 20)
            pling.play();
            shownTitle = true;
        }
    }
})