import settings from "../../settings";
import { AQUA, GRAY, WHITE } from "../../utils/formatting";
import { S32PacketConfirmTranscation } from "../../utils/packets";

let clientTicks = 0;
let serverTicks = 0;
let counting = false;

register("worldLoad", () => {
    clientTicks = 0;
    serverTicks = 0;
    counting = false;
})

register("packetReceived", () => {
    if (settings.serverLagTimes && counting) serverTicks++;
}).setFilteredClass(S32PacketConfirmTranscation)

register("tick", () => {
    if (settings.serverLagTimes && counting) clientTicks++;
})

register("chat", () => {
    if (counting) {
        setTimeout(() => { // why does this straight up not run at all with Client.scheduleTask() ???????????????????????????????????????????
            ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Server lagged for ${AQUA + (((clientTicks - serverTicks) / 20).toFixed(2))}s ${GRAY}(${clientTicks - serverTicks} ticks).`);
        }, 50);
        counting = false;
    }
}).setCriteria(/^\s*☠ Defeated (.+) in 0?([\dhms ]+?)\s*(\(NEW RECORD!\))?$|^(?!.*:).*KUUDRA DOWN.*/) // from Bloom

register("chat", () => {
    if (settings.serverLagTimes) {
        counting = true;
    }
}).setCriteria(/\[NPC\] Elle: Okay adventurers, I will go and fish up Kuudra!|\[NPC\] Mort: Here, I found this map when I first entered the dungeon./)