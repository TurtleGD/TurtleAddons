import settings from "../../settings";
import { level1, level2, level3, level4, level5, level6 } from "../../utils/sounds";

const sounds = [level1, level2, level3, level4, level5, level6];

register("chat", (message) => {
    if (!message.includes(":") && (message.includes("LEVEL UP") || message.includes("MILESTONE"))) {
        switch (settings.levelSound) {
            case 0:
                break;
            case 1:
                sounds.forEach(sound => sound.stop());
                level1.setVolume(settings.levelVolume / 100);
                level1.play();
                break;
            case 2:
                sounds.forEach(sound => sound.stop());
                level2.setVolume(settings.levelVolume / 100);
                level2.play();
                break;
            case 3:
                sounds.forEach(sound => sound.stop());
                level3.setVolume(settings.levelVolume / 100);
                sounds.forEach(sound => sound.stop());
                break;
            case 4:
                sounds.forEach(sound => sound.stop());
                level4.setVolume(settings.levelVolume / 100);
                level4.play();
                break;
            case 5:
                sounds.forEach(sound => sound.stop());
                level5.setVolume(settings.levelVolume / 100);
                level5.play();
                break;
            case 6:
                sounds.forEach(sound => sound.stop());
                level6.setVolume(settings.levelVolume / 100);
                level6.play();
                break;
            default:
                sounds.forEach(sound => sound.stop());
                sounds[Math.floor(Math.random() * sounds.length)].play();
                break;
        }
    }
}).setCriteria("${message}")