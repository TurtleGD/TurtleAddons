import settings from "../../settings";
import { WHITE, GRAY, AQUA } from "../../utils/formatting";
import { inTrueLair } from "../../utils/functions";
import { pogData } from "../../utils/pogData";

let startTime;
let endTime;
let timeToKill;
let counting = false;

register("worldLoad", () => {
    counting = false;
    startTime = undefined;
    endTime = undefined;
    timeToKill = undefined;
})

register("chat", (message) => {
    if (settings.partyDps) { 
        if (message.includes("KUUDRA DOWN!") && !message.includes(":") && pogData.skyblockArea.includes("(T5)")) {
            endTime = new Date().getTime();
            timeToKill = (endTime - startTime) / 1000;
            Client.scheduleTask(1, () => {
                if (settings.sendPartyDps) ChatLib.command(`pc Party DPS: ${(240/timeToKill).toFixed(2)}m`);
                else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Party DPS: ${(240/timeToKill).toFixed(2)}m`);
            })
        }
    }
}).setCriteria("${message}")

register("tick", () => {
    if (settings.partyDps) {
        if (pogData.skyblockArea.includes("(T5)") && inTrueLair() && !counting) {
            startTime = new Date().getTime();
            counting = true;
        }
    }
})