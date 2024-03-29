import settings from "../../settings";
import { RED, BOLD } from "../../utils/formatting";
import { getArea } from "../../utils/functions";

let inKuudra = false
let rendArrows = 0;

register('worldLoad', () => {
    rendArrows = 0;

    setTimeout(() => {
        if (getArea().includes("Kuudra's Hollow")) inKuudra = true;
    }, 2000); 
});

register("soundPlay", () => {
    if (settings.rendArrows) {
        let hasRend = Player.getHeldItem()?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes").getCompoundTag("enchantments").getTag("ultimate_rend");
        if (hasRend) rendArrows += 1;

        if (rendArrows == 5) {
            World.playSound('note.pling', 1, 2);
            Client.showTitle('', `${RED + BOLD}REND ARROWS IN!`, 0, 20, 5);
        };
    };
}).setCriteria("tile.piston.in")

register("soundPlay", () => {
    if (inKuudra) rendArrows = 0;
}).setCriteria("mob.zombie.woodbreak")