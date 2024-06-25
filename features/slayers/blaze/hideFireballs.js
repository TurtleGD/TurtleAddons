import settings from "../../../settings";
import { removeEmojis } from "../../../utils/functions";

register("renderEntity", (entity, pos, partialTick, event) => {
    if (settings.hideFireballs && entity.getName().includes('Fireball') && removeEmojis(Scoreboard.getLines().join('')).includes('Slay the boss!')) cancel(event);
})