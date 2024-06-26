import settings from "../../settings";
import { createWaypoint } from "../../utils/functions";

let holdingRelic = undefined;

register('worldLoad', () => {
    holdingRelic = undefined;
})

register("chat", (message) => {
    if (settings.relicHelper) {
        if (message == '[BOSS] Wither King: You... again?') {
            holdingRelic = undefined;
        }
    }
}).setCriteria("${message}");

register("chat", (relicPicker, relicColor) => {
    if (Player.getName() == relicPicker) holdingRelic = relicColor;
}).setCriteria("${relicPicker} picked the Corrupted ${relicColor} Relic!")

register('renderWorld', () => {
    if (settings.relicHelper && holdingRelic) {
        switch (holdingRelic) {
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