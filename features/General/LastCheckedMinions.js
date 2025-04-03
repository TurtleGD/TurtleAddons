import settings from "../../settings";
import { getTime, drawStringV2 } from "../../utils/functions";
import { pogData } from "../../utils/pogData";
import { C02PacketUseEntity, S2DPacketOpenWindow } from "../../utils/packets";

// Returns true if first 3 items of arrays match
function compareFirstThree(arr1, arr2) {
    return arr1.slice(0, 3).every((value, index) => value == arr2[index]);
}

let lastInteract = [];
let lastMinionName = "";

register("packetReceived", (packet) => {
    if (settings.lastCheckedMinion && pogData.skyblockArea.includes("Your Island")) {
        let containerTitle = packet.func_179840_c().func_150260_c(); // packet.getWindowTitle().getUnformattedText()
        if (containerTitle.includes("Minion") && !containerTitle.includes("Recipe") && !containerTitle.includes("Crafted") && !containerTitle.includes("➜")) {
            lastMinionName = containerTitle;

            // Add new minion if new location
            if (!pogData.minionData.some(loc => compareFirstThree(loc, [lastInteract[0], lastInteract[1], lastInteract[2]]))) pogData.minionData.push([lastInteract[0], lastInteract[1], lastInteract[2], new Date().getTime(), lastMinionName]);
            
            // Update timestamp
            pogData.minionData.forEach(minion => {
                if (minion[0] == lastInteract[0] && minion[1] == lastInteract[1] && minion[2] == lastInteract[2]) minion[3] = new Date().getTime();
            })
            pogData.save();
        }
    }
}).setFilteredClass(S2DPacketOpenWindow);

// Gets the position of the last entity you right click on
register("packetSent", (packet) => {
    if (settings.lastCheckedMinion && pogData.skyblockArea.includes("Your Island")) {
        let entity = new Entity(packet.func_149564_a(World.getWorld())); // packet.getEntityFromWorld()
        lastInteract = [entity.getX(), entity.getY(), entity.getZ()];
    }
}).setFilteredClass(C02PacketUseEntity)


register("renderWorld", () => {
    if (pogData.skyblockArea.includes("Your Island") && settings.lastCheckedMinion) {
        pogData.minionData.forEach(minion => {
            if (minion.some(val => val == null)) return;
            drawStringV2(`${minion[4]}\nLast checked: ${getTime(Math.floor((new Date().getTime() - minion[3]) / 1000))} ago`, minion[0], minion[1] + 2, minion[2], Renderer.WHITE, true, 0.025, false, false, false);
        })
    }
})
