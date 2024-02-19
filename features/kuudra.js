import settings from "../settings";
import { getArea, createWaypoint, nearCoords, inTrueLair, RED, BOLD, EntityArmorStand, isDead, WHITE, GRAY, AQUA} from "../exports";

let startTime;
let endTime;
let timeToKill;
let counting = false;
let inInfernal = false;
let dead = false
let rendArrows = 0;

register('worldLoad', () => {
    counting = false;
    startTime = undefined;
    endTime = undefined;
    timeToKill = undefined;
    inInfernal = false;
    dead = false
    rendArrows = 0;

    setTimeout(function() {
        if (getArea() === "Kuudra's Hollow (T5)") inInfernal = true;
    }, 5000); 
});

register('renderWorld', () => {
    if (!settings.stunHelper) return;

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
        setTimeout(() => {
            if (!settings.partyDpsNoSend) ChatLib.command(`pc Party DPS: ${(300/timeToKill).toFixed(2)}m`);
            else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Party DPS: ${(300/timeToKill).toFixed(2)}m`);
        }, 100);
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
register("tick", () => {
    if (!settings.chunkAlert) return;

    World.getAllEntitiesOfType(EntityArmorStand).forEach(stand => {
        if (!dead && inInfernal && inTrueLair() && stand.getName().removeFormatting().toLowerCase().includes('energized chunk') && nearCoords(stand.getX(), stand.getY(), stand.getZ(), settings.chunkRadius)) {
            World.playSound('note.pling', 0.1, 2);
            Client.showTitle(`${RED + BOLD}CHUNK!`, '', 0, 2, 0);
        };
    });
});

// Checking every tick probably isn't a good idea
register('step', () => {
    if (!settings.chunkAlert) return;

    dead = isDead()
}).setDelay(1)


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
