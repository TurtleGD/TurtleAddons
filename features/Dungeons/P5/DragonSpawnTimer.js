import settings from "../../../settings";
import { GREEN, YELLOW, RED } from "../../../utils/formatting";
import { S2APacketParticles, S32PacketConfirmTranscation } from "../../../utils/packets";
import { drawStringV2 } from "../../../utils/functions";

let inP5 = false;
let ticks = 0;

let spawnPoints = [
    { name: "Red", coordinates: [27, 18, 59], spawning: false },
    { name: "Orange", coordinates: [84, 18, 56], spawning: false },
    { name: "Blue", coordinates: [83, 20, 94], spawning: false },
    { name: "Purple", coordinates: [56, 18, 124], spawning: false },
    { name: "Green", coordinates: [28, 18, 94], spawning: false } 
]

register("worldLoad", () => {
    inP5 = false;
    ticks = 0;
})

register("packetReceived", () => {
    if (inP5) ticks--;
    if (ticks == 0) spawnPoints.forEach(spawn => spawn.spawning = false);
}).setFilteredClass(S32PacketConfirmTranscation)
  
register("packetReceived", (packet) => {
    if (settings.dragSpawnTimer && inP5 && packet.func_179749_a().toString() == "ENCHANTMENT_TABLE") {
        
        let x = packet.func_149220_d();
        let y = packet.func_149226_e();
        let z = packet.func_149225_f();

        if (y < 14 || y > 19) return;
        
        let closestSpawn = null;
        let minDistance = Infinity;

        spawnPoints.forEach(spawn => {
            let [sx, sy, sz] = spawn.coordinates;
            let distance = Math.sqrt(
                Math.pow(sx - x, 2) +
                Math.pow(sy - y, 2) +
                Math.pow(sz - z, 2)
            )

            if (distance < minDistance) {
                minDistance = distance;
                closestSpawn = spawn;
            }
        })

        if (!closestSpawn.spawning) {
            closestSpawn.spawning = true;
            ticks = 100;
        }
    }
}).setFilteredClass(S2APacketParticles)

register("renderWorld", () => {
    if (inP5) {
        spawnPoints.forEach(spawn => {
            if (spawn.spawning) drawStringV2(`${ticks > 60 ? GREEN : ticks > 20 ? YELLOW : RED}${(ticks / 20).toFixed(3)}`, spawn.coordinates[0], spawn.coordinates[1], spawn.coordinates[2], 0, false, 0.25, false, true, false);
        })
    }
})

register("chat", () => {
    inP5 = true;
}).setCriteria("[BOSS] Wither King: You... again?")