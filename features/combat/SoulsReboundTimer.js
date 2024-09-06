import settings from "../../settings";
import { pogData } from "../../utils/pogData";
import { AQUA, WHITE } from "../../utils/formatting";

let startTime = undefined;

register('soundPlay', (pos, name, vol, pitch) => {
    if (settings.srbTimer) {
        if (pitch == 1 && !startTime && Player.getHeldItem()?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getString('id') == 'SOULS_REBOUND' && !Client.isInGui()) {
            startTime = new Date().getTime();
        }
    }
}).setCriteria('random.successful_hit')

register('renderOverlay', () => {
    if (startTime) {
        if ((5 - ((new Date().getTime() - startTime) / 1000) > 0)) {
            Renderer.scale(pogData.srbTimerScale);
            Renderer.drawString(`${AQUA}Souls Rebound: ${WHITE + (5 - ((new Date().getTime() - startTime) / 1000)).toFixed(3)}s`, pogData.srbTimerX / pogData.srbTimerScale, pogData.srbTimerY / pogData.srbTimerScale, true);
        }
        if (5 - ((new Date().getTime() - startTime) / 1000) <= 0) startTime = undefined;
    }
})
