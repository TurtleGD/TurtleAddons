import settings from "../../settings";
import { AQUA, DARK_GRAY, GOLD, GRAY, GREEN, LIGHT_PURPLE, RED, RESET } from "../../utils/formatting";
import { EntityEnderDragon } from "../../utils/entities";
import { pogData } from "../../utils/pogData";

let inP5 = true;
let killed = [];
let numKilled = 0;
let uuids = new Set();

const spawnPoints = [
    { name: 'Red', coordinates: [27, 20, 59], format: RED },
    { name: 'Orange', coordinates: [86, 20, 56], format: GOLD },
    { name: 'Blue', coordinates: [84, 20, 94], format: AQUA },
    { name: 'Purple', coordinates: [56, 19, 126], format: LIGHT_PURPLE },
    { name: 'Green', coordinates: [26, 20, 94], format: GREEN }
]

register('worldLoad', () => {
    killed.length = 0;
    numKilled = 0;

    if (settings.dragSkipTitle) Client.showTitle(' ', ' ', 0, 0, 1); // Might fix first title not appearing
})

register("chat", (message) => {
    
}).setCriteria("${message}");

register('tick', () => {
    if (settings.dragDeathTimer && inP5) {
        World.getAllEntitiesOfType(EntityEnderDragon).forEach(dragon => {
            let nearestDistance = Infinity;
            let spawnType = undefined;
            let containsUUID = false;
    
            spawnPoints.forEach(spawn => {
                const distance = dragon.distanceTo(spawn.coordinates[0], spawn.coordinates[1], spawn.coordinates[2]);
                if (distance < nearestDistance) {
                    nearestDistance = distance;
                    spawnType = spawn;
                }
            })
    
            const entityInfo = dragon.getUUID().toString() + ' ' + spawnType.name +  ' ' + new Date().getTime();
            uuids.forEach(uuid => {
                if (uuid.toString().includes(dragon.getUUID().toString())) {
                    containsUUID = true;
                    return;
                }
            })
    
            if (!containsUUID) uuids.add(entityInfo);
        })
    }
})

register('entityDeath', (entity) => {
    if (settings.dragDeathTimer && inP5) {
        uuids.forEach(uuid => {
            if (uuid.toString().includes(entity.getUUID().toString())) {
                uuids.delete(uuid);
                const list = uuid.split(" ");
                const killTime = Math.round(((new Date().getTime() - list[2]) / 1000) * 20) / 20;
                let pbMessage = '';

                const colorInfo = spawnPoints.find(spawn => spawn.name == list[1]);
                
                if (colorInfo) {
                    killed.push(colorInfo.format + colorInfo.name);
                    pbMessage = `${DARK_GRAY}(PB: ${pogData.m7DragonPBs[spawnPoints.indexOf(colorInfo)]}s)`;
                    
                    if (killTime < pogData.m7DragonPBs[spawnPoints.indexOf(colorInfo)]) {
                        pogData.m7DragonPBs[spawnPoints.indexOf(colorInfo)] = killTime;
                        pbMessage = `(${AQUA}New PB${RESET})`;
                        pogData.save();
                    }
                    
                    numKilled += 1;
                    ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${killed[numKilled - 1] + RESET} took ${killTime.toFixed(2)}s to kill. ${pbMessage}`);
                }
            }
        })
    }
})

register("chat", (message) => {
    if (settings.dragSkipTitle) {
        if (message == '[BOSS] Wither King: You... again?') inP5 = true;
        
        switch (message) {
            case "[BOSS] Wither King: Your skills have faded humans.":
            case "[BOSS] Wither King: I am not impressed.":
            case "[BOSS] Wither King: Futile.":
            case "[BOSS] Wither King: You just made a terrible mistake!":
                Client.showTitle(' ', `${killed[numKilled - 1]?.toUpperCase() + RESET} FAILED`, 0, 20, 20);
                break;
            case "[BOSS] Wither King: Oh, this one hurts!":
            case "[BOSS] Wither King: My soul is disposable.":
            case "[BOSS] Wither King: I have more of those.":
                Client.showTitle(' ', `${killed[numKilled - 1]?.toUpperCase() + RESET} COUNTED`, 0, 20, 20);
                break;
        }
    }
}).setCriteria("${message}")