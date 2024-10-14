import settings from "../../settings";
import { AQUA, BOLD, RESET } from "../../utils/formatting";
import { pogData } from "../../utils/pogData";
import { S32PacketConfirmTranscation } from "../../utils/packets";

let ticks = 0;

register("worldLoad", () => {
	ticks = 0;
});

register("chat", () => {
	if (settings.p5RagTimer) ticks = 100;
}).setCriteria("[BOSS] Wither King: You... again?");

register("packetReceived", () => {
	if (ticks) ticks -= 1;
}).setFilteredClass(S32PacketConfirmTranscation);

register("renderOverlay", () => {
	if (ticks > 0) {
        Renderer.scale(pogData.p5RagTimerScale);
        Renderer.drawString(`${AQUA + BOLD}Use Rag in: ${RESET + (ticks * 0.05).toFixed(2)}s`, pogData.p5RagTimerX / pogData.p5RagTimerScale, pogData.p5RagTimerY / pogData.p5RagTimerScale, true);
    }
});