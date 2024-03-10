import renderBeaconBeam from "../BeaconBeam";
import RenderLib from "../RenderLib";
import { getMatchFromLines, getScoreboard, removeUnicode } from "../BloomCore/utils/Utils";
import PogObject from "../PogData"

export function getArea() {
    return (removeUnicode(getMatchFromLines(/ ⏣ (.+)/, getScoreboard(false))))
}

export function createWaypoint(x, y, z, r, g, b, innerAlpha, outerAlpha, noBeacon) {
    RenderLib.drawInnerEspBox(x + 0.5, y, z + 0.5, 1, 1, r, g, b, innerAlpha, true);
    RenderLib.drawEspBox(x + 0.5, y, z + 0.5, 1, 1, r, g, b, outerAlpha, true);

    if (noBeacon) return;
    renderBeaconBeam(x, y + 1, z, 1, 1, 1, 1, false);
};

export function nearCoords(x, y, z, radius) {
    return Math.hypot(Player.getX() - x, Player.getY() - y, Player.getZ() - z) < radius;
};

export function distanceFromCoords(x, y, z) {
    return Math.hypot(Player.getX() - x, Player.getY() - y, Player.getZ() - z)
}

export function inTrueLair() {
    return (Player.getX() > -116 && Player.getX() < -88) &&
       (Player.getY() > 3 && Player.getY() < 13) &&
       (Player.getZ() > -120 && Player.getZ() < -92);
};

export function isDead() {
    return Player.getInventory()?.getItems()?.some(item => {
        return item?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getString('id') == 'HAUNT_ABILITY';
    });
}

// Armor stand
export const EntityArmorStand = Java.type('net.minecraft.entity.item.EntityArmorStand').class;

// Stupid rune symbol fuck you
export const rune = '◆';

// Sounds
export const level = new Sound({source: '../modules/TurtleAddons/assets/level.ogg', priority: true});
export const pling = new Sound({source: '../modules/TurtleAddons/assets/pling.ogg', priority: true});

// PogData
export const persistentData = new PogObject("TurtleAddons", {
    gummyTimeLeft: 0,
});

export function removeEmojis(str) {
    return str.replace(/[^\x00-\x80]/g, "")
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
