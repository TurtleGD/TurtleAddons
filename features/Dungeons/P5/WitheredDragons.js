import settings from "../../../settings";
import { AQUA, DARK_GRAY, GOLD, GRAY, GREEN, LIGHT_PURPLE, RED, RESET, STRIKETHROUGH } from "../../../utils/formatting";
import { S32PacketConfirmTranscation, S0FPacketSpawnMob } from "../../../utils/packets";
import { pogData } from "../../../utils/pogData";

register("command", () => {
    ChatLib.chat(ChatLib.getChatBreak(`${STRIKETHROUGH}-`));
    ChatLib.chat(ChatLib.getCenteredText(`${GRAY}[${AQUA}TurtleAddons ${AQUA}M7 Dragon PBs${GRAY}]`));
    ChatLib.chat("")
    ChatLib.chat(ChatLib.getCenteredText(`${RED}Red${RESET}: ${pogData.m7DragonPBs[0].toFixed(2)}s`));
    ChatLib.chat(ChatLib.getCenteredText(`${GOLD}Orange${RESET}: ${pogData.m7DragonPBs[1].toFixed(2)}s`));
    ChatLib.chat(ChatLib.getCenteredText(`${AQUA}Blue${RESET}: ${pogData.m7DragonPBs[2].toFixed(2)}s`));
    ChatLib.chat(ChatLib.getCenteredText(`${LIGHT_PURPLE}Purple${RESET}: ${pogData.m7DragonPBs[3].toFixed(2)}s`));
    ChatLib.chat(ChatLib.getCenteredText(`${GREEN}Green${RESET}: ${pogData.m7DragonPBs[4].toFixed(2)}s`));
    ChatLib.chat(ChatLib.getChatBreak(`${STRIKETHROUGH}-`));
}).setName("dragpb").setAliases("dragpbs", "dragonpb", "dragonpbs")

register("command", () => {
    ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${RESET}Cleared PBs.`);
    pogData.m7DragonPBs[0] = 69420;
    pogData.m7DragonPBs[1] = 69420;
    pogData.m7DragonPBs[2] = 69420;
    pogData.m7DragonPBs[3] = 69420;
    pogData.m7DragonPBs[4] = 69420;
    pogData.save()
}).setName("cleardragpb").setAliases("cleardragpbs")

let inP5 = false;
let killed = [];
let dragons = [];
let ticks = 0;

const spawnPoints = [
    { name: "Red", coordinates: [27, 20, 59], format: RED },
    { name: "Orange", coordinates: [86, 20, 56], format: GOLD },
    { name: "Blue", coordinates: [84, 20, 94], format: AQUA },
    { name: "Purple", coordinates: [56, 19, 126], format: LIGHT_PURPLE },
    { name: "Green", coordinates: [26, 20, 94], format: GREEN }
]

register("worldLoad", () => {
    inP5 = false;
    killed.length = 0;
    dragons.length = 0;
    ticks = 0;
})

register("packetReceived", () => {
    if (inP5) ticks++;
}).setFilteredClass(S32PacketConfirmTranscation)
  
register("packetReceived", (packet) => {
    if (inP5 && packet.func_149025_e() == 63) {
        Client.scheduleTask(1, () => {
            let dragon = new Entity(World.getWorld().func_73045_a(packet.func_149024_d()))
            let nearestDistance = Infinity;
            let name = "";
            let format = "";

            spawnPoints.forEach(spawn => {
                let distance = dragon.distanceTo(spawn.coordinates[0], spawn.coordinates[1], spawn.coordinates[2]);
                if (distance < nearestDistance) {
                    nearestDistance = distance;
                    name = spawn.name;
                    format = spawn.format;
                }
            })

            dragons.push([packet.func_149024_d(), ticks, name, format]);
            Client.scheduleTask(4, () => {
                if (dragons.length == 3) {
                    dragons[1][2] = dragons[0][2];
                }
            })
        })
    }

}).setFilteredClass(S0FPacketSpawnMob)

register("entityDeath", (entity) => {
    if (inP5) {
        let id = entity.entity.func_145782_y();
        let dragon = dragons.find(dragon => dragon[0] == id);
        if (dragon) {
            killed.push(dragon[3] + dragon[2]);
            if (!settings.dragDeathTimer) return;

            let killTime = (ticks - dragon[1] + 1) / 20;
            let pb = pogData.m7DragonPBs[spawnPoints.findIndex(spawn => spawn.name == dragon[2])];
            let pbMessage = `${DARK_GRAY}(PB: ${pb.toFixed(2)}s)`;
            
            if (killTime < pb) {
                pogData.m7DragonPBs[spawnPoints.findIndex(spawn => spawn.name == dragon[2])] = killTime;
                pbMessage = `(${AQUA}New PB${RESET})`;
                pogData.save();
            }
            ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${killed[killed.length - 1] + RESET} took ${killTime.toFixed(2)}s to kill. ${pbMessage}`);
        }
    }
})

register("chat", (message) => {
    switch (message) {
        case "[BOSS] Wither King: Your skills have faded humans.":
        case "[BOSS] Wither King: I am not impressed.":
        case "[BOSS] Wither King: Futile.":
        case "[BOSS] Wither King: You just made a terrible mistake!":
            if (settings.dragSkipTitle) Client.scheduleTask(1, () => {Client.showTitle(" ", `${killed[killed.length - 1]?.toUpperCase() + RESET} FAILED`, 0, 20, 20)});
            break;
        case "[BOSS] Wither King: Oh, this one hurts!":
        case "[BOSS] Wither King: My soul is disposable.":
        case "[BOSS] Wither King: I have more of those.":
            if (settings.dragSkipTitle) Client.scheduleTask(1, () => {Client.showTitle(" ", `${killed[killed.length - 1]?.toUpperCase() + RESET} COUNTED`, 0, 20, 20)});
            break;
        case "[BOSS] Wither King: You... again?":
            inP5 = true;
            break;
    }
}).setCriteria("${message}")