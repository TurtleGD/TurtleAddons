import settings from "../../settings";
import { AQUA, BOLD, RESET, GRAY } from "../../utils/formatting";
import { pogData } from "../../utils/pogData";

let witherKingMessageTime = undefined;
let showThing = false;

register("chat", (message) => {
  if (settings.p5RagTimer) {
    if (message == '[BOSS] Wither King: You... again?') {
        witherKingMessageTime = new Date().getTime();
    }
  }
}).setCriteria("${message}");


register("renderOverlay", () => {
  if (witherKingMessageTime && !showThing) {
    let timeLeftRag = new Date().getTime();
    timeLeftRag = 5 - (timeLeftRag - witherKingMessageTime) / 1000;
    if (timeLeftRag >= 0) {
      Renderer.scale(pogData.p5RagTimerScale);
      Renderer.drawString(`${AQUA + BOLD}Use Rag in: ${RESET + timeLeftRag.toFixed(3)}s`, pogData.p5RagTimerX / pogData.p5RagTimerScale, pogData.p5RagTimerY / pogData.p5RagTimerScale, true);
    }
  } else if (showThing) {
    Renderer.scale(pogData.p5RagTimerScale);
    Renderer.drawString(`${AQUA + BOLD}Use Rag in: ${RESET}5.000s`, pogData.p5RagTimerX / pogData.p5RagTimerScale, pogData.p5RagTimerY / pogData.p5RagTimerScale, true);
  }
})

register('command', (...args) => {
  if (args) {
    if (args[0].toLowerCase() == 'x') {
      if (!isNaN(parseFloat(args[1]))) pogData.p5RagTimerX = parseFloat(args[1]);
      else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use a number.`);
    }
    else if (args[0].toLowerCase() == 'y') {
      if (!isNaN(parseFloat(args[1]))) pogData.p5RagTimerY = parseFloat(args[1]);
      else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use a number.`);
    }
    else if (args[0].toLowerCase() == 'scale') {
      if (!isNaN(parseFloat(args[1]))) pogData.p5RagTimerScale = parseFloat(args[1]);
      else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use a number.`);
    }
    else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use "x", "y", or "scale".`);
  }
  pogData.save();

  showThing = true;
  setTimeout(() => showThing = false, 2000);
}).setName('moverag')