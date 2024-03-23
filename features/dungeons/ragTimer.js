import settings from "../../settings";
import { AQUA, BOLD, RESET, GRAY } from "../../utils/formatting";
import { pogData } from "../../utils/pogData";

let witherKingMessageTime = undefined;
let showThing = false;

register("chat", (message) => {
    if (settings.p5RagTimer) {
        if (message == '[BOSS] Wither King: You.. again?') {
            witherKingMessageTime = new Date().getTime();
        };
    };
}).setCriteria("${message}");


register("renderOverlay", () => {
    if (witherKingMessageTime && !showThing) {
        let timeLeftRag = new Date().getTime();
        timeLeftRag = 5 - (timeLeftRag - witherKingMessageTime) / 1000;
        if (timeLeftRag >= 0) Renderer.drawString(`${AQUA + BOLD }Use Rag in: ${RESET + timeLeftRag.toFixed(3)}s`, pogData.ragX, pogData.ragY, true);
    };
});

register('command', (...args) => {
    if (args) {
      if (args[0].toLowerCase() == 'x') {
        if (!isNaN(parseInt(args[1]))) pogData.ragX = parseInt(args[1]);
        else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use a number.`);
      }
      else if (args[0].toLowerCase() == 'y') {
        if (!isNaN(parseInt(args[1]))) pogData.ragY = parseInt(args[1]);
        else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use a number.`);
      }
      else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use "x" or "y".`);
    }
    pogData.save();

    showThing = true;
    setTimeout(() => showThing = false, 2000);
}).setName('moverag')

register('renderOverlay', () => {
    if (showThing) Renderer.drawString(`${AQUA + BOLD }Use Rag in: ${RESET}5.000s`, pogData.ragX, pogData.ragY, true);
})