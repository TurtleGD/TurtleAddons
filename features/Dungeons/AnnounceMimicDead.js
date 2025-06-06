import settings from "../../settings";
import { pogData } from "../../utils/pogData";

let inBoss = false;
let sent = false;

register("worldLoad", () => {
    inBoss = false;
    sent = false;
})

register("entityDeath", (e) => {
    if (settings.announceMimicDead && pogData.skyblockArea.includes("Catacombs")) {
        if (e.getClassName() == "EntityZombie" && e.entity.func_70631_g_() && !inBoss && !sent) {
            ChatLib.command("pc Mimic Dead!");
            sent = true;
        }
    }
})

let arrs = [/^\[BOSS\] Sadan: So you made it all the way here\.\.\. Now you wish to defy me\? Sadan\?!$/, /^\[BOSS\] Maxor: WELL! WELL! WELL! LOOK WHO'S HERE!$/];

arrs.forEach(msg => {
    register("chat", () => {
        inBoss = true;
    }).setCriteria(msg)
})