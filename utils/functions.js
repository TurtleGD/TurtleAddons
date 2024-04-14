import renderBeaconBeam from "../../BeaconBeam";
import RenderLib from "../../RenderLib";

export function createWaypoint(x, y, z, r, g, b, innerAlpha, outerAlpha, noBeacon) {
    RenderLib.drawInnerEspBox(x + 0.5, y, z + 0.5, 1, 1, r, g, b, innerAlpha, true);
    RenderLib.drawEspBox(x + 0.5, y, z + 0.5, 1, 1, r, g, b, outerAlpha, true);

    if (noBeacon) return;
    renderBeaconBeam(x, y + 1, z, 1, 1, 1, 0.1 * Player.asPlayerMP().distanceTo(x, y, z), false);
};

export function inTrueLair() {
    return (Player.getX() > -130 && Player.getX() < -75) &&
       (Player.getY() > 3 && Player.getY() < 30) &&
       (Player.getZ() > -130 && Player.getZ() < -75);
};

export function isDead() {
    return Player.getInventory()?.getItems()?.some(item => {
        return item?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getString('id') == 'HAUNT_ABILITY';
    });
};

export function removeEmojis(str) {
    return str.replace(/[^\x00-\x7F§]/g, "")
}

// From VolcAddons
export function formatNumber(num) {
    if (isNaN(num) || num === 0) return "0";
    
    const sign = Math.sign(num);
    const absNum = Math.abs(num);

    if (absNum < 1) return (sign === -1 ? '-' : '') + absNum.toFixed(2);

    const abbrev = ["", "k", "m", "b", "t", "q", "Q"];
    const index = Math.floor(Math.log10(absNum) / 3);
  
    const formattedNumber = ((sign === -1 ? -1 : 1) * absNum / Math.pow(10, index * 3)).toFixed(2) + abbrev[index];

    if (Number.isInteger(absNum) && absNum < 1_000) return String(parseInt(formattedNumber));
    return formattedNumber;
};

// From BloomCore
const getMatchFromLines = (regex, list, type) => {
    for (let i = 0; i < list.length; i++) {
        let match = list[i].match(regex)
        if (!match) continue
        return type == "int" ? parseInt(match[1]) : type == "float" ? parseFloat(match[1]) : match[1]
    }
    return null
}

const getScoreboard = (formatted=false) => {
    if (!World.getWorld()) return null
    let sb = Scoreboard.getLines().map(a => a.getName())
    if (formatted) return Scoreboard.getLines()
    return sb.map(a => ChatLib.removeFormatting(a))
}

const removeUnicode = (string) => typeof(string) !== "string" ? "" : string.replace(/[^\u0000-\u007F]/g, "")

export function getArea() {
    return (removeUnicode(getMatchFromLines(/ ⏣ (.+)/, getScoreboard(false))))
};
