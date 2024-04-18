import settings from "../../settings";
import { WHITE, GRAY, AQUA } from "../../utils/formatting";
import { getArea, formatNumber } from "../../utils/functions";
import { EntityMagmaCube } from "../../utils/entities";

let startTime;
let inInfernal = false;
let sent = false;
let stunned = false;

register('worldLoad', () => {
    startTime = undefined;
    sent = false;
    stunned = false;

    setTimeout(() => inInfernal = getArea() == "Kuudra's Hollow (T5)", 2000);
})

register('tick', () => {
    if (settings.stunDps) {
        World.getAllEntitiesOfType(EntityMagmaCube).forEach(cube => {
            if (!sent && stunned && inInfernal && cube.getWidth().toFixed(1) == 15.3 && cube.getEntity().func_110143_aJ() <= 25001) {
                ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Stun DPS: ${formatNumber((75000 / ((new Date().getTime() - startTime) / 1000)).toFixed(0))} (${((new Date().getTime() - startTime) / 1000).toFixed(2)}s).`);
                sent = true;
                if (((new Date().getTime() - startTime) / 1000) > 20) ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}nice one phase bum`);
            }

            if (!sent && stunned && !inInfernal && cube.getWidth().toFixed(1) == 15.3 && cube.getEntity().func_110143_aJ() <= 1) {
                ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Stun DPS: ${formatNumber((100000 / ((new Date().getTime() - startTime) / 1000)).toFixed(0))} (${((new Date().getTime() - startTime) / 1000).toFixed(2)}s).`);
                sent = true;
                if (((new Date().getTime() - startTime) / 1000) > 20) ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}nice one phase bum`);
            }
        })
    }
})

register("chat", (message) => {
    if (settings.stunDps) {
        if (message.includes("destroyed one of Kuudra's pods!") && !message.includes(':') && stunned == false) {
            startTime = new Date().getTime();
            stunned = true;
        }
    };
}).setCriteria("${message}")