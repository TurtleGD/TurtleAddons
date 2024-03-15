import settings from "../../settings";
import { RED, BOLD} from "../../exports";
import { getArea, inTrueLair, EntityArmorStand, isDead} from "../../exports";

let inInfernal = false;
let dead = false

register('worldLoad', () => {
    inInfernal = false;
    dead = false

    setTimeout(() => {
        if (getArea() == "Kuudra's Hollow (T5)") inInfernal = true;
        if (getArea().includes("Kuudra's Hollow")) inKuudra = true;
    }, 2000); 
});

register('tick', () => {
    if (settings.chunkAlert && inInfernal) {
        World.getAllEntitiesOfType(EntityArmorStand).forEach(stand => {
            if (!dead && inTrueLair() && stand.getName().removeFormatting().toLowerCase().includes('energized chunk') && Player.asPlayerMP().distanceTo(stand.getX(), stand.getY(), stand.getZ()) < settings.chunkRadius) {
                World.playSound('note.pling', 0.1, 2);
                Client.showTitle(`${RED + BOLD}CHUNK!`, '', 0, 2, 0);
            };
        });
    };
});

register('step', () => {
    dead = isDead();
}).setDelay(1)