import settings from "../settings";
import { isPlayerAt, createWaypoint, nearCoords, inTrueLair } from "../exports";
import { RED, BOLD } from "../exports";

var startTime;
var endTime;
var timeToKill;
var counting = false;

register('worldLoad', () => {
    counting = false;
    startTime = undefined;
    endTime = undefined;
    timeToKill = undefined;
});

register('renderWorld', () => {
    if (!isPlayerAt('Kuudra')) return;

    // Etherwarp Block
    if (settings.etherwarpBlock && nearCoords(-154, 29, -172, 40)) createWaypoint(-154, 29, -172, 0, 0, 255, 0.25, 1, true);

    // Stun Block
    if (settings.stunBlock && nearCoords(-153, 31, -172, 40)) createWaypoint(-153, 31, -172, 0, 0, 255, 0.25, 1, true);
});

// Party DPS
register("chat", (message) => {
    if (!settings.partyDps) return;
    
    if (message.includes("KUUDRA DOWN!") && !message.includes(':') && inTrueLair()) {
        endTime = new Date().getTime();
        timeToKill = (endTime - startTime) / 1000;
        ChatLib.command(`pc Party DPS: ${(300/timeToKill).toFixed(2)}m`);
    };
}).setCriteria("${message}");

register('tick', () => {
    if (!settings.partyDps) return;

    if (inTrueLair() && !counting) {
        startTime = new Date().getTime();
        counting = true;
    };
});


// Energized Chunk Alert
register("tick", () => {
    if (settings.chunkAlert) return;

    World.getAllEntitiesOfType(Java.type('net.minecraft.entity.item.EntityArmorStand').class).forEach(stand => {
        if (inTrueLair() && stand.getName().removeFormatting().toLowerCase().includes('energized chunk') && nearCoords(stand.getX(), stand.getY(), stand.getZ()) < 8) {
            World.playSound('note.pling', 0.1, 2);
            Client.showTitle(`${RED + BOLD}CHUNK!`, '', 0, 2, 0);
        };
    });
});
