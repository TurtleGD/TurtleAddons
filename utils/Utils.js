import { pogData } from "./PogData"
import { Formatting } from "./Formatting";

export const logo = `${Formatting.GRAY}[${Formatting.AQUA}TurtleAddons${Formatting.GRAY}]${Formatting.RESET}`

/**
 * Returns scoreboard location
 * @returns Location/null 
 */
function getArea() {
    let scoreboard = Scoreboard.getLines().map(a => a.getName()).map(a => ChatLib.removeFormatting(a));

    for (let i = 0; i < scoreboard.length; i++) {
        let match = scoreboard[i].match(/ ⏣ (.+)/);
        if (match) return match[1].toString().replace(/[^\u0000-\u007F]/g, "");
    }
    return null;
}

let areaFound = false;

register("worldLoad", () => {
    areaFound = false;
    pogData.skyblockArea = "";
    pogData.save();
})

register("step", () => {
    if (!TabList || areaFound) return;
    
    pogData.skyblockArea = getArea();
    if (pogData.skyblockArea && pogData.skyblockArea != "None") areaFound = true;
    else pogData.skyblockArea = ""; 
    pogData.save();
}).setFps(5)