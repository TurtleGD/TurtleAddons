import settings from "../../settings";
import { AQUA, GRAY, WHITE } from "../../utils/formatting";
import { EntityArmorStand } from "../../utils/entities";

let spawnTime = undefined;
let killTime = undefined;
let lastKillTime = undefined;
let bossX = undefined;
let bossY = undefined;
let bossZ = undefined;


register("chat", (message) => {
    // Reset kill timer on fail/restart
    if (settings.slayerKillTime) {
        if ((message.includes("SLAYER QUEST FAILED!") && !message.includes(":")) || message.includes("Your Slayer Quest has been cancelled!")) Client.scheduleTask(10, () => spawnTime = undefined);
    }
}).setCriteria("${message}")

register("worldLoad", () => {
    spawnTime = undefined;
    lastKillTime = new Date().getTime();
})

register("tick", () => {
    if (settings.slayerKillTime) {
        World.getAllEntitiesOfType(EntityArmorStand).forEach(stand => {
            let name = stand.getName().removeFormatting();
    
            // Checks spawned by name tag
            if (name.includes(`Spawned by: ${Player.getName()}`) && spawnTime == undefined) {
                spawnTime = new Date().getTime();
                killTime = undefined;
            }
    
            // Gets spawned by name tag location for boss check later
            if (name.includes(`Spawned by: ${Player.getName()}`)) {
                bossX = stand.getX();
                bossY = stand.getY();
                bossZ = stand.getZ();
            }
    
            // Checks hp name tag to spawned by name tag to check whos boss
            if (name.includes(" 0❤") && (name.includes("Horror") || name.includes("Packmaster") || name.includes("Broodfather") || name.includes("Seraph") || name.includes("Demonlord") || name.includes("Bloodfiend")) && killTime == undefined && Math.hypot(stand.getX() - bossX, stand.getY() - bossY, stand.getZ() - bossZ) < 0.5) {
                killTime = new Date().getTime();
                ChatLib.chat(new TextComponent(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Slayer took ${((killTime - spawnTime) / 1000).toFixed(2)}s to kill!`).setHoverValue(`Spawn: ${((spawnTime - lastKillTime) / 1000).toFixed(2)}s\nKill: ${((killTime - spawnTime) / 1000).toFixed(2)}s\nSpawn and kill: ${(((killTime - lastKillTime) / 1000)).toFixed(2)}s`));
                lastKillTime = new Date().getTime();
                Client.scheduleTask(60, () => spawnTime = undefined);
                
            }
        })
    }
})