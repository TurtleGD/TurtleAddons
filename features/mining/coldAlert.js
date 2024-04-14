import settings from "../../settings";
import { pling } from "../../utils/sounds";
import { AQUA, BOLD } from "../../utils/formatting";
import { getArea } from "../../utils/functions";

let coldAlert = true;
let cold = null;

register('step', () => {
    if (settings.coldAlert) {
        Client.showTitle(' ', ' ', 0, 0, 1) // Might fix first title not appearing
        for (let index = 0; index < Scoreboard.getLines().length; index++) {
            let coldLine = Scoreboard.getLines()[index].toString().removeFormatting();
            if (coldLine.includes('Cold:')) cold = parseInt(coldLine.replace(/\D/g, ''));
            if (getArea() != 'Glacite Tunnels' && getArea() != 'Glacite Mineshafts') cold = null;
        }

        if (cold !== null) {
            if (getArea().removeFormatting().includes('Glacite Tunnels') && cold == settings.tunnelColdThreshold && coldAlert) {
                Client.showTitle(`${AQUA + BOLD}YOU ARE COLD!`, `${AQUA}Reached -${cold}❄!`, 0, 40, 20);
                pling.play();
                coldAlert = false;
                setTimeout(() => coldAlert = true, 15000);
            } else if (getArea().includes('Glacite Mineshafts') && cold == settings.mineshaftColdThreshold && coldAlert) {
                Client.showTitle(`${AQUA + BOLD}YOU ARE COLD!`, `${AQUA}Reached -${cold}❄!`, 0, 40, 20);
                pling.play();
                coldAlert = false;
                setTimeout(() => coldAlert = true, 15000);
            }
        }
    }
}).setDelay(1);
