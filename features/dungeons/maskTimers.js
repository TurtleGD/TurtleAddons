import settings from "../../settings";
import { AQUA, BOLD, RESET } from "../../utils/formatting";
import { pogData } from "../../utils/pogData";

let bonzoTime;
let bonzoInvinicibility = false;
let spiritTime;
let spiritInvinicibility = false;
let phoenixTime;
let phoenixInvinicibility = false;
let showThing = false;

register('worldLoad', () => {
    bonzoInvinicibility = false;
    spiritInvinicibility = false;
    phoenixInvinicibility = false;
});


register("chat", (message) => {
    if (settings.bonzoInvinicibility) {
        if (message == "Your Bonzo's Mask saved your life!" || message == "Your ⚚ Bonzo's Mask saved your life!") {
            bonzoTime = new Date().getTime();
            bonzoInvinicibility = true
            spiritInvinicibility = false
            phoenixInvinicibility = false
        };
    };

    if (settings.spiritInvinicibility) {
        if (message == "Second Wind Activated! Your Spirit Mask saved your life!") {
            spiritTime = new Date().getTime();
            bonzoInvinicibility = false
            spiritInvinicibility = true
            phoenixInvinicibility = false
        };
    };

    if (settings.phoenixInvinicibility) {
        if (message == 'Your Phoenix Pet saved you from certain death!') {
            phoenixTime = new Date().getTime();
            bonzoInvinicibility = false
            spiritInvinicibility = false
            phoenixInvinicibility = true
        };
    };
}).setCriteria("${message}");

register("renderOverlay", () => {
    if (bonzoInvinicibility && !showThing) {
        let timeLeftBonzo = new Date().getTime();
        timeLeftBonzo = 3 - (timeLeftBonzo - bonzoTime) / 1000;
        if (timeLeftBonzo >= 0) {
            Renderer.scale(pogData.maskScale);
            Renderer.drawString(`${AQUA + BOLD}Invincibility: ${RESET + timeLeftBonzo.toFixed(3)}s`, pogData.maskX / pogData.maskScale, pogData.maskY / pogData.maskScale, true);
        }
        if (timeLeftBonzo < 0) {
            bonzoInvinicibility = false;
        };
    };

    if (spiritInvinicibility && !showThing) {
        let timeLeftSpirit = new Date().getTime();
        timeLeftSpirit = 3 - (timeLeftSpirit - spiritTime) / 1000;
        if (timeLeftSpirit >= 0) {
            Renderer.scale(pogData.maskScale);
            Renderer.drawString(`${AQUA + BOLD}Invincibility: ${RESET + timeLeftSpirit.toFixed(3)}s`, pogData.maskX / pogData.maskScale, pogData.maskY / pogData.maskScale, true);
        }
        if (timeLeftSpirit < 0) {
            spiritInvinicibility = false;
        };
    };

    if (phoenixInvinicibility && !showThing) {
        let timeLeftPhoenix = new Date().getTime();
        timeLeftPhoenix = (2 + (settings.phoenixLevel * 0.02)) - (timeLeftPhoenix - phoenixTime) / 1000;
        if (timeLeftPhoenix >= 0) {
            Renderer.scale(pogData.maskScale);
            Renderer.drawString(`${AQUA + BOLD}Invincibility: ${RESET + timeLeftPhoenix.toFixed(3)}s`, pogData.maskX / pogData.maskScale, pogData.maskY / pogData.maskScale, true);
        }
        if (timeLeftPhoenix < 0) {
            phoenixInvinicibility = false;
        };
    };
});

register('command', (...args) => {
    if (args) {
      if (args[0].toLowerCase() == 'x') {
        if (!isNaN(parseInt(args[1]))) pogData.maskX = parseInt(args[1]);
        else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use a number.`);
      }
      else if (args[0].toLowerCase() == 'y') {
        if (!isNaN(parseInt(args[1]))) pogData.maskY = parseInt(args[1]);
        else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use a number.`);
      }
      else if (args[0].toLowerCase() == 'scale') {
        if (!isNaN(parseInt(args[1]))) pogData.maskScale = parseInt(args[1]);
        else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use a number.`);
      }
      else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use "x", "y", or "scale".`);
    }
    pogData.save();

    showThing = true;
    setTimeout(() => showThing = false, 2000);
}).setName('movemask')

register('renderOverlay', () => {
    if (showThing) {
        Renderer.scale(pogData.maskScale);
        Renderer.drawString(`${AQUA + BOLD}Invincibility: ${RESET}5.000s`, pogData.maskX / pogData.maskScale, pogData.maskY / pogData.maskScale, true);
    }
});
