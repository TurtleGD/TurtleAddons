import settings from "../../../settings";
import { RED, GOLD, BOLD } from "../../../utils/formatting";
import { EntityArmorStand } from "../../../utils/entities";
import { pogData } from "../../../utils/pogData";
import { removeEmojis } from "../../../utils/functions";
import RenderLib from "../../../../RenderLib";


// This is such a mess holy fuck
let plingCounter = 0;
let pillar = undefined;

register("tick", () => {
    if (settings.blazePillar) {
        pillar = World.getAllEntitiesOfType(EntityArmorStand).find(stand => stand.getName().removeFormatting().includes("hit") && Player.asPlayerMP().distanceTo(stand.getX(), stand.getY(), stand.getZ()) < 20 && removeEmojis(Scoreboard.getLines().join("")).includes("Slay the boss!"))
        if (pillar) {
            plingCounter += 1;
            if (plingCounter >= pillar.getName().removeFormatting().match(/[1-8]/g)[0]) {
                World.playSound("note.pling", 1, 2);
                plingCounter = 0;
            }
        }
    }
})

register("renderWorld", () => {
    if (settings.blazePillar) {
        if (pillar) {
            let pillarX = Math.floor(pillar.getX());
            let pillarY = Math.floor(pillar.getY());
            let pillarZ = Math.floor(pillar.getZ());

            if (World.getBlockAt(pillarX, pillarY - 1, pillarZ).type.name != "Stained Clay") RenderLib.drawEspBox(pillarX + 0.5, pillarY - 2, pillarZ + 0.5, 1, 1, 1, 0, 0, 1, false);
            else if (World.getBlockAt(pillarX, pillarY, pillarZ).type.name != "Stained Clay") RenderLib.drawEspBox(pillarX + 0.5, pillarY - 2, pillarZ + 0.5, 1, 2, 1, 0, 0, 1, false);
            else if (World.getBlockAt(pillarX, pillarY + 1, pillarZ).type.name != "Stained Clay") RenderLib.drawEspBox(pillarX + 0.5, pillarY - 2, pillarZ + 0.5, 1, 3, 1, 0, 0, 1, false);
            else RenderLib.drawEspBox(pillarX + 0.5, pillarY - 2, pillarZ + 0.5, 1, 4, 1, 0, 0, 1, false);
        }
    }
})

register("renderOverlay", () => {
    if (settings.blazePillar && pillar) {
        const match = pillar.getName().removeFormatting().match(/[1-8]/g);
        const pillarSeconds = match[0];
        const pillarHits = match[1];
        Renderer.scale(pogData.blazePillarScale);
        Renderer.drawString(`${GOLD + BOLD + pillarSeconds}s ${RED + BOLD + pillarHits} hits`, pogData.blazePillarX / pogData.blazePillarScale, pogData.blazePillarY / pogData.blazePillarScale, true);
    }
})