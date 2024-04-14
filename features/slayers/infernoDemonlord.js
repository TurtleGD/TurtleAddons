import settings from "../../settings";
import { RED, AQUA, GRAY, WHITE, GREEN, GOLD, BOLD } from "../../utils/formatting";
import { pling } from "../../utils/sounds";
import { EntityArmorStand } from "../../utils/entities";
import { pogData } from "../../utils/pogData";
import { getArea, removeEmojis } from "../../utils/functions";
import RenderLib from "../../../RenderLib";

register("chat", (message, event) => {
    // Hide attunements
    if (settings.hideAttunements) {
        if (message.startsWith("Strike using the") || message == 'Your hit was reduced by Hellion Shield!') cancel(event)
    }

    // Hide demon damage
    if (settings.hideDemonMessages) {
        if ((message.includes("true damage from Quazii's beam") || message.includes("true damage from Typhoeus's fire")) && !message.includes(':')) cancel(event)
    }

    // Gummy refresh
    if (settings.gummyWarning) {
        if (message == 'You ate a Re-heated Gummy Polar Bear!') pogData.gummyTimeLeft = 3600;
        pogData.save();
    }
}).setCriteria("${message}")


// Smoldering polarization warning
register('step', () => {
    if (settings.gummyWarning && Scoreboard.getTitle().includes('SKYBLOCK') && !getArea().includes('Catacombs')) {
        if (pogData.gummyTimeLeft > 0) pogData.gummyTimeLeft -= 1;
    
        if (pogData.gummyTimeLeft == settings.gummyTimer * 60) {
            Client.showTitle(`${RED}GUMMY LOW!`, '', 0, 60, 20);
            pling.play();
            ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE + settings.gummyTimer}m of ${GREEN}Smoldering Polarization I ${WHITE}left.`);
        }
        pogData.save();
    }
}).setDelay(1)

let showGummy = false;

register("renderOverlay", () => {
    if (!showGummy && settings.gummyWarning) {
        if (pogData.gummyTimeLeft > 0) {
            Renderer.scale(pogData.gummyScale);
            Renderer.drawString(`${GREEN}Smoldering Polarization I: ${WHITE + Math.floor(pogData.gummyTimeLeft / 60)}m ${pogData.gummyTimeLeft % 60}s`, pogData.gummyX / pogData.gummyScale, pogData.gummyY / pogData.gummyScale, true);
        }
        else {
            Renderer.scale(pogData.gummyScale);
            Renderer.drawString(`${GREEN}Smoldering Polarization I: ${RED}Expired!`, pogData.gummyX / pogData.gummyScale, pogData.gummyY / pogData.gummyScale, true);
        }
    } else if (showGummy) {
        Renderer.scale(pogData.gummyScale);
        Renderer.drawString(`${GREEN}Smoldering Polarization ${WHITE}60m 0s`, pogData.gummyX / pogData.gummyScale, pogData.gummyY / pogData.gummyScale, true);
    }
})

register('command', (...args) => {
    if (args) {
      if (args[0].toLowerCase() == 'x') {
        if (!isNaN(parseInt(args[1]))) pogData.gummyX = parseInt(args[1]);
        else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use a number.`);
      }
      else if (args[0].toLowerCase() == 'y') {
        if (!isNaN(parseInt(args[1]))) pogData.gummyY = parseInt(args[1]);
        else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use a number.`);
      }
      else if (args[0].toLowerCase() == 'scale') {
        if (!isNaN(parseInt(args[1]))) pogData.gummyScale = parseInt(args[1]);
        else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use a number.`);
      }
      else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use "x", "y", or "scale".`);
    }
    pogData.save();

    showGummy = true;
    setTimeout(() => showGummy = false, 2000);
}).setName('movegummy')


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
            Renderer.scale(pogData.pillarScale);
            Renderer.drawString(`${GOLD + BOLD + pillarSeconds}s ${RED + BOLD + pillarHits} hits`, pogData.pillarX / pogData.pillarScale, pogData.pillarY / pogData.pillarScale, true);
        }
        
        if (showPillar) {
            Renderer.scale(pogData.pillarScale);
            Renderer.drawString(`${GOLD + BOLD}7s ${RED + BOLD}8 hits`, pogData.pillarX / pogData.pillarScale, pogData.pillarY / pogData.pillarScale, true);
        }
    }
})

register('command', (...args) => {
    if (args) {
      if (args[0].toLowerCase() == 'x') {
        if (!isNaN(parseInt(args[1]))) pogData.pillarX = parseInt(args[1]);
        else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use a number.`);
      }
      else if (args[0].toLowerCase() == 'y') {
        if (!isNaN(parseInt(args[1]))) pogData.pillarY = parseInt(args[1]);
        else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use a number.`);
      }
      else if (args[0].toLowerCase() == 'scale') {
        if (!isNaN(parseInt(args[1]))) pogData.pillarScale = parseInt(args[1]);
        else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use a number.`);
      }
      else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use "x", "y", or "scale".`);
    }
    pogData.save();

    showPillar = true;
    setTimeout(() => showPillar = false, 2000);
}).setName('movepillar')

// Hides fireballs
register("renderEntity", (entity, pos, partialTick, event) => {
    if (settings.hideFireballs && entity.getName().includes('Fireball') && removeEmojis(Scoreboard.getLines().join('')).includes('Slay the boss!')) cancel(event);
})
