import settings from "../../settings";
import { pogData } from "../../utils/pogData";
import { AQUA, RESET, GRAY, WHITE } from "../../utils/formatting";

let petXP = undefined;
let showThing = false;
let fishingPetXP = '';

register('step', () => {
  if (settings.petXPFishing.length > 0){
    for (let i = 0; i < TabList.getNames().length; i++) {
      if (TabList.getNames()[i].includes(settings.petXPFishing)) {
        fishingPetXP = TabList.getNames()[i + 1];
        break;
      } 
    }
  } else if (settings.petXP){
    for (let i = 0; i < TabList.getNames().length; i++) {
      if ((TabList.getNames()[i]).removeFormatting().includes('XP (') || TabList.getNames()[i].includes('MAX LEVEL')) {
        petXP = i;
        break;
      } 
    }
  }
}).setDelay(1)

register('renderOverlay', () => {
  if (petXP && !showThing && settings.petXPFishing.length == 0) {
    Renderer.scale(pogData.petXPScale);
    Renderer.drawString(`${AQUA}Pet XP:${RESET}${(TabList.getNames()[petXP])?.removeFormatting()}`, pogData.petXPX / pogData.petXPScale, pogData.petXPY / pogData.petXPScale, true);
  } else if (!showThing && settings.petXPFishing.length > 0) {
    Renderer.scale(pogData.petXPScale);
    Renderer.drawString(`${AQUA}Pet XP (${settings.petXPFishing}):${RESET}${fishingPetXP?.removeFormatting()}`, pogData.petXPX / pogData.petXPScale, pogData.petXPY / pogData.petXPScale, true);
  } else if (showThing) {
    Renderer.scale(pogData.petXPScale);
    Renderer.drawString(`${AQUA}Pet XP: ${RESET}0/123,456 (0%)`, pogData.petXPX / pogData.petXPScale, pogData.petXPY / pogData.petXPScale, true);
  }
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
    else if (args[0].toLowerCase() == 'scale') {
      if (!isNaN(parseInt(args[1]))) pogData.petXPScale = parseInt(args[1]);
      else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use a number.`);
    }
    else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use "x", "y", or "scale".`);
  }
  pogData.save();

  showThing = true;
  setTimeout(() => showThing = false, 2000);
}).setName('movepetxp')
