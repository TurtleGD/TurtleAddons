import settings from "../../settings";
import { pogData } from "../../utils/pogData";
import { AQUA, GRAY, WHITE } from "../../utils/formatting";

let showThing = false;
let startTime = undefined;

register('soundPlay', (pos, name, vol, pitch, cat, event) => {
  if (settings.srbTimer) {
    if (pitch == 1 && !startTime && Player.getHeldItem()?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getString('id') == 'SOULS_REBOUND' && !Client.isInGui()) {
      startTime = new Date().getTime();
    }
  }
}).setCriteria('random.successful_hit')

register('renderOverlay', () => {
  if (!showThing && startTime) {
    if ((5 - ((new Date().getTime() - startTime) / 1000) > 0)) {
      Renderer.scale(pogData.srbScale);
      Renderer.drawString(`${AQUA}Souls Rebound: ${WHITE + (5 - ((new Date().getTime() - startTime) / 1000)).toFixed(3)}s`, pogData.srbX / pogData.srbScale, pogData.srbY / pogData.srbScale, true);
    }
    if (5 - ((new Date().getTime() - startTime) / 1000) <= 0) startTime = undefined;
  } else if (showThing) {
    Renderer.scale(pogData.srbScale);
    Renderer.drawString(`${AQUA}Souls Rebound: ${WHITE}5.000s`, pogData.srbX / pogData.srbScale, pogData.srbY / pogData.srbScale, true);
  }
})

register('command', (...args) => {
  if (args) {
    if (args[0].toLowerCase() == 'x') {
      if (!isNaN(parseInt(args[1]))) pogData.srbX = parseInt(args[1]);
      else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use a number.`);
    }
    else if (args[0].toLowerCase() == 'y') {
      if (!isNaN(parseInt(args[1]))) pogData.srbY = parseInt(args[1]);
      else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use a number.`);
    }
    else if (args[0].toLowerCase() == 'scale') {
      if (!isNaN(parseInt(args[1]))) pogData.srbScale = parseInt(args[1]);
      else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use a number.`);
    }
    else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use "x", "y", or "scale".`);
  }
  pogData.save();

  showThing = true;
  setTimeout(() => showThing = false, 2000);
}).setName('movesrb')
