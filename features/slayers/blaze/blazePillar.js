import settings from "../../../settings";
import { RED, AQUA, GRAY, WHITE, GOLD, BOLD } from "../../../utils/formatting";
import { EntityArmorStand } from "../../../utils/entities";
import { pogData } from "../../../utils/pogData";
import { removeEmojis } from "../../../utils/functions";
import RenderLib from "../../../../RenderLib";


// Fire pillar stuff this is such a mess holy fuck
let plingCounter = 0;
let pillar = undefined;
let showPillar = false;
let pillarX = undefined;
let pillarY = undefined;
let pillarZ = undefined;

register('tick', () => {
    if (settings.blazePillar) {
        pillar = World.getAllEntitiesOfType(EntityArmorStand).find(stand => stand.getName().removeFormatting().includes('hit') && Player.asPlayerMP().distanceTo(stand.getX(), stand.getY(), stand.getZ()) < 20 && removeEmojis(Scoreboard.getLines().join('')).includes('Slay the boss!'))
        if (pillar) {
            plingCounter += 1;
            if (plingCounter >= pillar.getName().removeFormatting().match(/[1-8]/g)[0]) {
                World.playSound('note.pling', 1, 2);
                plingCounter = 0;
            }
        } else {
            pillar = undefined;
            pillarX = undefined;
            pillarY = undefined;
            pillarZ = undefined;
        }
    }
})

register('renderWorld', () => {

    if (settings.blazePillar) {
        if (pillar) {
            if (!pillarX) {
                pillarX = Math.floor(pillar.getX());
                pillarY = Math.floor(pillar.getY());
                pillarZ = Math.floor(pillar.getZ());
            }

            if (World.getBlockAt(pillarX, pillarY - 1, pillarZ).type.name != 'Stained Clay') RenderLib.drawEspBox(pillarX + 0.5, pillarY - 2, pillarZ + 0.5, 1, 1, 1, 0, 0, 1, true);
            else if (World.getBlockAt(pillarX, pillarY, pillarZ).type.name != 'Stained Clay') RenderLib.drawEspBox(pillarX + 0.5, pillarY - 2, pillarZ + 0.5, 1, 2, 1, 0, 0, 1, true);
            else if (World.getBlockAt(pillarX, pillarY + 1, pillarZ).type.name != 'Stained Clay') RenderLib.drawEspBox(pillarX + 0.5, pillarY - 2, pillarZ + 0.5, 1, 3, 1, 0, 0, 1, true);
            else RenderLib.drawEspBox(pillarX + 0.5, pillarY - 2, pillarZ + 0.5, 1, 4, 1, 0, 0, 1, true);
        }
    }
})

register('renderOverlay', () => {
    if (settings.blazePillar) {
        if (pillar && !showPillar) {
            const match = pillar.getName().removeFormatting().match(/[1-8]/g);
            const pillarSeconds = match[0];
            const pillarHits = match[1];
            Renderer.scale(pogData.blazePillarScale);
            Renderer.drawString(`${GOLD + BOLD + pillarSeconds}s ${RED + BOLD + pillarHits} hits`, pogData.blazePillarX / pogData.blazePillarScale, pogData.blazePillarY / pogData.blazePillarScale, true);
        }
        
        if (showPillar) {
            Renderer.scale(pogData.blazePillarScale);
            Renderer.drawString(`${GOLD + BOLD}7s ${RED + BOLD}8 hits`, pogData.blazePillarX / pogData.blazePillarScale, pogData.blazePillarY / pogData.blazePillarScale, true);
        }
    }
})

register('command', (...args) => {
    if (args) {
      if (args[0].toLowerCase() == 'x') {
        if (!isNaN(parseFloat(args[1]))) pogData.blazePillarX = parseFloat(args[1]);
        else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use a number.`);
      }
      else if (args[0].toLowerCase() == 'y') {
        if (!isNaN(parseFloat(args[1]))) pogData.blazePillarY = parseFloat(args[1]);
        else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use a number.`);
      }
      else if (args[0].toLowerCase() == 'scale') {
        if (!isNaN(parseFloat(args[1]))) pogData.blazePillarScale = parseFloat(args[1]);
        else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use a number.`);
      }
      else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use "x", "y", or "scale".`);
    }
    pogData.save();

    showPillar = true;
    setTimeout(() => showPillar = false, 2000);
}).setName('movepillar')