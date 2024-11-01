import settings from "../../../settings";
import { S32PacketConfirmTranscation } from "../../../utils/packets";

let ticks = 0;

register("worldLoad", () => {
    ticks = 0;
})

register("chat", () => {
    if (settings.relicTimer) ticks = 40;
}).setCriteria("[BOSS] Necron: All this, for nothing...");

register("packetReceived", () => {
    if (ticks) ticks -= 1;
}).setFilteredClass(S32PacketConfirmTranscation);

register("renderWorld", () => {
    if (ticks > 0) {
        let time = (ticks * 0.05).toFixed(2) + "s";

        Tessellator.drawString(time, 20.5, 8, 59.5, Renderer.WHITE, true, 0.05, false); // Red
        Tessellator.drawString(time, 92.5, 8, 56.5, Renderer.WHITE, true, 0.05, false); // Orange
        Tessellator.drawString(time, 91.5, 8, 94.5, Renderer.WHITE, true, 0.05, false); // Blue
        Tessellator.drawString(time, 56.5, 10, 132.5, Renderer.WHITE, true, 0.05, false); // Purple
        Tessellator.drawString(time, 20.5, 8, 94.5, Renderer.WHITE, true, 0.05, false); // Green
    }

});