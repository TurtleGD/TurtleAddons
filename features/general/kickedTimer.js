import settings from "../../settings";
import { pling } from "../../utils/sounds";
import { AQUA, BOLD, RESET } from "../../utils/formatting";
import { pogData } from "../../utils/pogData";

let kickTime;
let kicked = false;
let showThing = false;

register('worldLoad', () => {
    if (kicked) kickTime = new Date().getTime();
});

register('chat', (message) => {
    if (settings.kickedTimer) {
        if (message == 'You were kicked while joining that server!' && Scoreboard.getTitle().includes('SKYBLOCK')) kicked = true;
    }
}).setCriteria("${message}");

register("renderOverlay", () => {
    if (kicked) {
        let timeLeft = new Date().getTime();
        timeLeft = 60 - (timeLeft - kickTime) / 1000;
        if (timeLeft >= 0 && !showThing) {
            Renderer.scale(pogData.kickedTimerScale);
            Renderer.drawString(`${AQUA + BOLD}Cooldown over in: ${RESET + timeLeft.toFixed(1)}s`, pogData.kickedTimerX / pogData.kickedTimerScale, pogData.kickedTimerY / pogData.kickedTimerScale, true);
        }
        if (timeLeft < 0) {
            kickTime = undefined;
            kicked = false;
            pling.play();
        }
    }

    if (showThing) {
        Renderer.scale(pogData.kickedTimerScale);
        Renderer.drawString(`${AQUA + BOLD}Cooldown over in: ${RESET}60.0s`, pogData.kickedTimerX / pogData.kickedTimerScale, pogData.kickedTimerY / pogData.kickedTimerScale, true);
    }
});

register('command', (...args) => {
    if (args) {
        if (args[0].toLowerCase() == 'x') {
            if (!isNaN(parseFloat(args[1]))) pogData.kickedTimerX = parseFloat(args[1]);
            else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use a number.`);
        } else if (args[0].toLowerCase() == 'y') {
            if (!isNaN(parseFloat(args[1]))) pogData.kickedTimerY = parseFloat(args[1]);
            else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use a number.`);
        } else if (args[0].toLowerCase() == 'scale') {
            if (!isNaN(parseFloat(args[1]))) pogData.kickedTimerScale = parseFloat(args[1]);
            else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use a number.`);
        } else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use "x", "y", or "scale".`);
    }
    pogData.save();

    showThing = true;
    setTimeout(() => showThing = false, 2000);
}).setName('movelobby');
