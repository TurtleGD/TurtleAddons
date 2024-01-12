import settings from "../settings";
import { isPlayerAt, createWaypoint } from "../exports";

register('renderWorld', () => {
    if (isPlayerAt('Kuudra') == false) return;

    // Etherwarp Block
    if (settings.etherwarpBlock == true && Math.hypot(Math.abs(Player.getX() - -153.5), Math.abs(Player.getY() - 29), Math.abs(Player.getZ() - -171.5)) < 40) {
        createWaypoint(-154, 29, -172, 0, 0, 255, 0.25, 1, true);
    };

    // Stun Block
    if (settings.stunBlock == true && Math.hypot(Math.abs(Player.getX() - -152.5), Math.abs(Player.getY() - 31), Math.abs(Player.getZ() - -171.5)) < 40) {
        createWaypoint(-153, 31, -172, 0, 0, 255, 0.25, 1, true);
    };
});
