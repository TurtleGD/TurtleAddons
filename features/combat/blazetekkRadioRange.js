import settings from "../../settings";
import { pogData } from "../../utils/pogData";
import { AQUA, BOLD, GRAY, GREEN, RED, WHITE } from "../../utils/formatting";

let showThing = false;

register('renderOverlay', () => {
    if (settings.blazetekkRadioRange.length > 0 && !showThing) {
        if (!World?.getPlayerByName(settings.blazetekkRadioRange)) return;

        let distance = Player.asPlayerMP().distanceTo(World.getPlayerByName(settings.blazetekkRadioRange))

        Renderer.scale(pogData.blazetekkRadioRangeScale);
        Renderer.drawString(`${AQUA + BOLD}Blazetekk: ${distance <= 55 ? GREEN : RED}${distance.toFixed(1)} blocks away`, pogData.blazetekkRadioRangeX / pogData.blazetekkRadioRangeScale, pogData.blazetekkRadioRangeY / pogData.blazetekkRadioRangeScale, true);
        
    } else if (showThing) {
        Renderer.scale(pogData.blazetekkRadioRangeScale);
        Renderer.drawString(`${AQUA + BOLD}Blazetekk: ${GREEN}10.0 blocks away`, pogData.blazetekkRadioRangeX / pogData.blazetekkRadioRangeScale, pogData.blazetekkRadioRangeY / pogData.blazetekkRadioRangeScale, true);
    }
})

register('command', (...args) => {
    if (args) {
        if (args[0].toLowerCase() == 'x') {
            if (!isNaN(parseFloat(args[1]))) pogData.blazetekkRadioRangeX = parseFloat(args[1]);
            else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use a number.`);
        } else if (args[0].toLowerCase() == 'y') {
            if (!isNaN(parseFloat(args[1]))) pogData.blazetekkRadioRangeY = parseFloat(args[1]);
            else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use a number.`);
        } else if (args[0].toLowerCase() == 'scale') {
            if (!isNaN(parseFloat(args[1]))) pogData.blazetekkRadioRangeScale = parseFloat(args[1]);
            else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use a number.`);
        } else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use "x", "y", or "scale".`);
    }
    else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use "x", "y", or "scale".`);
    pogData.save();

    showThing = true;
    setTimeout(() => showThing = false, 2000);
}).setName('moveblazetekk')