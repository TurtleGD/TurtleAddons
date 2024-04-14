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
            Renderer.scale(pogData.lobbyScale);
            Renderer.drawString(`${AQUA + BOLD}Cooldown over in: ${RESET + timeLeft.toFixed(1)}s`, pogData.lobbyX / pogData.lobbyScale, pogData.lobbyY / pogData.lobbyScale, true);
        }
        if (timeLeft < 0) {
            kickTime = undefined;
            kicked = false;
            pling.play();
        }
    }

    if (showThing) {
        Renderer.scale(pogData.lobbyScale);
        Renderer.drawString(`${AQUA + BOLD}Cooldown over in: ${RESET}60.0s`, pogData.lobbyX / pogData.lobbyScale, pogData.lobbyY / pogData.lobbyScale, true);
    }
});

register('command', (...args) => {
    if (args) {
        if (args[0].toLowerCase() == 'x') {
            if (!isNaN(parseInt(args[1]))) pogData.lobbyX = parseInt(args[1]);
            else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use a number.`);
        } else if (args[0].toLowerCase() == 'y') {
            if (!isNaN(parseInt(args[1]))) pogData.lobbyY = parseInt(args[1]);
            else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use a number.`);
        } else if (args[0].toLowerCase() == 'scale') {
            if (!isNaN(parseInt(args[1]))) pogData.lobbyScale = parseInt(args[1]);
            else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use a number.`);
        } else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use "x", "y", or "scale".`);
    }
    pogData.save();

    showThing = true;
    setTimeout(() => showThing = false, 2000);
}).setName('movelobby');
