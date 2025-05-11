import settings from "../../settings";
import { AQUA, GRAY, WHITE } from "../../utils/formatting";
import { S32PacketConfirmTranscation } from "../../utils/packets";

let ticks = 0;
let time = 0;
let counting = false;

register("worldLoad", () => {
    ticks = 0;
    time = 0;
    counting = false;
})

register("packetReceived", () => {
    if (settings.serverLagTimes && counting) ticks++;
}).setFilteredClass(S32PacketConfirmTranscation)

register("chat", () => {
    if (counting) {
        setTimeout(() => { // why does this straight up not run at all with Client.scheduleTask() ???????????????????????????????????????????
            let realTimeTicks = Math.floor((new Date().getTime() - time) / 50) - 1;
            ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Server lagged for ${AQUA + (((realTimeTicks - ticks) / 20).toFixed(2))}s ${GRAY}(${realTimeTicks - ticks} ticks).`);
        }, 50);
        counting = false;
    }
}).setCriteria(/^\s*☠ Defeated (.+) in 0?([\dhms ]+?)\s*(\(NEW RECORD!\))?$|^(?!.*:).*KUUDRA DOWN.*/) // from Bloom

register("chat", () => {
    if (settings.serverLagTimes) {
        counting = true;
        time = new Date().getTime();
    }
}).setCriteria(/\[NPC\] Elle: Okay adventurers, I will go and fish up Kuudra!|\[NPC\] Mort: Here, I found this map when I first entered the dungeon./)
