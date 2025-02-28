import settings from "../../settings";
import { createWaypoint } from "../../utils/functions";
import { pogData } from "../../utils/pogData";

function inStomach() {
    return Player.getX() > -178 && Player.getX() < -144 && Player.getY() < 58 && Player.getZ() > -194 && Player.getZ() < -140;
}

register("renderWorld", () => {
    if (settings.stunWaypoints && pogData.skyblockArea.includes("Kuudra") && inStomach()) {
        // Etherwarp Block
        if (settings.netherBrickEtherwarp) createWaypoint(-154, 29, -172, 0, 0, 255, 0.25, 1, false);

        // Stun Block
        if (settings.netherBrickStun) createWaypoint(-153, 31, -172, 255, 0, 0, 0.25, 1, false);

        if (settings.pickobulusStun) {
            createWaypoint(-155, 29, -157, 0, 0, 255, 0.25, 1, false);
            createWaypoint(-156, 28, -157, 0, 0, 255, 0.25, 1, false);
        }

        if (settings.skipBlock && pogData.skyblockArea.includes("(T5)")) createWaypoint(-175, 37, -151, 0, 0, 255, 0.25, 1, false);
    }
})