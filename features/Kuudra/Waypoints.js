import settings from "../../settings";
import { createWaypoint } from "../../utils/functions";
import { pogData } from "../../utils/pogData";

register('renderWorld', () => {
    if (settings.stunHelper && pogData.skyblockArea.includes("Kuudra")) {
        // Etherwarp Block
        if (settings.etherwarpBlock && Player.asPlayerMP().distanceTo(-154, 29, -172) < 40) createWaypoint(-154, 29, -172, 0, 0, 255, 0.25, 1, false);

        // Stun Block
        if (settings.stunBlock && Player.asPlayerMP().distanceTo(-153, 31, -172) < 40) createWaypoint(-153, 31, -172, 0, 0, 255, 0.25, 1, false);
    };

    if (settings.skipBlock && Player.asPlayerMP().distanceTo(-175, 37, -151) < 40 && pogData.skyblockArea.includes("(T5)")) createWaypoint(-175, 37, -151, 0, 0, 255, 0.25, 1, false);

    if (settings.instaStunEtherwarpBlock && Player.asPlayerMP().distanceTo(-167, 21, -170) < 40 && pogData.skyblockArea.includes("Kuudra")) {
        createWaypoint(-167, 21, -170, 0, 0, 255, 0.25, 1, false);
        createWaypoint(-155, 29, -157, 0, 0, 255, 0.25, 1, false);
        createWaypoint(-156, 28, -157, 0, 0, 255, 0.25, 1, false);
    }
    
    if (settings.secondWaypoints && pogData.skyblockArea.includes("Kuudra")) {
        // Right Shop
        createWaypoint(-72, 160, -134, 255, 0, 255, 0.25, 1, false);

        // Left Shop
        createWaypoint(-81, 160, -128, 255, 0, 255, 0.25, 1, false);

        // Square
        createWaypoint(-139, 150, -90, 0, 0, 255, 0.25, 1, false);

        // Equals to shop
        createWaypoint(-76, 150, -137, 0, 255, 0, 0.25, 1, false);

        // X to cannon
        createWaypoint(-129, 162, -113, 255, 255, 255, 0.25, 1, false);
    };

    if (settings.labelSecondWaypoints && pogData.skyblockArea.includes("Kuudra")) {
        Tessellator.drawString('Right', -71.5, 165, -133.5, Renderer.WHITE, false, 0.8, true);
        Tessellator.drawString('Left', -80.5, 165, -127.5, Renderer.WHITE, false, 0.8, true);
        Tessellator.drawString('Square', -138.5, 155, -89.5, Renderer.WHITE, false, 0.8, true);
        Tessellator.drawString('Equals -> Shop', -75.5, 155, -136.5, Renderer.WHITE, false, 0.8, true);
        Tessellator.drawString('X -> Cannon', -129, 167, -112.5, Renderer.WHITE, false, 0.8, true);
    };
});