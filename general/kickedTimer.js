import settings from "../../settings";
import { pling } from "../../exports";

let kickTime;
let kicked = false;
let kickedAndLobbied = false;

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
    if (timeLeft >= 0) Renderer.drawString(`${timeLeft.toFixed(3)}`, Renderer.screen.getWidth() / 2 - 15, Renderer.screen.getHeight() / 2 + 6);
    if (timeLeft < 0) {
      kickTime = undefined;
      kickedAndLobbied = false;
      pling.play();
    };
  };
});