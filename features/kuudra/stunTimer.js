import settings from "../../settings";
import { WHITE, GRAY, AQUA } from "../../utils/formatting";

let p3 = undefined;

register('worldLoad', () => {
    p3 = undefined;
});

register("chat", (message) => {
    if (settings.stunTimer) {
        if (message == "[NPC] Elle: Phew! The Ballista is finally ready! It should be strong enough to tank Kuudra's blows now!") p3 = new Date().getTime();
        if (message.includes("destroyed one of Kuudra's pods!") && !message.includes(':')) ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Stun took ${((new Date().getTime() - p3) / 1000).toFixed(3)}s.`);
        if (settings.entryTimer && message == "[NPC] Elle: Oh, funny seeing you here.") ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Entry took ${((new Date().getTime() - p3) / 1000).toFixed(3)}s.`);
    };
}).setCriteria("${message}");