import settings from "../../../settings";
import { RED, YELLOW, GREEN } from "../../../utils/formatting";
import { S32PacketConfirmTranscation } from "../../../utils/packets";
import { pogData } from "../../../utils/pogData";

let messages = [
    "[BOSS] Goldor: Who dares trespass into my domain?",
    "[BOSS] Goldor: What do you think you are doing there!",
    "Your ⚚ Bonzo's Mask saved your life!",
    "Your Bonzo's Mask saved your life!",
    "Your Phoenix Pet saved you from certain death!",
    "Second Wind Activated! Your Spirit Mask saved your life!"
];
let inGoldor = false;
let ticks = 0;

register("worldLoad", () => {
    inGoldor = false
    ticks = 0;
})

register("chat", (message) => {
    if (settings.goldorTickTimer) {
        messages.forEach(m => {if (m == message) ticks = 0});

        if (message == "[BOSS] Storm: I should have known that I stood no chance.") {
            inGoldor = true;
            ticks = 100;
        }
        else if (message == "The Core entrance is opening!") inGoldor = false;
    }
}).setCriteria("${message}");

register("packetReceived", () => {
    if (settings.goldorTickTimer && inGoldor) {
        ticks -= 1;
        if (ticks <= 0) ticks = 60;
    }
}).setFilteredClass(S32PacketConfirmTranscation);

export function drawGoldorTickTimer() {
    let color = ticks < 20 ? RED : ticks < 40 ? YELLOW : GREEN;
    Renderer.scale(pogData.goldorTickTimerScale);
    Renderer.drawString(`${color}${(ticks / 20).toFixed(2)}s`, pogData.goldorTickTimerX / pogData.goldorTickTimerScale, pogData.goldorTickTimerY / pogData.goldorTickTimerScale, true);
}

register("renderOverlay", () => {
    if (settings.goldorTickTimer && inGoldor) drawGoldorTickTimer()
});