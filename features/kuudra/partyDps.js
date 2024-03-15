import settings from "../../settings";
import { WHITE, GRAY, AQUA} from "../../exports";
import { getArea, inTrueLair } from "../../exports";

let startTime;
let endTime;
let timeToKill;
let counting = false;
let inInfernal = false;

register('worldLoad', () => {
    counting = false;
    startTime = undefined;
    endTime = undefined;
    timeToKill = undefined;
    inInfernal = false;

    setTimeout(() => {
        if (getArea() == "Kuudra's Hollow (T5)") inInfernal = true;
    }, 2000); 
});

register("chat", (message) => {
    if (settings.partyDps) { 
        if (message.includes("KUUDRA DOWN!") && !message.includes(':') && inInfernal) {
            endTime = new Date().getTime();
            timeToKill = (endTime - startTime) / 1000;
            setTimeout(() => {
                if (!settings.partyDpsNoSend) ChatLib.command(`pc Party DPS: ${(300/timeToKill).toFixed(2)}m`);
                else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Party DPS: ${(300/timeToKill).toFixed(2)}m`);
            }, 50);
        };
    };
}).setCriteria("${message}");

register('tick', () => {
    if (settings.partyDps) {
        if (inInfernal && inTrueLair() && !counting) {
            startTime = new Date().getTime();
            counting = true;
        };
    };
});
