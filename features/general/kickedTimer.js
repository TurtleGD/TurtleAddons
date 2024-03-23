import settings from "../../settings";
import { pling } from "../../utils/sounds";
import { AQUA, BOLD, RESET } from "../../utils/formatting";
import { pogData } from "../../utils/pogData";

let kickTime;
let kicked = false;
let kickedAndLobbied = false;
let showThing = false;

register('worldLoad', () => {
  if (kicked) {
    kickTime = new Date().getTime();
    kickedAndLobbied = true;
    kicked = false;
  };
});

register('chat', (message) => {
if (settings.kickedTimer) {
  if (message == 'You were kicked while joining that server!' && !kicked) kicked = true;
};
}).setCriteria("${message}");

register("renderOverlay", () => {
  if (kickedAndLobbied) {
    let timeLeft = new Date().getTime();
    timeLeft = 60 - (timeLeft - kickTime) / 1000;
    if (timeLeft >= 0) Renderer.drawString(`${AQUA + BOLD}Cooldown over in: ${RESET + timeLeft.toFixed(1)}s`, pogData.lobbyX, pogData.lobbyY, true);
    if (timeLeft < 0) {
      kickTime = undefined;
      kickedAndLobbied = false;
      pling.play();
    };
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
}).setName('movelobby')

register('renderOverlay', () => {
  if (showThing) Renderer.drawString(`${AQUA + BOLD}Cooldown over in: ${RESET}60.0s`, pogData.lobbyX, pogData.lobbyY, true);
})