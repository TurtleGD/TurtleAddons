import renderBeaconBeam from "../BeaconBeam"
import RenderLib from "../RenderLib";

// Checks world name
export function isPlayerAt (location) {
    return TabList.getNames().some((l) => 
        {
            return l.removeFormatting().toLowerCase().includes(location.toLowerCase());
        }
    )
}

// Creates a waypoint and Esp Box at coordinates
export function createWaypoint(x, y, z, r, g, b, innerA, outerA, noBeacon) {
    RenderLib.drawInnerEspBox(x + 0.5, y, z + 0.5, 1, 1, r, g, b, innerA, true)
    RenderLib.drawEspBox(x + 0.5, y, z + 0.5, 1, 1, r, g, b, outerA, true)

    if (noBeacon == true) return
    renderBeaconBeam(x, y + 1, z, 1, 1, 1, 1, false)
}

// From VolcAddons
export const BLACK = '§0';
export const DARK_BLUE = '§1';
export const DARK_GREEN = '§2';
export const DARK_AQUA = '§3';
export const DARK_RED = '§4';
export const DARK_PURPLE = '§5';
export const GOLD = '§6';
export const GRAY = '§7';
export const DARK_GRAY = '§8';
export const BLUE = '§9';
export const GREEN = '§a';
export const AQUA = '§b';
export const RED = '§c';
export const LIGHT_PURPLE = '§d';
export const YELLOW = '§e';
export const WHITE = '§f';

export const OBFUSCATED = '§k';
export const BOLD = '§l';
export const STRIKETHROUGH = '§m';
export const UNDERLINE = '§n';
export const ITALIC = '§o';
export const RESET = '§r';