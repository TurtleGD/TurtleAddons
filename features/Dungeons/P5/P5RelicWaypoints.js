import settings from "../../../settings";
import { createWaypoint } from "../../../utils/functions";

let relicColor = undefined;

register('worldLoad', () => {
    relicColor = undefined;
})

register("chat", () => {
    relicColor = undefined;
}).setCriteria("[BOSS] Wither King: You... again?");

register("chat", (player, color) => {
    if (Player.getName() == player) relicColor = color;
}).setCriteria("${player} picked the Corrupted ${color} Relic!")

register('renderWorld', () => {
    if (settings.relicWaypoint && relicColor) {
        switch (relicColor) {
            case "Red":
                createWaypoint(51, 7, 42, 255, 0, 0, 0.25, 1, true);
                break;
            case "Orange":
                createWaypoint(57, 7, 42, 255, 1, 0, 0.125, 0.5, false);
                createWaypoint(57, 7, 42, 255, 0, 0, 0.125, 0.5, true);
                break;
            case "Blue":
                createWaypoint(59, 7, 44, 0, 0, 255, 0.25, 1, true);
                break;
            case "Purple":
                createWaypoint(54, 7, 41, 255, 0, 255, 0.25, 1, true);
                break;
            case "Green":
                createWaypoint(49, 7, 44, 0, 255, 0, 0.25, 1, true);
                break;
        }
    }
})