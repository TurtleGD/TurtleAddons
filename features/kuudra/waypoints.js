import settings from "../../settings";
import { getArea, createWaypoint } from "../../utils/functions";

let inInfernal = false;
let inKuudra = false;

register('worldLoad', () => {
    inInfernal = false;
    inKuudra = false
    inKuudra = false;

    setTimeout(() => {
        if (getArea() == "Kuudra's Hollow (T5)") inInfernal = true;
        if (getArea().includes("Kuudra's Hollow")) inKuudra = true;
    }, 2000); 
});

register('renderWorld', () => {
    if (settings.stunHelper && inKuudra) {
        // Etherwarp Block
        if (settings.etherwarpBlock && Player.asPlayerMP().distanceTo(-154, 29, -172) < 40) createWaypoint(-154, 29, -172, 0, 0, 255, 0.25, 1, true);

        // Stun Block
        if (settings.stunBlock && Player.asPlayerMP().distanceTo(-153, 31, -172) < 40) createWaypoint(-153, 31, -172, 0, 0, 255, 0.25, 1, true);
    };

    if (settings.skipBlock && Player.asPlayerMP().distanceTo(-175, 37, -151) < 40 && inInfernal) createWaypoint(-175, 37, -151, 0, 0, 255, 0.25, 1, true);

    if (settings.instaStunEtherwarpBlock && Player.asPlayerMP().distanceTo(-168, 21, -170) < 40 && inKuudra) createWaypoint(-166, 21, -168, 0, 0, 255, 0.25, 1, true);
    
    if (settings.secondWaypoints && inKuudra) {
        // Right Shop
        createWaypoint(-72, 160, -134, 255, 0, 255, 0.25, 1, true);

        // Left Shop
        createWaypoint(-81, 160, -128, 255, 0, 255, 0.25, 1, true);

        // Square
        createWaypoint(-139, 150, -90, 0, 0, 255, 0.25, 1, true);

        // Equals to shop
        createWaypoint(-76, 150, -137, 0, 255, 0, 0.25, 1, true);

        // X to cannon
        createWaypoint(-129, 162, -113, 255, 255, 255, 0.25, 1, true);
    };

    if (settings.labelSecondWaypoints && inKuudra) {
        Tessellator.drawString('Right', -71.5, 165, -133.5, Renderer.WHITE, false, 0.8, true);
        Tessellator.drawString('Left', -80.5, 165, -127.5, Renderer.WHITE, false, 0.8, true);
        Tessellator.drawString('Square', -138.5, 155, -89.5, Renderer.WHITE, false, 0.8, true);
        Tessellator.drawString('Equals -> Shop', -75.5, 155, -136.5, Renderer.WHITE, false, 0.8, true);
        Tessellator.drawString('X -> Cannon', -129, 167, -112.5, Renderer.WHITE, false, 0.8, true);
    };
});