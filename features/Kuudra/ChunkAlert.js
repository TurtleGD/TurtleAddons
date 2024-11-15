import settings from "../../settings";
import { RED, BOLD } from "../../utils/formatting";
import { EntityArmorStand } from "../../utils/entities";
import { inTrueLair, isDead } from "../../utils/functions";
import { pogData } from "../../utils/pogData";

let dead = false;

register("worldLoad", () => {
    dead = false;
})

register("tick", () => {
    if (settings.chunkAlert && pogData.skyblockArea.includes("(T5)") && inTrueLair() && !dead) {
        World.getAllEntitiesOfType(EntityArmorStand).forEach(stand => {
            if (stand.getName().removeFormatting().toLowerCase().includes("energized chunk") && Player.asPlayerMP().distanceTo(stand.getX(), stand.getY(), stand.getZ()) < 9) {
                World.playSound("note.pling", 0.1, 2);
                Client.showTitle(`${RED + BOLD}CHUNK!`, "", 0, 2, 0);
            }
        })
    }
})

register("step", () => {
    dead = isDead();
}).setDelay(1)