import settings from "../../../settings";
import { pogData } from "../../../utils/pogData";

let lastSend = 0;

register("worldLoad", () => {
    lastSend = 0;
})

register("tick", () => {
    if (settings.announceEarlyP3) {
        if (pogData.goldorPhase > 0 && pogData.inGoldorPhase != lastSend && pogData.inGoldorPhase > pogData.goldorPhase) {
            ChatLib.command(`pc Entered 3.${pogData.inGoldorPhase} early!`);
            lastSend = pogData.inGoldorPhase;
        }
    }
})