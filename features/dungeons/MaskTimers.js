import settings from "../../settings";
import { AQUA, BOLD, RESET } from "../../utils/formatting";
import { pogData } from "../../utils/pogData";

let bonzoTime;
let bonzoInvinicibility = false;
let spiritTime;
let spiritInvinicibility = false;
let phoenixTime;
let phoenixInvinicibility = false;
let goldorPhase = 0;

register('worldLoad', () => {
    bonzoInvinicibility = false;
    spiritInvinicibility = false;
    phoenixInvinicibility = false;
    goldorPhase = 0;
})

register("chat", (message) => {
    if (settings.maskTimer) {
        if (message == "Your Bonzo's Mask saved your life!" || message == "Your ⚚ Bonzo's Mask saved your life!") {
            if (settings.announceUsage) ChatLib.command("pc Bonzo's Mask Used!")
            bonzoTime = new Date().getTime();
            bonzoInvinicibility = true
            spiritInvinicibility = false
            phoenixInvinicibility = false
        } else if (message == "Second Wind Activated! Your Spirit Mask saved your life!") {
            if (settings.announceUsage) ChatLib.command('pc Spirit Mask Used!')
            spiritTime = new Date().getTime();
            bonzoInvinicibility = false
            spiritInvinicibility = true
            phoenixInvinicibility = false
        } else if (message == 'Your Phoenix Pet saved you from certain death!') {
            if (settings.announceUsage) ChatLib.command('pc Phoenix Used!')
            phoenixTime = new Date().getTime();
            bonzoInvinicibility = false
            spiritInvinicibility = false
            phoenixInvinicibility = true
        }
    }

    if (message == '[BOSS] Storm: I should have known that I stood no chance.') goldorPhase = 1;
    else if ((message.includes('(7/7)') || message.includes('(8/8)')) && !message.includes(':')) goldorPhase += 1;

    if (goldorPhase == 5) goldorPhase = 0;
}).setCriteria("${message}");

register("renderOverlay", () => {
    if (bonzoInvinicibility) {
        let timeLeftBonzo = new Date().getTime();
        timeLeftBonzo = 3 - (timeLeftBonzo - bonzoTime) / 1000;
        if (timeLeftBonzo >= 0) {
            Renderer.scale(pogData.maskTimerScale);
            Renderer.drawString(`${AQUA + BOLD}Invincibility: ${RESET + timeLeftBonzo.toFixed(3)}s`, pogData.maskTimerX / pogData.maskTimerScale, pogData.maskTimerY / pogData.maskTimerScale, true);
        }
        if (timeLeftBonzo < 0) {
            bonzoInvinicibility = false;
        }
    }

    if (spiritInvinicibility) {
        let timeLeftSpirit = new Date().getTime();
        timeLeftSpirit = 3 - (timeLeftSpirit - spiritTime) / 1000;
        if (timeLeftSpirit >= 0) {
            Renderer.scale(pogData.maskTimerScale);
            Renderer.drawString(`${AQUA + BOLD}Invincibility: ${RESET + timeLeftSpirit.toFixed(3)}s`, pogData.maskTimerX / pogData.maskTimerScale, pogData.maskTimerY / pogData.maskTimerScale, true);
        }
        if (timeLeftSpirit < 0) {
            spiritInvinicibility = false;
        }
    }

    if (phoenixInvinicibility) {
        let timeLeftPhoenix = new Date().getTime();
        if (goldorPhase == 0) timeLeftPhoenix = (2 + (settings.phoenixLevel * 0.02)) - (timeLeftPhoenix - phoenixTime) / 1000;
        else timeLeftPhoenix = 3 - (timeLeftPhoenix - phoenixTime) / 1000;
        if (timeLeftPhoenix >= 0) {
            Renderer.scale(pogData.maskTimerScale);
            Renderer.drawString(`${AQUA + BOLD}Invincibility: ${RESET + timeLeftPhoenix.toFixed(3)}s`, pogData.maskTimerX / pogData.maskTimerScale, pogData.maskTimerY / pogData.maskTimerScale, true);
        }
        if (timeLeftPhoenix < 0) {
            phoenixInvinicibility = false;
        }
    }
})