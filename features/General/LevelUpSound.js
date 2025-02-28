import settings from "../../settings";
import { level1, level2, level3, level4, level5, level6 } from "../../utils/sounds";

const sounds = [level1, level2, level3, level4, level5, level6];

register("chat", () => {
    sounds.forEach(sound => sound.stop());
    if (settings.levelSound > 0 && settings.levelSound < 7) {
        sounds[settings.levelSound - 1].setVolume(settings.levelVolume / 100);
        sounds[settings.levelSound - 1].play();
    } else if (settings.levelSound == 7) sounds[Math.floor(Math.random() * sounds.length)].play();
}).setCriteria(/^(?!.*:)(LEVEL UP|MILESTONE)/)

register("chat", (event) => {
    cancel(event);
}).setCriteria("LEVEL UP")