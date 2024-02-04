import settings from "../settings";
import { getArea, createWaypoint, nearCoords, inTrueLair, RED, BOLD } from "../exports";

var startTime;
var endTime;
var timeToKill;
var counting = false;
var inInfernal = false;
var rendArrows = 0;

register('worldLoad', () => {
    counting = false;
    startTime = undefined;
    endTime = undefined;
    timeToKill = undefined;
    inInfernal = false;
    rendArrows = 0;
});

register('renderWorld', () => {
    if (!getArea().contains('Kuudra')) return;

    // Etherwarp Block
    if (settings.etherwarpBlock && nearCoords(-154, 29, -172, 40)) createWaypoint(-154, 29, -172, 0, 0, 255, 0.25, 1, true);

    // Stun Block
    if (settings.stunBlock && nearCoords(-153, 31, -172, 40)) createWaypoint(-153, 31, -172, 0, 0, 255, 0.25, 1, true);
});

// Party DPS
register("chat", (message) => {
    if (!settings.partyDps) return;
    
    if (message.includes("KUUDRA DOWN!") && !message.includes(':') && inInfernal && Player.getY() < 30) {
        endTime = new Date().getTime();
        timeToKill = (endTime - startTime) / 1000;
        ChatLib.command(`pc Party DPS: ${(300/timeToKill).toFixed(2)}m`);
    };
}).setCriteria("${message}");

register('tick', () => {
    if (!settings.partyDps) return;

    if (inInfernal && inTrueLair() && !counting) {
        startTime = new Date().getTime();
        counting = true;
    };
});


// Energized Chunk Alert
register("step", () => {
    if (inInfernal || !settings.chunkAlert) return;

    if (getArea() == "Kuudra's Hollow (T5)") inInfernal = true
}).setDelay(1);

register("tick", () => {
    if (!settings.chunkAlert) return;

    World.getAllEntitiesOfType(Java.type('net.minecraft.entity.item.EntityArmorStand').class).forEach(stand => {
        if (inInfernal && inTrueLair() && stand.getName().removeFormatting().toLowerCase().includes('energized chunk') && nearCoords(stand.getX(), stand.getY(), stand.getZ(), settings.chunkRadius)) {
            World.playSound('note.pling', 0.1, 2);
            Client.showTitle(`${RED + BOLD}CHUNK!`, '', 0, 2, 0);
        };
    });
});


// Rend arrows
register("soundPlay", () => {
    if (!settings.rendArrows) return;

    let hasRend = Player.getHeldItem()?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes").getCompoundTag("enchantments").getTag("ultimate_rend");
    if (hasRend) rendArrows += 1;

    if (rendArrows == 5) {
        World.playSound('note.pling', 1, 2);
        Client.showTitle('', `${RED + BOLD}REND ARROWS IN!`, 0, 20, 5);
    }
}).setCriteria("tile.piston.in")

register("soundPlay", () => {
    rendArrows = 0;
}).setCriteria("mob.zombie.woodbreak")
