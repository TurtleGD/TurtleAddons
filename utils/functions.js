import renderBeaconBeam from "../../BeaconBeam";
import RenderLib from "../../RenderLib";

/**
     * Creates a waypoint
     * @param {number} x - X Coordinates of the waypoint
     * @param {number} y - Y Coordinates of first position
     * @param {number} z - Z Coordinates of first position
     * @param {number} red - Box Color Red 0-1
     * @param {number} green - Box Color Green 0-1
     * @param {number} blue - Box Color Blue 0-1
     * @param {number} innerAlpha - Box sides alpha 0-1
     * @param {number} outerAlpha - Box edges alpha 0-1
     * @param {boolean} drawBeacon - Add a beacon beam, true/false
    */
export function createWaypoint(x, y, z, red, green, blue, innerAlpha, outerAlpha, drawBeacon) {
    RenderLib.drawInnerEspBox(x + 0.5, y, z + 0.5, 1, 1, red, green, blue, innerAlpha, true);
    RenderLib.drawEspBox(x + 0.5, y, z + 0.5, 1, 1, red, green, blue, outerAlpha, true);

    if (!drawBeacon) return;
    renderBeaconBeam(x, y + 1, z, 1, 1, 1, 0.1 * Player.asPlayerMP().distanceTo(x, y, z), false);
}

export function inTrueLair() {
    return (Player.getX() > -130 && Player.getX() < -75) &&
       (Player.getY() > 3 && Player.getY() < 30) &&
       (Player.getZ() > -130 && Player.getZ() < -75);
}

export function isDead() {
    return Player.getInventory()?.getItems()?.some(item => {
        return item?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getString('id') == 'HAUNT_ABILITY';
    });
}

export function removeEmojis(str) {
    return str.replace(/[^\x00-\x7F§]/g, "")
}

export function addCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
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

export function getTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
  
    const timeString = [
        hours > 0 ? `${hours}hr` : '',
        `${minutes < 10 && hours > 0 ? '0' : ''}${minutes > 0 || hours > 0 ? minutes + 'm' : ''}`,
        `${remainingSeconds < 10 && (hours > 0 || minutes > 0) ? '0' : ''}${remainingSeconds.toFixed(hours > 0 || minutes > 0 ? 0 : 0)}s`
    ].join('');
  
    return timeString;
}

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

// Modified from RenderLibV2

/**
     * Draws a line between 2 coordinates
     * @param {number} x - X Coordinates of first position
     * @param {number} y - Y Coordinates of first position
     * @param {number} z - Z Coordinates of first position
     * @param {number} red - Line Color Red 0-1
     * @param {number} green - Line Color Green 0-1
     * @param {number} blue - Line Color Blue 0-1
     * @param {number} alpha - Line Color Alpha 0-1
    */

export function drawLineFromCrosshair(x, y, z, red, green, blue, alpha) {
    GlStateManager.func_179094_E(); // pushMatrix
    GL11.glLineWidth(2);
    GL11.glDisable(GL11.GL_CULL_FACE); // disableCullFace
    GL11.glEnable(GL11.GL_BLEND); // enableBlend
    GL11.glBlendFunc(770, 771); // blendFunc
    GL11.glDisable(GL11.GL_TEXTURE_2D); // disableTexture2D
    GL11.glDepthMask(false); // depthMask
    GL11.glDisable(GL11.GL_DEPTH_TEST); // disableDepth

    Tessellator.begin(3).colorize(red, green, blue, alpha).pos(Player.getRenderX(), Player.getRenderY() + Player.asPlayerMP().getEyeHeight(), Player.getRenderZ()).pos(x, y, z).draw();

    GL11.glEnable(GL11.GL_CULL_FACE); // enableCull
    GL11.glDisable(GL11.GL_BLEND); // disableBlend
    GL11.glDepthMask(true); // depthMask
    GL11.glEnable(GL11.GL_TEXTURE_2D); // enableTexture2D
    GL11.glEnable(GL11.GL_DEPTH_TEST); // enableDepth

    GlStateManager.func_179121_F(); // popMatrix
}
