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
    };

    // Hide demon damage
    if (settings.hideDemonMessages) {
        if ((message.includes("true damage from Quazii's beam") || message.includes("true damage from Typhoeus's fire")) && message.includes(':')) cancel(event)
    };

    // Gummy refresh
    if (settings.gummyWarning) {
        if (message == 'You ate a Re-heated Gummy Polar Bear!') pogData.gummyTimeLeft = 3599
        pogData.save();
    };
}).setCriteria("${message}");


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
    };
}).setDelay(1);

register('command', () => {
    if (pogData.gummyTimeLeft != 0) ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE + Math.floor(pogData.gummyTimeLeft / 60)}m ${pogData.gummyTimeLeft % 60}s of ${GREEN}Smoldering Polarization I ${WHITE}left.`)
    else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${GREEN}Smoldering Polarization I ${WHITE}is inactive.`)
}).setName('gummy')

// Fire pillar stuff
let plingCounter = 0
let pillarX = undefined
let pillarY = undefined
let pillarZ = undefined
let pillarSoundThing = 0

register('tick', () => {
    if (settings.blazePillar) {
        World.getAllEntitiesOfType(EntityArmorStand).forEach(stand => {
            let name = stand.getName().removeFormatting();
            if (name.includes('hit') && Player.asPlayerMP().distanceTo(stand.getX(), stand.getY(), stand.getZ()) < 20 && removeEmojis(Scoreboard.getLines().join('')).includes('Slay the boss!')) {
                let match = name.match(/[1-8]/g);
                let pillarSeconds = match[0];
                let pillarHits = match[1];
                Client.showTitle('', `${GOLD + BOLD + pillarSeconds}s ${RED + BOLD + pillarHits} hits`, 0, 2, 0);
                plingCounter += 1;
                if (plingCounter >= pillarSeconds) {
                    World.playSound('note.pling', 1, 2);
                    plingCounter = 0;
                };
            };
        });
    };
});

register('renderWorld', () => {
    if (settings.blazePillar) {
        World.getAllEntitiesOfType(EntityArmorStand).forEach(stand => {
            let name = stand.getName().removeFormatting();
            if (!name.includes('hit') || Player.asPlayerMP().distanceTo(stand.getX(), stand.getY(), stand.getZ()) > 20 || !removeEmojis(Scoreboard.getLines().join('')).includes('Slay the boss!')) return;
            if (!pillarX) {
                pillarX = Math.floor(stand.getX());
                pillarY = Math.floor(stand.getY());
                pillarZ = Math.floor(stand.getZ());
            };

            if (World.getBlockAt(pillarX, pillarY - 1, pillarZ).type.name != 'Stained Clay') RenderLib.drawEspBox(pillarX + 0.5, pillarY - 2, pillarZ + 0.5, 1, 1, 1, 0, 0, 1, true);
            else if (World.getBlockAt(pillarX, pillarY, pillarZ).type.name != 'Stained Clay') RenderLib.drawEspBox(pillarX + 0.5, pillarY - 2, pillarZ + 0.5, 1, 2, 1, 0, 0, 1, true);
            else if (World.getBlockAt(pillarX, pillarY + 1, pillarZ).type.name != 'Stained Clay') RenderLib.drawEspBox(pillarX + 0.5, pillarY - 2, pillarZ + 0.5, 1, 3, 1, 0, 0, 1, true);
            else RenderLib.drawEspBox(pillarX + 0.5, pillarY - 2, pillarZ + 0.5, 1, 4, 1, 0, 0, 1, true);
        });
    };
});

register('chat', (message) => {
    if (message.includes('true damage from an exploding fire pillar!') && !message.includes(':')) {
        pillarX = undefined;
        pillarY = undefined;
        pillarZ = undefined;
        pillarSoundThing = 0
    }
}).setCriteria("${message}");

register('soundPlay', () => {
    if (getArea().includes('Kuudra')) return;
    pillarSoundThing += 1
    if (pillarSoundThing == 8) {
        setTimeout(() => {
            pillarX = undefined;
            pillarY = undefined;
            pillarZ = undefined;
            pillarSoundThing = 0;
        }, 3000);
    };
}).setCriteria("mob.zombie.woodbreak");


// Hides fireballs
register("renderEntity", (entity, pos, partialTick, event) => {
    if (settings.hideFireballs && entity.getName().includes('Fireball') && removeEmojis(Scoreboard.getLines()).includes('Slay the boss!')) cancel(event);
})