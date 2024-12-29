import settings from "../../settings";
import { pogData } from "../../utils/pogData";
import { AQUA, WHITE } from "../../utils/formatting";
import { S32PacketConfirmTranscation } from "../../utils/packets";

let ticks = 0;

register('soundPlay', (pos, name, vol, pitch) => {
    if (settings.srbTimer) {
        if (pitch == 1 && !startTime && Player?.getHeldItem()?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getString('id') == 'SOULS_REBOUND' && !Client.isInGui()) ticks = 100;
    }
}).setCriteria('random.successful_hit');

register("packetReceived", () => {
    if (ticks) ticks -= 1
}).setFilteredClass(S32PacketConfirmTranscation)

register('renderOverlay', () => {
    if (ticks) {
        Renderer.scale(pogData.srbTimerScale);
        Renderer.drawString(`${AQUA}Souls Rebound: ${WHITE + (ticks * 0.05).toFixed(2)}s`, pogData.srbTimerX / pogData.srbTimerScale, pogData.srbTimerY / pogData.srbTimerScale, true);
    }
})
