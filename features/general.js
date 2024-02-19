import settings from "../settings";
import { level, pling } from "../exports";

let kickTime;
let kicked = false

// Level up sound effect
register('chat', (message) => {
    if (message.includes(':') || !settings.levelSound) return;
    if (message.includes('LEVEL UP')) level.play()
}).setCriteria("${message}");

// Lobby timer
register('chat', (message) => {
    if (message.includes(':') || !settings.kickedTimer) return;
    if (message.includes('You were kicked while joining that server!') && !kicked) {
        kickTime = new Date().getTime();
        kicked = true;
    }
}).setCriteria("${message}");

register("renderOverlay", () => {
    if (kicked) {
      let timeLeft = new Date().getTime();
      timeLeft = 60 - (timeLeft - kickTime) / 1000;
      if (timeLeft >= 0) Renderer.drawString(`${timeLeft.toFixed(3)}`, Renderer.screen.getWidth() / 2 - 15, Renderer.screen.getHeight() / 2 + 6);
      if (timeLeft < 0) {
        kickTime = undefined;
        kicked = false
        pling.play()
      }
    };
});
