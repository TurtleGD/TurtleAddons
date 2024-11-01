import settings from "../../settings";
import { AQUA, BOLD, RESET } from "../../utils/formatting";
import { getArea } from "../../utils/functions";
import { pogData } from "../../utils/pogData";
import { S32PacketConfirmTranscation } from "../../utils/packets";

let invincibilityTime = 0;
let inDungeons = false;

register('worldLoad', () => {
    invincibilityTime = 0;

    setTimeout(() => inDungeons = getArea()?.includes("Catacombs"), 2000);
})

register("packetReceived", () => {
    if (invincibilityTime > 0) invincibilityTime -= 1;
}).setFilteredClass(S32PacketConfirmTranscation);

register("chat", (message) => {
    if (settings.maskTimer) {
        if (message == "Your Bonzo's Mask saved your life!" || message == "Your ⚚ Bonzo's Mask saved your life!") {
            if (settings.announceUsage) ChatLib.command("pc Bonzo's Mask Used!");
            invincibilityTime = 60;
        } else if (message == "Second Wind Activated! Your Spirit Mask saved your life!") {
            if (settings.announceUsage) ChatLib.command("pc Spirit Mask Used!");
            invincibilityTime = 60;
        } else if (message == 'Your Phoenix Pet saved you from certain death!') {
            if (settings.announceUsage) ChatLib.command('pc Phoenix Used!');
            if (inDungeons) invincibilityTime = 60;
            else invincibilityTime = 40 + Math.round(settings.phoenixLevel * 0.4);
        }
    }
}).setCriteria("${message}");

register("renderOverlay", () => {
    if (invincibilityTime) {
        Renderer.scale(pogData.maskTimerScale);
        Renderer.drawString(`${AQUA + BOLD}Invincibility: ${RESET + (invincibilityTime * 0.05).toFixed(2)}s`, pogData.maskTimerX / pogData.maskTimerScale, pogData.maskTimerY / pogData.maskTimerScale, true);
    }
})