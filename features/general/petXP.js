import settings from "../../settings"
import { pogData } from "../../utils/pogData"
import { AQUA, RESET, GRAY, WHITE, BOLD } from "../../utils/formatting"

let petXP = undefined;
let showThing = false;

register('step', () => {
  if (settings.petXP){
    for (let i = 0; i < TabList.getNames().length; i++) {
      if ((TabList.getNames()[i]).removeFormatting().includes('XP (') || TabList.getNames()[i].includes('MAX LEVEL')) {
        petXP = i;
        break;
      }    
      else petXP = undefined;
    }
  }
}).setDelay(1)

register('renderOverlay', () => {
  if (petXP && !showThing) Renderer.drawString(`${AQUA + BOLD}Pet XP:${RESET}${(TabList.getNames()[petXP]).removeFormatting()}`, pogData.petXPX, pogData.petXPY, true);
})

register('command', (...args) => {
  if (args) {
    if (args[0].toLowerCase() == 'x') {
      if (!isNaN(parseInt(args[1]))) pogData.petXPX = parseInt(args[1]);
      else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use a number.`);
    }
    else if (args[0].toLowerCase() == 'y') {
      if (!isNaN(parseInt(args[1]))) pogData.petXPY = parseInt(args[1]);
      else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use a number.`);
    }
    else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use "x" or "y".`);
  }
  pogData.save();

  showThing = true;
  setTimeout(() => showThing = false, 2000);
}).setName('movepetxp')

register('renderOverlay', () => {
  if (showThing) Renderer.drawString(`${AQUA + BOLD}Pet XP: ${RESET}0/123,456 (0%)`, pogData.petXPX, pogData.petXPY, true);
})