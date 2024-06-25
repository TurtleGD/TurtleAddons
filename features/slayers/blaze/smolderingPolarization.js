import settings from "../../../settings";
import { RED, AQUA, GRAY, WHITE, GREEN } from "../../../utils/formatting";
import { pling } from "../../../utils/sounds";
import { pogData } from "../../../utils/pogData";
import { getArea } from "../../../utils/functions";

register("chat", (message, event) => {
    if (settings.gummyWarning) {
        if (message == 'You ate a Re-heated Gummy Polar Bear!') pogData.gummyTimeLeft = 3600;
        pogData.save();
    }
}).setCriteria("${message}")


register('step', () => {
    if (settings.gummyWarning && Scoreboard.getTitle().includes('SKYBLOCK') && !getArea().includes('Catacombs')) {
        if (pogData.gummyTimeLeft > 0) pogData.gummyTimeLeft -= 1;
    
        if (pogData.gummyTimeLeft == settings.gummyTimer * 60) {
            Client.showTitle(`${RED}GUMMY LOW!`, '', 0, 60, 20);
            pling.play();
            ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE + settings.gummyTimer}m of ${GREEN}Smoldering Polarization I ${WHITE}left.`);
        }
        pogData.save();
    }
}).setDelay(1)

let showGummy = false;

register("renderOverlay", () => {
    if (!showGummy && settings.gummyWarning) {
        if (pogData.gummyTimeLeft > 0) {
            Renderer.scale(pogData.gummyWarningScale);
            Renderer.drawString(`${GREEN}Smoldering Polarization I: ${WHITE + Math.floor(pogData.gummyTimeLeft / 60)}m ${pogData.gummyTimeLeft % 60}s`, pogData.gummyWarningX / pogData.gummyWarningScale, pogData.gummyWarningY / pogData.gummyWarningScale, true);
        }
        else {
            Renderer.scale(pogData.gummyWarningScale);
            Renderer.drawString(`${GREEN}Smoldering Polarization I: ${RED}Expired!`, pogData.gummyWarningX / pogData.gummyWarningScale, pogData.gummyWarningY / pogData.gummyWarningScale, true);
        }
    } else if (showGummy) {
        Renderer.scale(pogData.gummyWarningScale);
        Renderer.drawString(`${GREEN}Smoldering Polarization ${WHITE}60m 0s`, pogData.gummyWarningX / pogData.gummyWarningScale, pogData.gummyWarningY / pogData.gummyWarningScale, true);
    }
})

register('command', (...args) => {
    if (args) {
      if (args[0].toLowerCase() == 'x') {
        if (!isNaN(parseFloat(args[1]))) pogData.gummyWarningX = parseFloat(args[1]);
        else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use a number.`);
      }
      else if (args[0].toLowerCase() == 'y') {
        if (!isNaN(parseFloat(args[1]))) pogData.gummyWarningY = parseFloat(args[1]);
        else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use a number.`);
      }
      else if (args[0].toLowerCase() == 'scale') {
        if (!isNaN(parseFloat(args[1]))) pogData.gummyWarningScale = parseFloat(args[1]);
        else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use a number.`);
      }
      else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use "x", "y", or "scale".`);
    }
    ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use "x", "y", or "scale".`);
    pogData.save();

    showGummy = true;
    setTimeout(() => showGummy = false, 2000);
}).setName('movegummy')