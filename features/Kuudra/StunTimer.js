import settings from "../../settings";
import { WHITE, GRAY, AQUA } from "../../utils/formatting";
import { getArea } from "../../utils/functions";

let p3 = undefined;
let sentEntry = false;
let inKuudra = false

register('worldLoad', () => {
    p3 = undefined;
    sentEntry = false;
    setTimeout(() => getArea()?.includes('Kuudra'), 5000);
})

register("chat", (message) => {
    if (settings.stunTimer) {
        if (message == "[NPC] Elle: Phew! The Ballista is finally ready! It should be strong enough to tank Kuudra's blows now!") p3 = new Date().getTime();
        if (message.includes("destroyed one of Kuudra's pods!") && !message.includes(':')) ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Stun took ${((new Date().getTime() - p3) / 1000).toFixed(2)}s.`);
    };
}).setCriteria("${message}")

register('tick', () => {
    if (settings.entryTimer && !sentEntry && inKuudra &&
        (Player.asPlayerMP().getX() > -175 && Player.asPlayerMP().getX() < -130) &&
        (Player.asPlayerMP().getY() > 12 && Player.asPlayerMP().getY() < 62) &&
        (Player.asPlayerMP().getZ() > -197 && Player.asPlayerMP().getZ() < -140)
    ) {
        ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Entry took ${((new Date().getTime() - p3) / 1000).toFixed(2)}s.`);
        sentEntry = true;
    }
})