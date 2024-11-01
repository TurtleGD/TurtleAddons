import settings from "../../settings";
import { getArea, createWaypoint } from "../../utils/functions";

let inInfernal = false;
let inKuudra = false;

register('worldLoad', () => {
    setTimeout(() => {
        inInfernal = getArea() == "Kuudra's Hollow (T5)"
        inKuudra = getArea()?.includes("Kuudra's Hollow");
    }, 5000)
})

register('renderWorld', () => {
    if (settings.stunHelper && inKuudra) {
        // Etherwarp Block
        if (settings.etherwarpBlock && Player.asPlayerMP().distanceTo(-154, 29, -172) < 40) createWaypoint(-154, 29, -172, 0, 0, 255, 0.25, 1, false);

        // Stun Block
        if (settings.stunBlock && Player.asPlayerMP().distanceTo(-153, 31, -172) < 40) createWaypoint(-153, 31, -172, 0, 0, 255, 0.25, 1, false);
    };

    if (settings.skipBlock && Player.asPlayerMP().distanceTo(-175, 37, -151) < 40 && inInfernal) createWaypoint(-175, 37, -151, 0, 0, 255, 0.25, 1, false);

    if (settings.instaStunEtherwarpBlock && Player.asPlayerMP().distanceTo(-167, 21, -170) < 40 && inKuudra) {
        createWaypoint(-167, 21, -170, 0, 0, 255, 0.25, 1, false);
        createWaypoint(-155, 29, -157, 0, 0, 255, 0.25, 1, false);
        createWaypoint(-156, 28, -157, 0, 0, 255, 0.25, 1, false);
    }
    
    if (settings.secondWaypoints && inKuudra) {
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

    if (settings.labelSecondWaypoints && inKuudra) {
        Tessellator.drawString('Right', -71.5, 165, -133.5, Renderer.WHITE, false, 0.8, true);
        Tessellator.drawString('Left', -80.5, 165, -127.5, Renderer.WHITE, false, 0.8, true);
        Tessellator.drawString('Square', -138.5, 155, -89.5, Renderer.WHITE, false, 0.8, true);
        Tessellator.drawString('Equals -> Shop', -75.5, 155, -136.5, Renderer.WHITE, false, 0.8, true);
        Tessellator.drawString('X -> Cannon', -129, 167, -112.5, Renderer.WHITE, false, 0.8, true);
    };
});