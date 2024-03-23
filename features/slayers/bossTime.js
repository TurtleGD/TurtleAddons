import settings from "../../settings";
import { AQUA, GRAY, WHITE } from "../../utils/formatting";
import { EntityArmorStand } from "../../utils/entities";

register("chat", (message, event) => {
    // Reset kill timer on fail/restart
    if (settings.slayerKillTime) {
        if ((message.includes('SLAYER QUEST FAILED!') && !message.includes(':')) || message.includes('Your Slayer Quest has been cancelled!')) setTimeout(() => spawnTime = undefined, 500)
    };
}).setCriteria("${message}");

// Boss kill time
let spawnTime = undefined;
let killTime = undefined;
let bossX = undefined;
let bossY = undefined;
let bossZ = undefined;

register('worldLoad', () => {
    spawnTime = undefined;
});

register('tick', () => {
    if (settings.slayerKillTime) {
        World.getAllEntitiesOfType(EntityArmorStand).forEach(stand => {
            let name = stand.getName().removeFormatting();
    
            // Checks spawned by name tag
            if (name.includes(`Spawned by: ${Player.getName()}`) && spawnTime == undefined) {
                spawnTime = new Date().getTime();
                killTime = undefined;
            };
    
            // Gets spawned by name tag location for boss check later
            if (name.includes(`Spawned by: ${Player.getName()}`)) {
                bossX = stand.getX();
                bossY = stand.getY();
                bossZ = stand.getZ();
            };
    
            // Checks hp name tag to spawned by name tag to check whos boss
            if (name.includes(' 0❤') && (name.includes('Horror') || name.includes('Packmaster') || name.includes('Broodfather') || name.includes('Seraph') || name.includes('Demonlord') || name.includes('Bloodfiend')) && killTime == undefined && Math.hypot(stand.getX() - bossX, stand.getY() - bossY, stand.getZ() - bossZ) < 1) {
                killTime = new Date().getTime();
                ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Slayer took ${((killTime - spawnTime) / 1000).toFixed(3)}s to kill!`);
                setTimeout(() => {
                    spawnTime = undefined;
                    pillarX = undefined;
                    pillarY = undefined;
                    pillarZ = undefined;
                    pillarSoundThing = 0;
                }, 3000);
                
            };
        });
    };
});