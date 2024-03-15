import settings from "../../settings";
import { level } from "../../exports";

register('chat', (message) => {
if (settings.levelSound) {
  if (!message.includes(':') && message.includes('LEVEL UP')) {
    level.setVolume(settings.levelVolume / 100);
    level.play();
  };
};
}).setCriteria("${message}");