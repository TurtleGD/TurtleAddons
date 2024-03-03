import renderBeaconBeam from "../BeaconBeam";
import RenderLib from "../RenderLib";
import { getMatchFromLines, getScoreboard, removeUnicode } from "../BloomCore/utils/Utils";

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
export const level = new Sound({source: '../modules/TurtleAddons/assets/level.ogg'});
export const pling = new Sound({source: '../modules/TurtleAddons/assets/pling.ogg'});

// Party commands
export const instanceCommands = {
    ';t1': 'joininstance kuudra_normal',
    ';t2': 'joininstance kuudra_hot',
    ';t3': 'joininstance kuudra_burning',
    ';t4': 'joininstance kuudra_fiery',
    ';t5': 'joininstance kuudra_infernal',

    ';f1': 'joininstance catacombs_floor_one',
    ';f2': 'joininstance catacombs_floor_two',
    ';f3': 'joininstance catacombs_floor_three',
    ';f4': 'joininstance catacombs_floor_four',
    ';f5': 'joininstance catacombs_floor_five',
    ';f6': 'joininstance catacombs_floor_six',
    ';f7': 'joininstance catacombs_floor_seven',

    ';m1': 'joininstance master_catacombs_floor_one',
    ';m2': 'joininstance master_catacombs_floor_two',
    ';m3': 'joininstance master_catacombs_floor_three',
    ';m4': 'joininstance master_catacombs_floor_four',
    ';m5': 'joininstance master_catacombs_floor_five',
    ';m6': 'joininstance master_catacombs_floor_six',
    ';m7': 'joininstance master_catacombs_floor_seven',

    ';torres': 'joininstance master_catacombs_floor_seven',
    ';prime': 'joininstance kuudra_burning'
};



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
