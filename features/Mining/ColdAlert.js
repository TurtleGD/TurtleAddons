import settings from "../../settings";
import { pling } from "../../utils/sounds";
import { AQUA, BOLD } from "../../utils/formatting";
import { pogData } from "../../utils/pogData";

let coldAlert = true;
let cold = null;

register("step", () => {
    if (settings.coldAlert) {
        for (let index = 0; index < Scoreboard.getLines().length; index++) {
            let coldLine = Scoreboard.getLines()[index].toString().removeFormatting();
            if (coldLine.includes("Cold:")) cold = parseInt(coldLine.replace(/\D/g, ""));
            if (pogData.skyblockArea != "Glacite Tunnels" && pogData.skyblockArea != "Glacite Mineshafts") cold = null;
        }

        if (cold !== null) {
            if (pogData.skyblockArea.removeFormatting().includes("Glacite Tunnels") && cold == settings.tunnelColdThreshold && coldAlert) {
                Client.showTitle(`${AQUA + BOLD}YOU ARE COLD!`, `${AQUA}Reached -${cold}❄!`, 0, 40, 20);
                pling.play();
                coldAlert = false;
                Client.scheduleTask(300, () => coldAlert = true);
            } else if (pogData.skyblockArea.includes("Glacite Mineshafts") && cold == settings.mineshaftColdThreshold && coldAlert) {
                Client.showTitle(`${AQUA + BOLD}YOU ARE COLD!`, `${AQUA}Reached -${cold}❄!`, 0, 40, 20);
                pling.play();
                coldAlert = false;
                Client.scheduleTask(300, () => coldAlert = true);
            }
        }
    }
}).setFps(1);
